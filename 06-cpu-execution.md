# CPU Execution

## Table of Contents

1. [Introduction](#1-introduction)
2. [Instruction Execution](#2-instruction-execution)
3. [Example Program](#3-example-program)
4. [Address Management](#4-address-management)
5. [Conditions and Loops](#5-conditions-and-loops)
6. [Instruction Set](#6-instruction-set)
7. [Bit Shifts and Signed Values](#7-bit-shifts-and-signed-values)
8. [Unsupported Instructions](#8-unsupported-instructions)
9. [Real Instruction Set Architectures](#9-real-instruction-set-architectures)
10. [Summary](#10-summary)

## 1. Introduction

This document describes the execution of programs by a central processing unit (CPU). The document covers instruction fetching, decoding, and execution. The document covers conditions, loops, flags, and conditional jumps. The document does not cover compiler optimization in detail. The document does not cover memory management or CPU scheduling.

## 2. Instruction Execution

### 2.1 Compilers

A compiler translates source code written in a programming language into an executable file. The executable file contains CPU instructions and the data required at runtime. The data includes values such as constants used by the program.

### 2.2 Memory Loading

The executable file is loaded into memory. The CPU fetches instructions from memory. The processor reads from and writes to random access memory (RAM). The RAM stores both instructions and data.

### 2.3 Instruction Stages

Instruction execution passes through three stages:

1. Fetch
2. Decode
3. Execute

### 2.3.1 Fetch Stage

The content of the address register is sent to the address input of the memory. The address register is also called the program counter. The read enable signal is activated. The memory outputs the content at the specified address. The content is written into the instruction register of the CPU.

### 2.3.2 Decode Stage

The control unit reads the content of the instruction register. The control unit interprets the instruction. The control unit determines the action of the CPU.

### 2.3.3 Execute Stage

The control unit configures the components for instruction execution. In a load operation, the content of a memory location is transferred to a register. After execution, the control unit increments the value in the address register. The CPU retrieves the next instruction during the next fetch stage.

## 3. Example Program

### 3.1 Program Instructions

The example program contains four instructions.

| Instruction | Operation |
| :---------- | :-------- |
| 1 | Load the value at memory location 5 into register Z |
| 2 | Load the value at memory location 6 into register 1 |
| 3 | Add the values in register Z and register 1, write the result to register Z |
| 4 | Store the value in register Z to memory location 7 |

### 3.2 Instruction Sequence

The first instruction retrieves a value from memory into the CPU. The second instruction retrieves a value from memory into a register. The third instruction is an arithmetic operation. The add instruction requires the operands to be loaded into registers before execution. The fourth instruction is a store instruction. The store instruction directs the register to send its value to memory. The store instruction specifies an address and activates the write enable signal. The result is stored in memory location 7.

### 3.3 Assembly Representation

```asm
LOAD  Z, [5]
LOAD  1, [6]
ADD   Z, 1
STORE Z, [7]
HALT
```

### 3.4 Memory Layout

The program is loaded into memory. Instructions occupy the beginning of memory. Data occupies the end of memory. The architecture provides `$16$` memory locations.

| Address | Content | Type |
| :-----: | :------ | :--- |
| 0 | `LOAD Z, [5]` | Instruction |
| 1 | `LOAD 1, [6]` | Instruction |
| 2 | `ADD Z, 1` | Instruction |
| 3 | `STORE Z, [7]` | Instruction |
| 4 | `HALT` | Instruction |
| 5 | **20** | Data |
| 6 | **100** | Data |
| 7 | **0** | Data |

### 3.5 Program Termination

The CPU cannot differentiate between instructions and data. A halt instruction is added at the end of the program. The halt instruction prevents the CPU from fetching data as instructions. The halt instruction stops execution.

## 4. Address Management

### 4.1 Address Modification

The addition of instructions changes the memory locations of data. The load instructions and store instructions require correct addresses. Instructions are placed at the beginning of memory. Data is placed at the end of memory. The architecture has `$16$` RAM locations.

### 4.2 Program Execution

The program is loaded into memory. The program moves data from memory to the CPU. The CPU manipulates the data. The CPU stores the result back in memory. The CPU executes one instruction after another.

### 4.3 Relocated Program

The example program is modified by adding a new line of code. The instructions for the first line remain the same except for the addresses.

```asm
LOAD  Z, [10]
LOAD  1, [11]
ADD   Z, 1
STORE Z, [12]
LOAD  Z, [10]
INC   Z
STORE Z, [10]
HALT
```

| Address | Content | Type |
| :-----: | :------ | :--- |
| 0 | `LOAD Z, [10]` | Instruction |
| 1 | `LOAD 1, [11]` | Instruction |
| 2 | `ADD Z, 1` | Instruction |
| 3 | `STORE Z, [12]` | Instruction |
| 4 | `LOAD Z, [10]` | Instruction |
| 5 | `INC Z` | Instruction |
| 6 | `STORE Z, [10]` | Instruction |
| 7 | `HALT` | Instruction |
| 10 | **20** | Data |
| 11 | **100** | Data |
| 12 | **0** | Data |

## 5. Conditions and Loops

### 5.1 Overview

Conditions and loops are required for decision-making and repetition. Without conditions and loops, the tasks a computer can perform are limited.

### 5.2 Infinite Loop

### 5.2.1 Program Structure

The first line initializes a variable with the value zero. The value is loaded into a register and copied to the memory location of variable `$a$`. The line inside the loop performs an addition. The current value of variable `$a$` is loaded in register zero. An increment operation adds one to the value. A store instruction updates the value of variable `$a$`.

```asm
LOAD  Z, [8]
STORE Z, [9]
INC   Z
STORE Z, [9]
JUMP  [2]
HALT
```

### 5.2.2 Jump Instruction

The jump instruction has a memory address. The jump instruction makes the program jump to the specified location. The jump instruction causes the program to return to a previous instruction. The halt instruction is not reached.

### 5.2.3 Internal Operation

The jump instruction tells the control unit to overwrite the content of the address register. The operation is similar to the load instruction. The address register is written instead of a general-purpose register. The CPU fetches an instruction that is not the next one in sequence. The effect is a jump.

### 5.3 Flags

### 5.3.1 Flag Registers

Flags are one-bit registers. The arithmetic logic unit (ALU) outputs the result of an operation. The ALU provides extra information about the result. The flags indicate overflow, zero, or negative results.

| Flag | Condition |
| :--: | :-------- |
| Zero | The result is `$0$` |
| Negative | The result is negative |
| Overflow | The result exceeds the register width |

### 5.3.2 Flag Activation

When the result of an operation is zero, the zero flag is set. When the variable `$a$` reaches the value `$255$`, incrementing it causes the overflow flag to turn on. The value `$256$` requires a binary sequence that does not fit in one byte. When a larger number is subtracted from a smaller number, the result is negative. The negative flag is set.

```asm
LOAD  Z, [12]
SUB   Z, Z
STORE Z, [13]
HALT
```

| Flag | State | Reason |
| :--: | :---: | :----- |
| Zero | **1** | The result is `$0$` |
| Negative | **0** | The result is not negative |
| Overflow | **0** | The result fits in one byte |

### 5.4 Conditional Jumps

### 5.4.1 Operation

Conditional jumps jump to the specified address only if certain conditions related to the flags are met.

### 5.4.2 While Loop

The first line loads a constant value and stores it in the address of variable `$a$`. A condition is checked before each iteration. Comparing two numbers is performed by subtraction. The difference between `$a$` and `$5$` is a third number `$b$`. If `$b$` is negative, `$a$` is lower than `$5$`. If `$b$` is zero, `$a$` and `$5$` are equal. If `$b$` is positive, `$a$` is greater than `$5$`. To check if `$a$` is lower than `$5$`, the numbers are subtracted. The negative flag turns on. A jump negative instruction detects the condition.

### 5.4.3 Implementation

The number `$5$` is loaded into another register. The value is subtracted from the value of `$a$` in register zero. A jump negative instruction checks if the result was negative. If the result is negative, the program jumps to the loop code. After the loop code, a jump instruction returns to the subtraction instruction. If the subtraction does not trigger the negative flag, the conditional jump does not occur. The CPU executes the instruction immediately following the conditional jump. An unconditional jump breaks the loop. The program halts.

```asm
LOAD  Z, [10]
STORE Z, [11]
LOAD  1, [10]
LOAD  2, [12]
SUB   1, 2
JNEG  [6]
JUMP  [11]
INC   Z
STORE Z, [10]
JUMP  [2]
HALT
```

### 5.4.4 Execution

While the value of variable `$a$` is less than `$5$`, the loop instructions are executed. The value of the variable increases with each iteration. When the value equals `$5$`, the subtraction does not trigger the negative flag. The loop is broken.

| Iteration | Value of `$a$` | Negative Flag | Action |
| :-------: | :------------: | :-----------: | :----- |
| 1 | **0** | **1** | Loop body executes |
| 2 | **1** | **1** | Loop body executes |
| 3 | **2** | **1** | Loop body executes |
| 4 | **3** | **1** | Loop body executes |
| 5 | **4** | **1** | Loop body executes |
| 6 | **5** | **0** | Loop exits |

### 5.5 If Statements

### 5.5.1 Operation

An if statement evaluates a condition. The inner block is executed if the condition is met. The unconditional jump is not required. If the condition is not met, the conditional jump fails. The CPU executes the next instruction and skips the code inside the if statement.

```asm
LOAD  Z, [10]
LOAD  1, [11]
SUB   Z, 1
JNEG  [4]
LOAD  Z, [12]
STORE Z, [13]
HALT
```

### 5.5.2 Comparison Operations

An equal-to comparison is detected by checking the zero flag. A jump zero instruction performs the check. A greater-than comparison is detected by checking the zero flag and the negative flag. A jump above instruction performs the check.

| Comparison | Instruction | Flag Condition |
| :--------- | :---------- | :------------- |
| `$a < b$` | `JNEG` | Negative flag is set |
| `$a = b$` | `JZ` | Zero flag is set |
| `$a > b$` | `JGT` | Zero flag and negative flag are clear |

## 6. Instruction Set

The instructions in this document are from an instruction set created for demonstration. The instruction names are descriptive. The instruction set is not from a production architecture.

| Instruction | Operands | Operation |
| :---------- | :------- | :-------- |
| `LOAD` | Register, Address | Loads the value at the address into the register |
| `STORE` | Register, Address | Stores the value in the register to the address |
| `ADD` | Register, Register | Adds the values in the two registers |
| `SUB` | Register, Register | Subtracts the second register from the first register |
| `INC` | Register | Increments the value in the register |
| `JUMP` | Address | Jumps to the address |
| `JNEG` | Address | Jumps to the address if the negative flag is set |
| `JZ` | Address | Jumps to the address if the zero flag is set |
| `JGT` | Address | Jumps to the address if the zero flag and the negative flag are clear |
| `HALT` | None | Stops execution |

## 7. Bit Shifts and Signed Values

A **bit-shift instruction** moves the bits in a register by a count supplied by the instruction or another register. A left shift discards bits that leave the fixed-width register and inserts zeros at the right. A logical right shift discards bits on the right and inserts zeros at the left. An arithmetic right shift preserves the sign position by copying the most significant bit. Exact shift-count and discarded-bit behavior depends on the instruction-set architecture.

A left shift can multiply an unsigned value by a power of two when no significant bit is discarded. A right shift can divide an unsigned value by a power of two, with any remainder discarded. These arithmetic interpretations do not apply without qualification to signed values or to shifts that overflow the register width.

Many processors represent signed integers using **two's complement**. To obtain the fixed-width representation of a negative value, the bits of the corresponding positive value are inverted and one is added. An $n$-bit two's-complement integer represents values from $-2^{n-1}$ through $2^{n-1}-1$. The same binary adder can perform signed addition and subtraction because the representation incorporates the required carry behavior. The processor and programming language determine how overflow is reported or handled.

## 8. Unsupported Instructions

The instruction decoder identifies whether an instruction encoding is supported by the processor. If an instruction is not supported, the processor raises an exception instead of executing an arbitrary operation. The operating system handles the exception according to its platform rules. On Linux, an invalid instruction commonly results in `SIGILL` being delivered to the process, whose default action is termination. [Interprocess Communication](20-interprocess-communication.md), Section 5, describes signal delivery and default actions in more detail.

Software can avoid executing optional instructions by checking processor capabilities before selecting an implementation. The available capability-query mechanism and the set of optional instructions depend on the instruction-set architecture.

### 8.1 Base Instruction Sets and Extensions

A processor manufacturer commonly defines a **base instruction set** when an architecture is introduced, then adds **instruction-set extensions** as chip designs improve. The x86-64 architecture accumulated extensions including MMX, SSE, SSE2, AVX, AVX2, and AVX-512 over several decades. A processor that implements an extension can still execute programs compiled for the base instruction set, because the base instructions remain part of the extended processor's supported encodings. A program compiled to use an extension is not guaranteed to run on an older processor that implements only the base instruction set or an earlier extension.

On x86 and x86-64 processors, software queries available extensions with the `CPUID` instruction before executing instructions from an extension. `CPUID` returns feature bits in general-purpose registers that indicate which extensions the running processor supports. On ARM64 processors, software can read system registers such as `ID_AA64ISAR0_EL1` and related identification registers, subject to operating-system exposure of that information, or query the operating system through a platform-specific interface. Executing an unsupported instruction still results in an exception on both architectures; the capability query allows software to avoid the exception by selecting a supported code path in advance.

## 9. Real Instruction Set Architectures

The conditional-jump instructions in Section 5 correspond to conditional branch instructions in production architectures. The table below compares the demonstration instructions with their approximate x86-64 and ARM64 equivalents for the comparison `a < b`.

| Purpose | Demonstration ISA | x86-64 (Intel syntax) | ARM64 (AArch64) |
| :--- | :--- | :--- | :--- |
| Compare two values | `SUB reg1, reg2` | `cmp rax, rbx` | `cmp x0, x1` |
| Jump if less than | `JNEG addr` | `jl label` | `b.lt label` |
| Jump if equal | `JZ addr` | `je label` | `b.eq label` |
| Jump if greater than | `JGT addr` | `jg label` | `b.gt label` |
| Unconditional jump | `JUMP addr` | `jmp label` | `b label` |

The x86-64 `cmp` instruction subtracts its operands and sets flags without storing the result, which corresponds to the subtraction used for comparison in Section 5.4.2. ARM64 uses a dedicated condition-flags register (`NZCV`, for negative, zero, carry, and overflow) that instructions such as `cmp` update and that conditional branches such as `b.lt` test, which corresponds to the negative, zero, and overflow flags described in Section 5.3.

### 9.1 References

- Intel Corporation, [Intel 64 and IA-32 Architectures Software Developer's Manual, Volume 2 (Instruction Set Reference)](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html), for the complete x86-64 instruction encoding and the `CPUID` instruction.
- Arm Limited, [Arm Architecture Reference Manual for A-profile Architecture](https://developer.arm.com/documentation/ddi0487/latest/), for the ARM64 condition-flags register and conditional branch instructions.
- The Open Group, [POSIX.1-2017 signal.h specification](https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/signal.h.html), for `SIGILL` and other standard signal names and default actions.

## 10. Summary

This document describes the execution of programs by a CPU. The document covers instruction fetching, decoding, execution, conditions, loops, flags, conditional jumps, bit shifts, signed values, unsupported instructions, instruction-set extensions, and a comparison with real instruction set architectures. The document does not cover compiler optimization in detail. The document does not cover memory management or CPU scheduling.
