# Appendix I: Virtualization, Containers, and Cloud Systems

## Virtual machines

A virtual machine presents software with a machine-like environment whose CPU, memory, storage, and devices are mediated by a hypervisor and virtual-device model.

QEMU supports full-system emulation and virtualization, including integration with KVM. Current QEMU documentation distinguishes full-system emulation from user-mode emulation and virtualization. [QEMU documentation](https://www.qemu.org/docs/master/system/index.html).

libvirt provides a management API and tooling layer over virtualization technologies including KVM and QEMU. [libvirt](https://www.libvirt.org/).

## Hardware-assisted virtualization

Modern CPUs provide virtualization extensions that allow a guest operating system to execute privileged operations under controlled hardware mediation. The exact mechanism is architecture-specific.

The conceptual path is:

```text
Guest process
    ↓
Guest kernel
    ↓
virtual CPU / virtual MMU
    ↓
hypervisor + hardware virtualization
    ↓
host kernel
    ↓
physical CPU / MMU
```

This creates another layer between an application's virtual address and physical hardware.

## Containers

A container is not simply a lightweight VM. Linux containers commonly use namespaces for isolation and cgroups for resource organization and control. Docker's documentation explicitly identifies namespaces and cgroups as fundamental container mechanisms. [Docker Engine security](https://docs.docker.com/engine/security/).

The Linux cgroup v2 documentation describes cgroups as a mechanism for organizing processes hierarchically and distributing resources under configurable controls. [cgroup v2](https://docs.kernel.org/admin-guide/cgroup-v2.html).

A simplified container stack is:

```text
application
   ↓
process / thread
   ↓
Linux namespaces + cgroups
   ↓
Linux kernel
   ↓
hardware / VM
```

The application still uses ordinary CPU instructions, memory mappings, system calls, files, and sockets. The isolation comes from kernel mechanisms.

## VM versus container

| Property | VM | Container |
| --- | --- | --- |
| Kernel | Guest kernel | Host kernel shared |
| Isolation boundary | Virtual machine boundary | Kernel namespace/security boundary |
| Startup cost | Generally higher | Generally lower |
| Hardware model | Virtual hardware | Host-visible kernel interfaces |
| Typical use | Strong OS isolation, heterogeneous guests | Application packaging and service isolation |

Neither abstraction is universally superior. The correct choice depends on isolation, compatibility, performance, operational, and security requirements.

## Resource control

Cloud systems multiplex resources among many workloads. CPU shares, memory limits, I/O limits, network bandwidth, and GPU allocation are all resource-management problems.

Linux cgroups provide one important foundation. Containers add packaging and process-isolation conventions. Orchestration systems add scheduling, service discovery, health management, and deployment semantics.

## Cloud computing

A cloud service is more than a VM in someone else's data center. Cloud platforms add APIs for provisioning, identity, networking, storage, autoscaling, observability, and billing/resource accounting.

For a real-time media workload, ask:

- Where does the CPU execute?
- Where does the GPU execute?
- Where does the media memory reside?
- Which network path carries the media?
- What is the clock source?
- What happens during resource contention?
- How is the workload restarted?
- Which state survives restart?

## Edge, hybrid, and cloud placement

Real systems often combine:

```text
venue / edge
    │
    ├── low-latency capture
    ├── local processing
    │
    ▼
regional / data-center resources
    │
    ├── shared services
    └── media processing
    │
    ▼
cloud
    ├── elastic compute
    ├── storage
    └── global operations
```

The systems challenge is choosing where each function should execute. Placement affects latency, bandwidth, availability, cost, and failure domains.

## Exercise

Design a service that can run in a VM, a container, or directly on a host. For each deployment, identify:

1. CPU isolation;
2. memory isolation;
3. network isolation;
4. storage isolation;
5. GPU access;
6. clock source;
7. failure domain; and
8. observability mechanism.
