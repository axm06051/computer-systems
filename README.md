# Computer Systems: From Logic Gates to Operating Systems

A sequential manual series covering the computing stack from transistors to
user-facing shells. Each manual assumes the reader has completed the manuals
listed before it.

**[Interactive assets](assets/index.html)** · **[GitHub repository](https://github.com/axm06051/computer-systems)**

## Table of Contents

1. [Transistor Operation and Logic Gates](01-transistors.md)
2. [Memory Circuits and Latches](02-memory.md)
3. [Dynamic Random-Access Memory](03-dram.md)
4. [CPU Operation](04-cpu.md)
5. [Clock Signals and Processor Step Sequencing](05-clocking.md)
6. [CPU Execution](06-cpu-execution.md)
7. [Variable Sizes and Data Types](07-variable-sizes.md)
8. [Programs and Processes](08-programs-and-processes.md)
9. [Application Binary Interface](09-application-binary-interface.md)
10. [The Call Stack](10-the-call-stack.md)
11. [Heap Allocation](11-heap-allocation.md)
12. [Arrays and Dynamic Collections](12-arrays-and-dynamic-collections.md)
13. [Operating System Boundaries](13-operating-system-boundaries.md)
14. [Interrupt Context Saving](14-interrupt-context-saving.md)
15. [Process Context and Context Switching](15-process-context.md)
16. [Memory Protection](16-memory-protection.md)
17. [CPU Scheduling](17-cpu-scheduling.md)
18. [Threads and Concurrency](18-threads-and-concurrency.md)
19. [Race Conditions](19-race-conditions.md)
20. [Interprocess Communication](20-interprocess-communication.md)
21. [Shells and File-System Objects](21-shells-and-file-system-objects.md)

## Sequence Rationale

The manuals progress from hardware foundations (1–3) to machine execution (4–6), to data and program representation (7–12), to operating-system mechanisms (13–16), to scheduling and concurrency (17–20), and finally to user-facing tools (21).

Within the operating-system mechanisms group:

- **Operating System Boundaries (13)** introduces processor privilege, interrupts, and system calls.
- **Interrupt Context Saving (14)** describes the processor and software state that must be preserved when control enters an operating-system handler.
- **Process Context and Context Switching (15)** builds on those mechanisms to describe how execution state is saved and restored when execution moves between processes or threads.
- **Memory Protection (16)** describes hardware enforcement of address and access boundaries and depends on the privileged operating-system mechanisms introduced earlier.

**Shells and File-System Objects (21)** is the final core manual because it applies the preceding process, ABI, operating-system, and file-system concepts to user-facing command execution and pathname resolution. Language-implementation topics are excluded because they introduce a separate compiler and programming-language domain that is not required by the architecture and systems progression. The appendices extend the core sequence into the surrounding systems-engineering domains that the title evokes, including networking, GPUs, virtualization, storage, real-time media, cloud infrastructure, and troubleshooting.

## Appendices

- [Appendix A: Computer Systems Glossary](APPENDIX-A-GLOSSARY.md)
- [Appendix B: Introductory Syllabus](APPENDIX-B-SYLLABUS.md)
- [Appendix C: Bibliography and Primary Documentation](APPENDIX-C-BIBLIOGRAPHY.md)
- [Appendix D: Worked Examples and Low-Level Tracing](APPENDIX-D-WORKED-EXAMPLES.md)
- [Appendix E: Animations, Simulations, and Practice Exercises](APPENDIX-E-ANIMATIONS-AND-PRACTICE.md)
- [Appendix F: GPUs and Heterogeneous Computing](APPENDIX-F-GPUS.md)
- [Appendix G: Networking for Computer Systems](APPENDIX-G-NETWORKING.md)
- [Appendix H: Software-Driven Broadcast and IP Media Systems](APPENDIX-H-BROADCAST-IP-MEDIA.md)
- [Appendix I: Virtualization, Containers, and Cloud Systems](APPENDIX-I-VIRTUALIZATION-CONTAINERS-CLOUD.md)
- [Appendix J: Storage, I/O, DMA, and PCIe](APPENDIX-J-STORAGE-IO-DMA-PCIE.md)
- [Appendix K: Distributed and Real-Time Systems](APPENDIX-K-DISTRIBUTED-REAL-TIME-SYSTEMS.md)
- [Appendix L: Troubleshooting and Diagnostic Playbooks](APPENDIX-L-TROUBLESHOOTING.md)
- [Appendix M: Final Coverage Audit](APPENDIX-M-COVERAGE-AUDIT.md)

## Web Edition

The repository includes a GitHub Actions workflow for publishing the manuals and appendices as a searchable web textbook with MkDocs Material. The workflow builds the site on pushes to `main` and can also be run manually. Mermaid diagrams in the source are rendered by the web edition rather than treated as plain code blocks.
