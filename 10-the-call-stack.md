# The Call Stack

## Table of Contents

1. [Introduction](#1-introduction)
2. [Stack Data Structure](#2-stack-data-structure)
3. [Stack Allocation](#3-stack-allocation)
4. [Function Calls and Stack Frames](#4-function-calls-and-stack-frames)
5. [Stack Limits](#5-stack-limits)
6. [Threads and Locality](#6-threads-and-locality)
7. [A Concrete Stack Frame](#7-a-concrete-stack-frame)
8. [Summary](#8-summary)

## 1. Introduction

This document describes the call stack used during program execution. The document covers stack operations, stack allocation, function-call frames, stack limits, and per-thread stacks. The document does not cover heap allocation in detail.

## 2. Stack Data Structure

A **stack** is a last-in, first-out data structure. The most recently added value is the first value removed. The **call stack**, also called the execution stack or program stack, stores information used during function execution.

## 3. Stack Allocation

An operating system assigns memory to a process. A simplified implementation reserves a bounded region for the call stack. A **stack pointer** identifies the current top of the stack. A processor can store the stack pointer in a register.

Allocating and releasing stack space can update the stack pointer without requesting a separate operating-system allocation for every local value. The exact procedure depends on the processor architecture and compiler. Stack access uses ordinary memory and is not inherently faster than other memory access; its allocation pattern can be efficient and can support data locality.

An operating system can provide memory pages for a stack as needed and enforce a stack limit. The details depend on the operating system.

## 4. Function Calls and Stack Frames

A function call can create a **stack frame** containing values and control information needed for that call. A frame can contain local variables, saved registers, arguments, and a return address. The calling convention determines where parameters and return values are stored.

When a function returns, its frame is no longer needed and the stack pointer is restored. The caller then continues execution. The exact frame layout is defined by the compiler and the platform's calling convention.

Fixed-size local values can be assigned stack space when the compiler determines their size. A dynamically sized collection requires a separate allocation strategy rather than extending a frame into memory used by later frames.

## 5. Stack Limits

A stack has a size limit. A **stack overflow** occurs when execution requires more stack space than is available. Deep or unbounded recursion can create additional frames until the stack limit is reached.

An iterative algorithm can avoid recursive stack growth when the recursion depth may exceed the available stack capacity. The appropriate implementation depends on the algorithm and its resource requirements.

## 6. Threads and Locality

Each thread requires its own stack because each thread has an independent call sequence and stack pointer. Threads in one process share the process address space, so a thread can address another thread's stack, but coordinating such access is generally necessary.

Compact data can improve cache utilization when related values are accessed together. Cache hits and misses depend on access patterns and hardware cache behavior; they are not determined solely by whether data is on a stack or elsewhere in memory.

## 7. A Concrete Stack Frame

A processor's `call` and `ret` instructions automate a sequence that could otherwise be built from ordinary jump and stack instructions: `call` pushes the address of the following instruction (the return address) onto the stack and jumps to the target function; `ret` pops that address off the stack and jumps to it. This document's stack pointer, described in Section 3, corresponds to the `rsp` register on x86-64 and the `sp` register on ARM64.

The following x86-64 assembly, using the System V AMD64 calling convention, shows a function prologue and epilogue that establish and tear down a stack frame:

```asm
function:
    push  rbp             ; save caller's frame pointer
    mov   rbp, rsp         ; establish new frame pointer
    sub   rsp, 16          ; reserve 16 bytes for local variables
    ; ... function body uses [rbp - 8], [rbp - 16] for locals ...
    mov   rsp, rbp         ; deallocate local variables
    pop   rbp              ; restore caller's frame pointer
    ret                    ; pop return address and jump to it
```

The `leave` instruction is a shorthand for `mov rsp, rbp` followed by `pop rbp`. After `call` transfers control to `function`, the stack, growing toward lower addresses as is conventional on x86-64, holds the following values relative to the frame pointer (`rbp`):

| Address (relative to `rbp`) | Contents |
| :--- | :--- |
| `rbp + 8` | Return address, pushed by `call` |
| `rbp + 0` | Saved caller's `rbp` |
| `rbp - 8` | First local variable |
| `rbp - 16` | Second local variable |

This layout is one calling convention among several; the System V AMD64 ABI, the Microsoft x64 calling convention, and calling conventions for other architectures define different register usage, stack alignment, and argument-passing rules, though all rely on the same underlying stack-frame concept described in Section 4.

### 7.1 References

- The Linux Foundation, [System V Application Binary Interface, AMD64 Architecture Processor Supplement](https://gitlab.com/x86-psABIs/x86-64-ABI), for the complete x86-64 stack layout, register usage, and calling convention.
- Microsoft Corporation, [x64 calling convention documentation](https://learn.microsoft.com/en-us/cpp/build/x64-calling-convention), for the Windows x64 calling convention.

## 8. Summary

This document describes the call stack as a bounded LIFO region used for function-call state. Stack-pointer updates support efficient allocation and release, while function calls use stack frames and each thread has a separate stack. This document also describes a concrete x86-64 stack frame built with `call`, `ret`, and a function prologue and epilogue. The document does not cover heap allocation in detail.
