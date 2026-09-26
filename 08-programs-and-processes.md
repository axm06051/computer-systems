# Programs and Processes

## Table of Contents

1. [Introduction](#1-introduction)
2. [Program Representation](#2-program-representation)
3. [Process Memory](#3-process-memory)
4. [Program Instances](#4-program-instances)
5. [Interpreted Programs](#5-interpreted-programs)
6. [Process Ancestry](#6-process-ancestry)
7. [Summary](#7-summary)

## 1. Introduction

This document describes the distinction between programs and processes. The document covers executable files, process memory, multiple instances of one program, and interpreted programs. The document does not cover process scheduling or operating system process management.

## 2. Program Representation

A **program** is a sequence of instructions and the data required by the CPU to perform a task. An executable file contains instructions and data used at runtime, including constants.

A program stored in an executable file is a passive entity. The CPU cannot execute it until the executable file is loaded into memory.

## 3. Process Memory

Loading an executable file into memory and executing its instructions creates a **process**. The memory layout is part of the process, but the memory layout is not the process itself.

The executable code is loaded into a **text section**. Global variables and constant values are loaded into a **data section**. Runtime values, user input, and temporary results require additional memory. The **stack** and the **heap** provide memory for these values. Their sizes can change during execution.

In the memory model described here, the text section does not change in size or content during execution. The data section retains its size while its content can change.

## 4. Program Instances

Each process has its own memory space. Multiple processes can execute the same program while handling different data.

Opening two text files in a text editor can create two processes of the text editor program. Each process displays one file. The text sections contain the same program code. The processes have separate data, and the process handling a larger file can require more memory for its data.

## 5. Interpreted Programs

An interpreted language uses an interpreter program to execute source code. The interpreter is a program. The source file is text that the interpreter reads as data.

When a Python file is run, the executable code in the process text section belongs to the Python interpreter. The interpreter loads the Python source code into its data memory and interprets it. The source code can be stored in the heap.

## 6. Process Ancestry

On Unix-like systems, a user process is created by an existing process, as [Application Binary Interface](09-application-binary-interface.md), Section 2, describes for `fork` and `exec`. The parent-child relationships therefore form a process ancestry graph. On Linux, the initial PID namespace has a process with PID 1 that is created during system initialization. Additional PID namespaces can have their own PID 1, so PID 1 is not a universal root for every Linux process view.

On Windows, process creation uses `CreateProcess` rather than `fork` and `exec`. Microsoft documents `CreateProcess` as creating a new process and its primary thread. Windows startup also includes the Session Manager process, `smss.exe`, after the kernel has initialized. The process-creation model and startup ancestry therefore differ from the Unix `fork` and `exec` model.

## 7. Summary

This document describes programs as passive instruction and data files and processes as their executions with separate memory spaces. The document covers executable memory sections, multiple processes of one program, interpreted source code, and process ancestry and operating-system-specific process creation. The document does not cover process scheduling or operating system process management.
