# Web Book Roadmap

## Goal

Build a single, coherent university-level web book that takes a learner from transistor-level digital logic through CPU architecture, memory, machine execution, operating systems, networking, virtualization, distributed systems, and cloud infrastructure.

The book should teach mechanisms rather than present disconnected technology surveys. Every later layer should reuse concepts established earlier. Each major concept should have one primary home, with cross-references for secondary uses.

## 1. Foundation: Logic to a Working Computer

- [x] Transistors and logic gates.
- [x] Combinational and sequential logic.
- [x] Latches, registers, clocking, and state.
- [x] DRAM and memory addressing.
- [x] Buses, registers, datapaths, and control.
- [x] Fetch/decode/execute and control flow.
- [ ] Add a complete worked path from a logic gate to a small instruction executing in a conceptual CPU.
- [ ] Add explicit timing/state diagrams where prose is insufficient.
- [ ] Add end-of-manual prediction exercises for each hardware mechanism.

## 2. Data, ISA, ABI, and Execution

- [x] Integer and floating-point representation.
- [x] Arrays, stack, heap, and process address space.
- [x] Executables and processes.
- [x] ABI and calling conventions.
- [ ] Establish one consistent worked ISA vocabulary across the core manuals.
- [ ] Trace one program from source-level intent through assembly, ABI, executable, process, stack, heap, and system call.
- [ ] Add architecture-specific comparison notes for x86-64, Arm64, and RISC-V without making one ISA the conceptual dependency.

## 3. Operating-System Mechanisms

- [x] Privilege and protection boundaries.
- [x] Interrupts, exceptions, and system calls.
- [x] Context saving and context switching.
- [x] Virtual memory and protection.
- [x] Scheduling.
- [x] Threads, races, synchronization, and IPC.
- [x] Shells and file-system objects.
- [ ] Add a complete process-lifecycle trace from `exec` through scheduling, blocking, wakeup, and exit.
- [ ] Add Linux mechanism labs using current Ubuntu-compatible commands.
- [ ] Add syscall, `/proc`, scheduler, and memory-observation exercises.

## 4. Storage, I/O, and Device Paths

- [x] PCIe, DMA, NVMe, and I/O are covered in the storage appendix.
- [ ] Connect the device path explicitly to CPU instructions, virtual memory, interrupts, DMA, cache coherence, and application I/O.
- [ ] Add one end-to-end I/O trace from application buffer to device and back.
- [ ] Add latency and throughput measurement exercises.

## 5. Networking

- [x] Networking appendix exists.
- [ ] Build a bottom-up packet path: socket → syscall → kernel → NIC → Ethernet → IP → routing → transport → peer socket.
- [ ] Explain ARP/ND, switching, routing, MTU, fragmentation, queues, loss, retransmission, and congestion as mechanisms.
- [ ] Add TCP, UDP, DNS, TLS, and HTTP as layered applications of the underlying mechanisms.
- [ ] Add packet-capture labs with reproducible Linux commands.
- [ ] Add latency, jitter, loss, reordering, and MTU troubleshooting labs.

## 6. Real-Time and Professional IP Media

- [x] RTP, PTP, ST 2110, NMOS, and professional media systems are scoped in the appendices.
- [ ] Tie media timing directly to clocks, packets, buffers, queues, DMA, CPU scheduling, and network behavior.
- [ ] Add a complete sender → network → receiver timing/data-flow case study.
- [ ] Separate standards requirements from implementation choices and vendor behavior.

## 7. Parallel and Heterogeneous Computing

- [x] GPU/CUDA appendix exists.
- [ ] Explain CPU/GPU execution models from the existing CPU and memory foundations.
- [ ] Add host/device memory movement, DMA, PCIe, kernels, synchronization, occupancy, and performance measurement.
- [ ] Add one minimal CUDA lab and one profiling-oriented exercise.

## 8. Virtualization and Containers

- [x] KVM, QEMU, libvirt, namespaces, and cgroups are scoped.
- [ ] Explain virtualization from privileged CPU instructions and memory protection upward.
- [ ] Trace VM exit/entry, virtual CPU scheduling, virtual memory, virtual devices, and host I/O.
- [ ] Explain containers as kernel isolation rather than lightweight VMs.
- [ ] Add minimal reproducible KVM/QEMU and container labs.

## 9. Distributed Systems

- [x] Distributed and real-time systems appendix exists.
- [ ] Add failure, partial failure, retries, timeouts, ordering, idempotency, replication, quorum, and consistency as mechanisms.
- [ ] Connect distributed failures to the networking and storage layers already taught.
- [ ] Add small experiments that demonstrate latency, failure, retry storms, and clock differences.

## 10. Cloud Computing

- [ ] Establish the cloud stack explicitly: physical machine → virtualization → network → storage → orchestration → service → control plane.
- [ ] Cover regions, zones, failure domains, capacity, autoscaling, load balancing, service discovery, and managed infrastructure.
- [ ] Explain containers and orchestration as consequences of earlier OS and distributed-systems mechanisms.
- [ ] Cover object, block, and file storage and their system-level trade-offs.
- [ ] Cover observability: logs, metrics, traces, health checks, and distributed correlation.
- [ ] Cover identity, secrets, isolation, least privilege, and basic cloud security mechanisms.
- [ ] Add Kubernetes concepts only after containers, networking, storage, and distributed systems are established.
- [ ] Add cloud troubleshooting scenarios that identify the failing layer before prescribing a vendor-specific fix.

## 11. Cross-Cutting Teaching System

- [ ] Give every manual explicit prerequisites and learning outcomes.
- [ ] Give every major mechanism at least one worked example.
- [ ] Progress exercises from observation → prediction → implementation → troubleshooting.
- [ ] Add verification criteria to practical exercises.
- [ ] Add diagrams for datapaths, memory, address translation, interrupts, scheduling, races, packet flow, GPU execution, VM isolation, and cloud control/data planes.
- [ ] Keep interactive assets synchronized with the canonical Markdown explanations.
- [ ] Make interactive exercises keyboard-accessible and usable without animation timing.
- [ ] Provide reset/step/pause controls where stateful simulations require them.
- [x] Add cross-layer systems capstones that require causal reasoning from hardware through cloud infrastructure.

## 12. Editorial and Technical Quality

- [ ] Assign every concept one primary owner.
- [ ] Remove duplicate explanations that can become inconsistent.
- [ ] Distinguish architectural requirements from implementation choices.
- [ ] Mark platform/version-specific behavior explicitly.
- [ ] Prefer architecture specifications, standards, Linux documentation, and official project documentation.
- [ ] Replace unsupported universal claims with scoped statements.
- [ ] Keep the core sequence stable while allowing appendices to expand specialist domains.
- [ ] Run Markdownlint and structural checks on every change.
- [ ] Validate every internal link, Mermaid block, code block, asset reference, and navigation entry.
- [ ] Never claim an interactive asset or deployment works without executing and verifying it.

## 13. Web-Book Architecture

- [x] `mkdocs.yml` is the canonical navigation source.
- [x] Core manuals and appendices are explicitly ordered.
- [x] Interactive teaching assets have a dedicated navigation entry.
- [x] End-to-end capstones have a dedicated navigation entry.
- [ ] Make generated web content deterministic and reproducible.
- [ ] Validate that every Markdown source is either published or deliberately excluded.
- [ ] Validate that every published page has a stable navigation path.
- [ ] Verify search coverage across all manuals and appendices.
- [ ] Verify light/dark/system theme behavior on the published site.
- [ ] Keep GitHub repository navigation, web-book navigation, and GitBook synchronization from becoming competing sources of truth.

## 14. Ultimate Web-Book Completion Program

The final quality pass is organized as a vertical traversal of the stack rather than a collection of unrelated enhancements.

### Hardware and machine execution

- [ ] Complete the gate → register → memory → datapath → instruction → CPU worked trace.
- [ ] Add timing and state diagrams for representative sequential mechanisms.
- [ ] Add cache hierarchy, locality, cache misses, coherence, and memory-ordering foundations where required by later systems material.
- [ ] Establish one small worked ISA used consistently for conceptual tracing.
- [ ] Compare x86-64, Arm64, and RISC-V at the architectural boundary.

### Processes and operating systems

- [ ] Complete the program → executable → `exec` → process → schedule → block → wake → exit trace.
- [ ] Add reproducible Linux observation labs using `/proc`, system-call tracing, scheduling observation, virtual-memory inspection, and file-descriptor inspection.
- [ ] Connect protection, virtual memory, interrupts, scheduling, synchronization, and IPC into one coherent process model.

### I/O and networking

- [ ] Complete the application-buffer → virtual memory → DMA → PCIe → device → interrupt/completion path.
- [ ] Complete the socket → syscall → kernel → NIC → Ethernet → IP → routing → transport → peer path.
- [ ] Add packet-capture exercises and quantitative latency/loss/jitter/MTU investigations.

### Media and acceleration

- [ ] Complete the CPU/GPU memory-transfer and kernel-execution path.
- [ ] Complete the producer → RTP/UDP → network → receiver → timing/presentation path.
- [ ] Tie PTP and media timestamps to the clocking and packet mechanisms established earlier.

### Virtualization and distributed systems

- [ ] Complete the host CPU → hypervisor → VM exit/entry → guest → virtual device path.
- [ ] Explain container isolation from namespaces, cgroups, capabilities, and the host kernel.
- [ ] Build failure and timing experiments for distributed systems.

### Cloud

- [ ] Build the physical → virtual → container → orchestration → service → control-plane dependency chain.
- [ ] Teach regions, zones, failure domains, scaling, load balancing, service discovery, storage classes, observability, and security as consequences of lower-level mechanisms.
- [ ] Add Kubernetes only after the underlying mechanisms are established.
- [ ] Add end-to-end cloud failure investigations.

### Teaching quality

- [ ] Give every manual explicit prerequisites, learning outcomes, worked example, prediction exercise, implementation exercise, troubleshooting exercise, and verification criteria.
- [ ] Ensure diagrams and interactive assets have a specific instructional purpose.
- [ ] Ensure stateful simulations support pause, step, reset, keyboard operation, and non-animation alternatives where appropriate.
- [ ] Create capstone assessments that require downward causal tracing rather than vocabulary recall.

### Release quality

- [ ] Run Markdownlint.
- [ ] Validate every local link.
- [ ] Validate every navigation target.
- [ ] Validate every Mermaid block structurally.
- [ ] Validate every referenced asset.
- [ ] Inspect the generated site for navigation, mathematics, code, diagrams, and theme behavior.
- [ ] Verify the GitHub Pages workflow from a real successful run.
- [ ] Verify GitBook synchronization separately from GitHub Pages publication.
- [ ] Remove stale files, duplicate sources, temporary branches, and abandoned publication paths.

## Definition of Done

The project is complete when a learner can start with no hardware background, progress through the core machine and OS mechanisms without hidden prerequisites, and then follow explicit dependency paths into networking, storage, GPUs, virtualization, distributed systems, and cloud computing. Every transition should identify the mechanism being reused, every practical exercise should be reproducible and verifiable, and the published web book should expose one coherent navigation hierarchy.
