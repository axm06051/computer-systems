# Memory Protection

## Table of Contents

1. [Introduction](#1-introduction)
2. [Process Address Spaces](#2-process-address-spaces)
3. [Base and Limit Registers](#3-base-and-limit-registers)
4. [Access Validation](#4-access-validation)
5. [Operating-System Control](#5-operating-system-control)
6. [Beyond Base and Limit Registers](#6-beyond-base-and-limit-registers)
7. [Summary](#7-summary)

## 1. Introduction

This document describes hardware enforcement of process memory boundaries. The document covers process address spaces, base and limit registers, access validation, and operating-system control of memory bounds. The document introduces paging by name as the mechanism used by modern systems but does not cover page-table structure or virtual memory management in detail.

## 2. Process Address Spaces

A process requires memory for its executable code, data, and runtime state. The memory assigned to a process is its **address space**. Processes require protection from unauthorized reads and writes to other processes' memory.

Checking every memory access in software would require additional instructions for each access. Hardware can validate addresses as they pass from the processor to memory.

## 3. Base and Limit Registers

A simplified memory-protection design uses a **base register** and a **limit register**. The base register contains the lowest legal physical address for a process. The limit register contains the size of the allowed address range.

An address is within the process's range when it is greater than or equal to the base and less than the sum of the base and limit:

$$
\text{base} \leq \text{address} < \text{base} + \text{limit}
$$

The upper bound is exclusive. If the base is $1000$ and the limit is $500$, valid addresses start at $1000$ and end before $1500$.

## 4. Access Validation

Hardware compares each memory address with the lower and upper bounds. Both comparisons must succeed for the address to be valid.

The validation result can gate the memory read and write signals. If an address is outside the permitted range, the hardware blocks the memory operation. The processor can also raise an exception so the operating system can handle the violation. The operating system can terminate the process.

## 5. Operating-System Control

Base and limit registers must be privileged registers. User-mode processes cannot modify their own memory bounds. During a context switch, the operating system loads the bounds for the selected process before returning the processor to user mode.

The base-and-limit design describes a contiguous physical memory region. It is a simplified model of memory protection. Modern systems commonly use paging and virtual addresses, which this document does not cover.

## 6. Beyond Base and Limit Registers

The base-and-limit design in Sections 3 and 4 protects a process by restricting it to one contiguous physical region. This requires that a process's entire address space occupy contiguous physical memory, which complicates growing a process, wastes memory when a process reserves address space it does not immediately use, and offers no way to share a single physical page, such as a shared library, between processes at different physical addresses.

Modern general-purpose processors instead use **paging**: physical memory is divided into fixed-size **frames**, virtual addresses are divided into fixed-size **pages** of the same size, and a **page table** maps each virtual page to a physical frame. The memory management unit (MMU) introduced conceptually in [Operating System Boundaries](13-operating-system-boundaries.md) walks this page table on every memory access. Each page-table entry can carry permission bits, such as read, write, and execute, that extend the single valid/invalid check performed by the base-and-limit comparison in Section 4. This document does not cover page-table structure, translation lookaside buffers, or virtual-memory management in detail; the paging mechanism is introduced here only to place the base-and-limit design in context as a simplified predecessor, not as the mechanism used by contemporary operating systems.

### 6.1 References

- Intel Corporation, [Intel 64 and IA-32 Architectures Software Developer's Manual, Volume 3 (System Programming Guide)](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html), for x86-64 paging structures and page-table entry formats.
- Arm Limited, [Arm Architecture Reference Manual for A-profile Architecture](https://developer.arm.com/documentation/ddi0487/latest/), for the ARM64 translation table format.

## 7. Summary

This document describes hardware checks that restrict a process to an assigned memory range. Base and limit registers define the range, and privileged operating-system code updates these registers when execution changes processes. The document introduces paging as the mechanism used by modern systems in place of base and limit registers but does not cover page-table structure or virtual-memory management in detail.
