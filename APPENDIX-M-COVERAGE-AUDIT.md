# Appendix M: Final Coverage Audit

## Purpose

This appendix records what the book now covers and where each major systems topic lives. It is also a boundary statement: a topic can be acknowledged without claiming that the book is a specialist reference for it.

## Core coverage

| Topic | Primary location | Status |
| --- | --- | --- |
| Transistors and logic | 01 | Covered from first principles |
| Latches and registers | 02, 05 | Covered |
| DRAM | 03 | Covered |
| CPU datapath and control | 04–06 | Covered |
| ISA and assembly | 04, 06, 09 | Covered |
| Data representation | 07 | Covered |
| Executables and processes | 08–09 | Covered |
| Stack and heap | 10–11 | Covered |
| Arrays and collections | 12 | Covered |
| Privilege, interrupts, syscalls | 13–14 | Covered |
| Context switching | 15 | Covered |
| Virtual memory/protection | 16 | Covered |
| Scheduling | 17 | Covered |
| Threads/concurrency | 18–19 | Covered |
| IPC | 20 | Covered |
| Shells and file-system objects | 21 | Covered |

## Supplementary systems coverage

| Topic | Appendix | Purpose |
| --- | --- | --- |
| Computer Science 101 terminology | A | Glossary |
| University course structure | B | Syllabus and learning outcomes |
| Primary references | C | Bibliography |
| Low-level hands-on work | D | Worked examples |
| Interactive learning | E | Animations and exercises |
| GPUs/NVIDIA/CUDA | F | Heterogeneous computing |
| Networking | G | TCP/IP, RTP, PTP, Linux networking |
| Broadcast/IP media | H | ST 2110, NMOS, AMPP, timing |
| VMs/containers/cloud | I | KVM, QEMU, libvirt, cgroups, namespaces |
| Storage/I/O/PCIe/NVMe | J | Device and data paths |
| Distributed/real-time systems | K | Failure domains and deadlines |
| Troubleshooting | L | Diagnostic playbooks |
| Scope and completeness | M | Coverage map |

## Important subjects that are intentionally not specialist chapters

The book now introduces but does not attempt to exhaust:

- compiler implementation and parsing;
- advanced operating-system kernel development;
- formal distributed-systems theory;
- cryptography;
- database internals;
- advanced graphics programming;
- radio/wireless systems;
- detailed switch ASIC architecture;
- complete SMPTE standards text;
- complete AMWA NMOS implementation requirements;
- vendor-specific cloud internals;
- vendor-specific NVIDIA microarchitecture details.

These subjects are either separate disciplines or rapidly changing implementation areas. The appendices establish enough conceptual context to let a student proceed into the specialist documentation without pretending that an introductory systems text can replace those references.

## The title's implied scope

The title **Computer Systems: From Logic Gates to Operating Systems** is defensible because the core sequence establishes the machine and operating-system foundations, while the appendices connect those foundations to GPUs, networking, professional media, virtualization, storage, distributed systems, and cloud infrastructure.

The book should not be described as a complete reference to every area of computer science. It is a bottom-up systems course and an entry point to more specialized engineering domains.
