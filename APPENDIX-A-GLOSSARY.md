# Appendix A: Computer Systems Glossary

This glossary is written at approximately Computer Science 101 level. Definitions are intentionally short. The chapter in which a concept is developed should be preferred when the definition needs architectural detail.

## A–C

- **ABI (Application Binary Interface)** — Rules that let separately compiled software agree on calling conventions, binary formats, data representation, and other machine-level interfaces.
- **ALU (Arithmetic Logic Unit)** — CPU circuitry that performs arithmetic and logical operations.
- **Address** — A value used to identify a location in an address space.
- **Address space** — The set of addresses a program or hardware component can use.
- **Allocator** — Software that manages storage and satisfies dynamic-memory requests.
- **Atomic operation** — An operation that other concurrent execution contexts cannot observe in a partially completed state.
- **Cache** — A smaller, faster storage layer that keeps copies of data likely to be reused.
- **Call stack** — A stack used to organize function-call state, including return information and often local storage.
- **Capability** — A token or reference that grants access to a resource; the term is used in several security and operating-system models.
- **Clock** — A periodic signal used to coordinate synchronous digital logic.
- **Context switch** — A change from one schedulable execution context to another, including the required state save and restore.
- **Core** — An execution engine within a processor package capable of executing instructions.
- **CPU (Central Processing Unit)** — The general-purpose processor that executes machine instructions.
- **Critical section** — Code that accesses shared state and therefore requires controlled synchronization when executed concurrently.

## D–F

- **Data race** — A conflicting unsynchronized access to shared memory in a language memory model that defines such a condition as a race.
- **Deadlock** — A state in which a set of execution contexts waits indefinitely for resources held by one another.
- **DMA (Direct Memory Access)** — Device-assisted transfer of data between a device and memory without requiring the CPU to copy every byte itself.
- **DRAM** — Dynamic random-access memory that stores each bit using charge in a memory cell and must be refreshed.
- **Driver** — Software that provides an interface between an operating system and a hardware or virtual device.
- **Dynamic linking** — Resolving some program dependencies at load time or during execution rather than embedding all code into one executable image.
- **Dynamic memory** — Storage whose lifetime or size is managed during program execution.
- **ELF (Executable and Linkable Format)** — A common executable and object-file format on Unix-like systems, including Linux.
- **Exception** — An event that causes a processor to transfer control to an architecturally defined handler.
- **Environment variable** — A name/value string inherited through a process environment and commonly used to configure programs.
- **Executable** — A file or image containing code and metadata that an operating system can load for execution.
- **File descriptor** — A process-local integer handle referring to an open kernel-managed file-like object on Unix-like systems.
- **File system** — Software and data structures that organize persistent storage into files, directories, metadata, and names.
- **Firmware** — Software stored in nonvolatile or otherwise persistent device memory that initializes or controls hardware.

## G–M

- **GPU (Graphics Processing Unit)** — A processor designed for highly parallel workloads, especially graphics and data-parallel computation.
- **Heap** — A region or collection of mappings used by an allocator for dynamically managed storage; its exact implementation is system-dependent.
- **Hypervisor** — Software or firmware that creates and manages virtual machines.
- **I/O (Input/Output)** — Communication between a computing system and devices or external systems.
- **Instruction** — A machine-level operation defined by an instruction set architecture.
- **Interrupt** — An externally generated event that can cause the processor to enter an exception or interrupt handler.
- **IPC (Interprocess Communication)** — Mechanisms that let processes exchange data or coordinate activity.
- **ISA (Instruction Set Architecture)** — The programmer-visible specification of a processor's instructions, registers, memory model, and related behavior.
- **Jitter** — Variation in the timing of events relative to their intended or nominal schedule.
- **Kernel** — The privileged core of an operating system that manages hardware and system resources.
- **Latency** — Time between an initiating event and the corresponding result or response.
- **L1/L2/L3 cache** — Hierarchical CPU caches, with smaller and generally faster levels closer to execution resources.
- **Linker** — A tool that combines object files and libraries into an executable or shared object and resolves symbols.
- **MMU (Memory Management Unit)** — Hardware that participates in virtual-address translation and access checking.
- **Multicast** — Network delivery in which one sender can address a subscribed group of receivers.
- **Mutex** — A mutual-exclusion synchronization primitive that allows one owner at a time.

## N–R

- **Namespace** — An isolated view of a set of names or resources; Linux namespaces virtualize several kinds of system resources.
- **NUMA (Non-Uniform Memory Access)** — A memory architecture in which access cost depends on which processor or memory node is involved.
- **NVMe** — A family of standards and interfaces for accessing nonvolatile storage, commonly over PCIe.
- **Operating system** — Software that manages hardware resources and provides abstractions and services to applications.
- **Page** — A fixed-size unit used by virtual-memory systems.
- **Page fault** — A processor exception caused by a virtual-memory access that requires operating-system handling; not every page fault represents an invalid program action.
- **PCIe** — A high-speed serial interconnect used to connect CPUs, GPUs, storage controllers, network adapters, and other devices.
- **Pipeline** — An organization that overlaps stages of instruction or data processing to increase throughput.
- **Process** — A running program instance together with its execution state and operating-system-managed resources.
- **PTP (Precision Time Protocol)** — IEEE 1588 protocol family for synchronizing clocks over packet networks.
- **Race condition** — A correctness condition in which program behavior depends on the relative timing or ordering of concurrent activities.
- **Register** — Small, fast storage directly accessible as part of a processor's architectural or implementation state.
- **RTP (Real-time Transport Protocol)** — An Internet protocol framework for carrying real-time media and associated timing information.
- **RTCP** — RTP control protocol used for monitoring, identification, and related session control.

## S–Z

- **Scheduler** — Operating-system component that selects runnable execution contexts for CPU time.
- **Semaphore** — A synchronization primitive representing a counter or permit set, often used for coordination and resource limits.
- **SIMD** — Single Instruction, Multiple Data execution in which one instruction operates on multiple data elements.
- **SMP (Symmetric Multiprocessing)** — A system model in which multiple processors or cores participate as peers in one operating-system instance.
- **Socket** — An operating-system communication endpoint, commonly used for network or local IPC.
- **Stack frame** — A function-call record containing some combination of return state, saved registers, parameters, and local storage.
- **ST 2110** — SMPTE standards for transporting separate timed professional-media essence streams over managed IP networks.
- **System call** — A controlled interface through which user software requests a kernel service.
- **Thread** — A schedulable execution context within a process; threads normally share the process's address space.
- **TLB (Translation Lookaside Buffer)** — A cache of recent virtual-to-physical address translations.
- **Trap** — A synchronous processor event, commonly generated by an instruction or detected during instruction execution.
- **UDP** — Connectionless transport protocol providing datagrams without TCP-style delivery guarantees.
- **Virtual machine** — An isolated software-visible machine environment presented by a hypervisor.
- **Virtual memory** — A system in which software addresses are translated to physical memory or other backing storage.
- **VLAN** — A logical Layer-2 network partition represented in Ethernet frames and switch configuration.
- **VM (Virtual Machine)** — See *virtual machine*.
- **VSync** — A display synchronization concept; in computer graphics it coordinates presentation with a display refresh schedule.
- **Zero-copy** — A design goal in which data avoids unnecessary intermediate copying between software or hardware buffers.

## Broadcast and Media Terms

- **AES67** — An interoperability standard for professional audio-over-IP systems, commonly used alongside ST 2110 audio workflows.
- **ANC (Ancillary Data)** — Non-picture data carried alongside or associated with video essence, such as captions or signaling.
- **Essence** — The actual media component of a production signal, such as video, audio, or ancillary data.
- **Flow** — A networked stream of media or other data between endpoints.
- **NMOS** — AMWA Networked Media Open Specifications for discovery, registration, connection management, and related networked-media control.
- **PTP Grandmaster** — The clock selected as the timing reference for a PTP domain.
- **SMPTE** — Society of Motion Picture and Television Engineers.
- **SDI** — Serial Digital Interface, a family of broadcast interfaces traditionally used for baseband media transport.
- **SRT** — Secure Reliable Transport, a protocol designed for resilient contribution and transport of media over IP networks.
- **ST 2110-20** — The ST 2110 component covering uncompressed active video transport.
- **ST 2110-30** — The ST 2110 component covering PCM digital audio transport based on RTP/AES67 practices.
- **ST 2110-40** — The ST 2110 component covering ancillary data transport.

## How to Use the Glossary

A glossary definition is a starting point, not a substitute for a model. For example, knowing that a TLB is a cache does not explain why a TLB miss can produce a page-table walk, and knowing that a thread is a schedulable context does not explain how its stack and register state interact with a context switch. Use the glossary to locate the concept, then return to the relevant chapter and work through the examples.
