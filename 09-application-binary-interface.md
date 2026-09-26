# Application Binary Interface

## Table of Contents

1. [Introduction](#1-introduction)
2. [Operating-System Compatibility](#2-operating-system-compatibility)
3. [System-Call Conventions](#3-system-call-conventions)
4. [Application Binary Interfaces](#4-application-binary-interfaces)
5. [Executable Formats and Runtimes](#5-executable-formats-and-runtimes)
6. [Real-World Examples](#6-real-world-examples)
7. [Summary](#7-summary)

## 1. Introduction

This document describes why compiled applications depend on operating-system and processor conventions. The document covers system-call interfaces, application binary interfaces, executable formats, and runtime environments. The document does not cover a complete ABI specification for a particular operating system or processor.

## 2. Operating-System Compatibility

An executable can depend on both a processor architecture and an operating system. Matching processor architectures do not guarantee that an executable will run on different operating systems.

User programs request operating-system services through system calls. Operating systems can provide different system calls or different behavior for similar services. Machine code compiled for one system can therefore request unavailable or different services on another system.

Process creation illustrates this difference. Windows provides `CreateProcess` to create a process from an executable. On Unix-like systems, `fork` creates a child process based on the calling process. The child can then call `exec` to replace its process image with another executable.

```text
pid <- fork()
if pid == 0:
    # executes only in the child process
    exec("/usr/bin/some_program", argument_list)
    # exec only returns if it fails
    report_error()
else:
    # executes only in the parent process, with pid set to the child's PID
    wait_for(pid)
```

The child receives a copy of the parent's memory and open files at the moment `fork` returns, then `exec` replaces that copy's code and data with the new program's image while keeping the same process identifier and most open file descriptors. `fork` without a following `exec` is also valid; it produces two processes running the same program, distinguished at the call site by the return value shown above.

## 3. System-Call Conventions

System-call interfaces define more than the operation being requested. The processor architecture and operating system specify how a program enters the kernel, identifies a system call, passes arguments, and receives a result.

A system-call convention can assign a system-call number and arguments to specific registers. Other conventions can pass some arguments through memory. A program and operating system must agree on these conventions. Using the wrong register or argument layout can cause the operating system to interpret a different request or incorrect data.

System-call entry mechanisms also vary. An architecture can provide a dedicated instruction that transfers control to the operating system. The instruction, register assignments, and return convention are part of the binary interface.

A system call and a process switch are distinct events. A program can make a system call to request a service without transferring execution to a different process. The operating system may schedule another task before returning to the caller, but the kernel entry itself is not the same as a process switch.

## 4. Application Binary Interfaces

An **Application Binary Interface (ABI)** defines conventions used by compiled components on a given platform. These conventions can include system-call entry, argument and return-value locations, data sizes, calling conventions, and binary object formats.

An **Application Programming Interface (API)** defines functions and types available to source code. An ABI defines how compiled code interacts at the binary level. Source code can use similar APIs on different systems while producing binaries that follow different ABIs.

Programs compiled for the same processor architecture can still be incompatible when their operating systems use different system calls, register assignments, argument layouts, or executable formats.

Components written in different programming languages can interoperate when they expose a compatible binary interface. A foreign-function interface (FFI) defines how one language calls a function implemented in another language. The components must agree on calling conventions, data layouts, string representation, ownership of allocated memory, and error or exception handling. A shared C-compatible interface is common, but it is not a universal requirement.

An interpreted or managed runtime can call native code through an FFI or a runtime-specific extension. The boundary can require conversions between managed values and native representations, and the runtime must preserve the calling convention and lifetime rules expected by the native component.

## 5. Executable Formats and Runtimes

An executable file contains machine instructions, data, and metadata used by the operating system to load and run the program. Operating systems define executable formats and loading rules. The Executable and Linkable Format (ELF) is used on many Unix-like systems. The Portable Executable (PE) format is used by Windows.

Some programming languages rely on an interpreter or virtual machine instead of compiling all program code directly to native machine instructions. The same source or intermediate code can run on different systems when a compatible runtime is installed. An application can still fail to run if a required runtime or module is unavailable or incompatible.

## 6. Real-World Examples

### 6.1 Linux x86-64 System-Call Convention

The Linux kernel on x86-64 defines a system-call convention that assigns the system-call number and its arguments to specific registers before executing the `syscall` instruction. The kernel places the return value in `rax`.

| Register | Contents |
| :--- | :--- |
| `rax` | System-call number (input); return value (output) |
| `rdi` | First argument |
| `rsi` | Second argument |
| `rdx` | Third argument |
| `r10` | Fourth argument |
| `r8` | Fifth argument |
| `r9` | Sixth argument |

For example, the `write` system call on Linux x86-64 uses system-call number `1`, with `rdi` holding a file descriptor, `rsi` holding a pointer to a buffer, and `rdx` holding a byte count. This register assignment is part of the Linux x86-64 system-call ABI and differs from the argument-passing registers used by an ordinary function call under the System V AMD64 calling convention described in [The Call Stack](10-the-call-stack.md).

### 6.2 The ELF Header

The Executable and Linkable Format (ELF), introduced in Section 5, begins every ELF file with a fixed-size header. The header's first four bytes are a **magic number** that identifies the file as ELF: the byte `0x7F` followed by the ASCII characters `E`, `L`, `F`. An operating-system loader reads this header before treating any part of the file as executable code, which is why supplying arbitrary bytes as an executable produces a loader error rather than CPU execution of those bytes.

| Field | Purpose |
| :--- | :--- |
| `e_ident` | Magic number and file class (32-bit or 64-bit), byte order, and ABI identification |
| `e_type` | Object file type: relocatable, executable, shared object, or core |
| `e_machine` | Target instruction-set architecture |
| `e_entry` | Virtual address of the program's entry point |
| `e_phoff` | File offset of the program header table, which the loader uses to map segments into memory |
| `e_shoff` | File offset of the section header table |

The loader uses `e_entry` and the program header table to determine where to start execution and which parts of the file to map into which memory regions, matching the process memory layout described in [Programs and Processes](08-programs-and-processes.md), Section 3.

## 7. Summary

This document describes operating-system compatibility, system-call conventions, ABIs, foreign-function interfaces, executable formats, runtime dependencies, and concrete examples from the Linux x86-64 system-call convention and the ELF header. Compatibility requires agreement between compiled code, the processor architecture, and the operating system's binary conventions. The document does not provide a complete ABI specification for a particular platform.

### 7.1 References

- The Linux man-pages project, [`syscall(2)`](https://man7.org/linux/man-pages/man2/syscall.2.html), the reference for Linux system-call invocation and architecture-specific register conventions.
- Tool Interface Standard Committee, [Executable and Linkable Format (ELF) Specification](https://refspecs.linuxfoundation.org/elf/elf.pdf), the authoritative specification for the ELF header and file structure.
- Microsoft Corporation, [PE Format documentation](https://learn.microsoft.com/en-us/windows/win32/debug/pe-format), the authoritative reference for the Windows Portable Executable format.
- The Open Group, [POSIX.1-2017 (IEEE Std 1003.1-2017)](https://pubs.opengroup.org/onlinepubs/9699919799/), the standard defining `fork`, `exec`, and related system interfaces.
