# Appendix C: Bibliography and Primary Documentation

The bibliography favors freely accessible primary documentation and Linux manual pages. Web documentation changes over time; where a project maintains versioned documentation, the stable/current landing page is preferred.

## Linux and Ubuntu

- [Ubuntu 26.04 LTS Release Notes](https://documentation.ubuntu.com/release-notes/26.04/) — current Ubuntu LTS release and lifecycle information.
- [Ubuntu Server Documentation](https://ubuntu.com/server/docs/) — practical and explanatory Linux administration material.
- [Ubuntu Networking Documentation](https://ubuntu.com/server/docs/explanation/networking/) — networking concepts and configuration using Netplan.
- [Ubuntu Manpage Repository](https://manpages.ubuntu.com/) — browsable Ubuntu man pages, including the current `resolute` series.
- [Linux Kernel Documentation](https://docs.kernel.org/) — primary documentation for kernel subsystems and interfaces.
- [Linux Scheduler Documentation](https://www.kernel.org/doc/html/latest/scheduler/) — scheduling concepts and implementation documentation.
- [Linux Memory Management Documentation](https://kernel.org/doc/html/latest/admin-guide/mm/index.html) — virtual memory, allocation, NUMA, huge pages, and related facilities.
- [Linux Networking Documentation](https://www.kernel.org/doc/html/latest/networking/) — networking subsystems, drivers, packet processing, offloads, and diagnostics.
- [Linux Core API Documentation](https://cdn.kernel.org/doc/html/latest/core-api/index.html) — atomics, IRQs, memory barriers, DMA, allocation, and other kernel mechanisms.

## Processor architecture

- [Intel 64 and IA-32 Architectures Software Developer's Manuals](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html) — x86-64 architecture, instruction set, system programming, exceptions, paging, and performance.
- [Arm Learn the Architecture](https://developer.arm.com/Architectures/learn-the-architecture) — AArch64 exception model, memory model, instruction set, and system architecture.
- [RISC-V Specifications](https://docs.riscv.org/) — open ISA and privileged architecture specifications.
- [AMD64 Architecture Programmer's Manual](https://www.amd.com/en/support/tech-docs) — AMD64 architecture reference material.

## Programming languages and binary interfaces

- [System V AMD64 ABI](https://gitlab.com/x86-psABIs/x86-64-ABI) — procedure calling convention and object-file ABI.
- [The ELF Specification](https://refspecs.linuxfoundation.org/elf/) — executable and linkable object format.
- [POSIX.1 / The Open Group Base Specifications](https://pubs.opengroup.org/onlinepubs/9799919799/) — process, file, thread, and system-interface semantics.
- [ISO/IEC JTC 1/SC 22/WG 14 — C](https://open-std.org/jtc1/sc22/wg14/) — current C23 standardization information.
- [Rust Reference](https://doc.rust-lang.org/reference/) — current language reference.
- [Python 3.14 Documentation](https://docs.python.org/3.14/) — current Python 3.14 documentation and implementation details.

## GPUs and heterogeneous computing

- [NVIDIA CUDA Toolkit Documentation](https://docs.nvidia.com/cuda/) — current CUDA toolkit documentation; the current documentation identifies CUDA 13.4 and includes architecture, compiler, profiling, libraries, and deployment material.
- [CUDA Programming Guide](https://docs.nvidia.com/cuda/cuda-programming-guide/) — GPU programming model, host/device execution, memory, kernels, streams, synchronization, and advanced features.
- [PTX ISA](https://docs.nvidia.com/cuda/parallel-thread-execution/) — NVIDIA's virtual GPU instruction set.
- [CUDA C++ Best Practices Guide](https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/) — performance and optimization methodology.

## Networking

- [Ubuntu Networking](https://ubuntu.com/server/docs/how-to/networking/) — Netplan, DHCP, DNS, routing, firewalling, and network tools.
- [RFC Editor](https://www.rfc-editor.org/) — authoritative IETF RFC archive.
- [RFC 3550 — RTP](https://www.rfc-editor.org/rfc/rfc3550) — real-time media transport and RTCP.
- [IEEE 1588 Working Group](https://sagroups.ieee.org/1588/) — public material for Precision Time Protocol.
- [IEEE 1588-2019](https://standards.ieee.org/ieee/1588/6825/) — active PTP standard reference page.

## Professional media and broadcast engineering

- [SMPTE ST 2110](https://www.smpte.org/standards/st2110) — professional video, audio, and data over managed IP networks.
- [SMPTE ST 2110 FAQ](https://www.smpte.org/smpte-st-2110-faq) — accessible overview of the suite.
- [AMWA NMOS Specifications](https://specs.amwa.tv/nmos/specs-by-type.html) — IS-04 discovery/registration, IS-05 connection management, and related specifications.
- [AMWA IS-04](https://specs.amwa.tv/is-04/) — NMOS discovery and registration.
- [AMWA IS-05](https://specs.amwa.tv/is-05/) — NMOS device connection management.
- [Grass Valley AMPP](https://www.grassvalley.com/solutions/ampp-explained/) — current public description of AMPP OS and cloud/on-prem/hybrid media workflows.

## Virtualization and containers

- [QEMU Documentation](https://www.qemu.org/docs/master/) — machine emulation and virtualization.
- [libvirt Documentation](https://www.libvirt.org/docs/) — virtualization management APIs and operational guidance.
- [Ubuntu libvirt Documentation](https://ubuntu.com/server/docs/how-to/virtualisation/libvirt/) — KVM/libvirt setup in an Ubuntu context.
- [Linux cgroup v2 Documentation](https://docs.kernel.org/admin-guide/cgroup-v2.html) — resource-control and process-grouping semantics.
- [Docker Engine Documentation](https://docs.docker.com/engine/) — containers, images, networking, storage, and runtime behavior.
- [Docker Engine Security](https://docs.docker.com/engine/security/) — namespaces, cgroups, daemon exposure, and container security boundaries.

## Storage and observability

- [Linux NVMe Documentation](https://docs.kernel.org/nvme/) — Linux NVMe subsystem.
- [Linux perf Documentation](https://docs.kernel.org/admin-guide/perf-security.html) — performance counters and security considerations.
- [Linux tracing documentation](https://docs.kernel.org/trace/index.html) — tracing and instrumentation facilities.

## Versioning principle

The bibliography intentionally avoids treating a textbook edition number as authoritative when a project maintains living technical documentation. For fast-moving systems such as Linux, Ubuntu, CUDA, Docker, QEMU, AMWA NMOS, and AMPP, students should verify the version and release date of the documentation before relying on a detail in production.
