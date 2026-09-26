# Appendix B: Introductory Syllabus

## Course title

### Computer Systems: From Logic Gates to Operating Systems

## Course description

This course develops a bottom-up mental model of a computer system. Students begin with transistors and digital logic, construct a conceptual CPU and memory system, then follow execution into machine code, processes, operating-system mechanisms, concurrency, IPC, networking, virtualization, GPUs, and real-time media systems.

The course uses Linux, preferably Ubuntu 26.04 LTS, as the principal practical environment. Ubuntu 26.04 LTS was released on 23 April 2026 and is the current LTS release at the time of this edition. [Ubuntu 26.04 LTS release notes](https://documentation.ubuntu.com/release-notes/26.04/).

## Learning outcomes

By the end of the course, a student should be able to:

1. Explain how transistor behavior becomes logic gates and sequential circuits.
2. Trace an instruction from program representation through CPU execution.
3. Explain registers, stacks, heaps, arrays, virtual memory, and process address spaces.
4. Read simple x86-64 and AArch64 assembly and recognize the role of an ISA and ABI.
5. Explain system calls, interrupts, context switches, scheduling, and memory protection.
6. Identify race conditions and explain why atomicity and synchronization matter.
7. Compare processes, threads, IPC mechanisms, and network sockets.
8. Diagnose basic Linux CPU, memory, storage, and network problems using command-line tools.
9. Explain the architectural difference between CPUs and GPUs and the host/device programming model.
10. Explain IP networking fundamentals relevant to software-defined media systems.
11. Explain the relationship between ST 2110, RTP, PTP, and NMOS at a systems level.
12. Explain how virtualization, containers, cgroups, namespaces, and cloud infrastructure build on operating-system primitives.
13. Connect low-level mechanisms to production systems such as cloud media processing and distributed live-production workflows.
14. Form testable hypotheses when troubleshooting instead of changing multiple variables at once.

## Recommended 14-week schedule

| Week | Topics | Laboratory focus |
| --- | --- | --- |
| 1 | Transistors, logic gates, binary representation | Build and simulate truth tables; inspect binary values |
| 2 | Latches, flip-flops, registers, DRAM | Step through a memory-cell model |
| 3 | CPU datapath, ALU, control, clocking | Trace a toy instruction cycle |
| 4 | CPU execution, assembly, ISA, ABI | Assemble and disassemble small programs |
| 5 | Data types, floating point, arrays | Inspect object sizes and representations |
| 6 | Processes, stack, heap, executable images | Use `/proc`, `pmap`, `gdb`, and `readelf` |
| 7 | System calls, interrupts, context switching | Trace `strace` output and process state |
| 8 | Virtual memory and protection | Inspect mappings with `pmap` and `/proc/<pid>/maps` |
| 9 | Scheduling, threads, concurrency | Measure thread scheduling and CPU affinity |
| 10 | Race conditions, atomics, IPC | Reproduce a race and repair it |
| 11 | Networking fundamentals | Use `ip`, `ss`, `tcpdump`, DNS tools, and routing tables |
| 12 | GPUs and heterogeneous computing | Run a simple CUDA or GPU-accelerated workload where hardware permits |
| 13 | Virtual machines, containers, cloud systems | Run QEMU/KVM or containers; inspect namespaces and cgroups |
| 14 | ST 2110, PTP, NMOS, broadcast systems, capstone | Design and troubleshoot a simplified live-media network |

## Assessment model

A practical university course can use:

- 20% weekly concept checks;
- 25% low-level laboratories;
- 15% debugging/troubleshooting exercises;
- 15% architecture and systems design exercises;
- 25% final capstone.

## Capstone

Design a small software-defined live-production service. The design should show:

1. media ingress;
2. process and thread structure;
3. memory ownership;
4. network interfaces and routing;
5. timing and synchronization;
6. CPU/GPU workload placement;
7. virtualization or container boundaries;
8. monitoring and failure handling; and
9. a troubleshooting runbook.

Students should explain every layer using concepts from the core chapters rather than treating the application as a black box.

## Practical environment

A Linux workstation or virtual machine is sufficient for most exercises. An NVIDIA GPU is useful but not mandatory. Broadcast exercises can be performed with packet captures and synthetic RTP streams when professional media hardware is unavailable.

The course deliberately distinguishes **portable concepts** from **Linux-specific mechanisms**. Linux commands are used because they make the concepts observable, not because Linux behavior should be treated as universal operating-system behavior.
