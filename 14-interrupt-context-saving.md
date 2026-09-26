# Interrupt Context Saving

## Table of Contents

1. [Introduction](#1-introduction)
2. [Interrupt Entry](#2-interrupt-entry)
3. [Register Banks](#3-register-banks)
4. [Hardware-Assisted State Saving](#4-hardware-assisted-state-saving)
5. [Interrupts and Context Switches](#5-interrupts-and-context-switches)
6. [Summary](#6-summary)

## 1. Introduction

This document describes how processor hardware preserves execution state when an interrupt transfers control to an operating-system handler. The document covers interrupt entry, register banks, hardware-assisted state saving, and context switches. The document does not prescribe one universal interrupt-entry procedure; the exact hardware-saved state depends on the processor architecture.

## 2. Interrupt Entry

An interrupt can transfer control from a running program to a handler. The processor changes the program counter to the handler's address. The interrupted program counter must be preserved so execution can resume at the correct instruction.

The handler also needs a stack for operating-system work. The interrupted program's stack pointer must be preserved before the handler uses a kernel stack. The processor must preserve enough state on interrupt entry for the operating system to save the remaining registers, flags, and other execution data.

Software alone cannot save a register value after an interrupt has already overwritten it. Processor hardware must preserve critical state or provide an alternate register set that lets the handler save the interrupted state.

## 3. Register Banks

Some processor designs provide multiple register banks. An interrupt can switch from the registers used by a user-mode program to a bank reserved for privileged execution. This preserves the interrupted program's register values while the handler begins running.

The operating system can use privileged instructions to access the inactive register bank and copy its contents into the interrupted process's saved state. It can then load another process's state and return to user mode with the appropriate register bank active.

Duplicating a full register set requires additional processor hardware. Some designs can instead provide separate banks for selected registers, such as the stack pointer or program counter. The exact mechanism depends on the architecture.

## 4. Hardware-Assisted State Saving

Processor architectures can automatically preserve selected state during interrupt entry. A processor can save the interrupted program counter and status information before transferring control to a handler. It can also select a kernel stack or save a prior stack pointer. The operating-system handler then saves the remaining state in memory.

Some architectures define task-state structures for storing execution context. The structure and the amount of state saved automatically vary by architecture. For example, the x86-64 Task State Segment provides stack and interrupt-stack configuration; it does not automatically save all general-purpose registers during an interrupt.

## 5. Interrupts and Context Switches

An interrupt does not always cause a process context switch. The operating system can handle the event and return to the interrupted process. A scheduler can instead select another process, in which case the operating system saves the current process state and restores the selected process state before returning to user mode.

Interrupt handlers can be entered after a software request or a hardware event. Timer interrupts can allow the operating system to regain control after a process uses the CPU for a configured interval. Input/output devices can interrupt the processor when an event requires attention.

The state-saving procedure varies across processor architectures. The operating system and processor must follow matching conventions for preserving and restoring the program counter, stack pointer, registers, and status flags.

## 6. Summary

This document describes processor support for preserving execution state during interrupt entry. Architectures can use register banks or hardware-assisted state saving to let operating-system handlers preserve the interrupted context. Interrupt handling does not necessarily switch processes. The document does not prescribe one universal interrupt-entry procedure; the exact hardware-saved state depends on the processor architecture.
