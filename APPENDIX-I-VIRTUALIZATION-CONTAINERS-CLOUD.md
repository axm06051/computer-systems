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

## VM exits and virtual CPU scheduling

A guest does not receive unrestricted ownership of the physical processor. Depending on the architecture and configuration, a guest operation can cause a VM exit that transfers control to the hypervisor or host virtualization layer.

A useful conceptual sequence is:

```text
running guest
    ↓
privileged or intercepted event
    ↓
VM exit
    ↓
hypervisor examines state
    ↓
emulate / handle / schedule
    ↓
restore guest state
    ↓
VM entry
    ↓
running guest
```

The exact exit conditions and state-transfer mechanisms are architecture-specific. Treat this sequence as a systems model, not as a literal description of every processor implementation.

A virtual CPU is also a schedulable workload. Host CPU contention can therefore increase guest execution latency even when the guest itself has no runnable-work bottleneck.

## Virtual memory inside a VM

Virtualization can introduce more than one address-translation layer:

```text
process virtual address
        ↓
guest page tables
        ↓
guest physical address
        ↓
hardware-assisted second-level translation
        ↓
host physical memory
```

The exact implementation depends on processor architecture and hypervisor configuration. The important systems consequence is that guest memory access can depend on both guest and host memory-management state.

## Virtual devices and I/O

A guest normally interacts with virtual devices rather than directly programming arbitrary physical hardware. The virtualization stack can therefore add another path to I/O:

```text
guest application
    ↓
guest syscall
    ↓
guest driver
    ↓
virtual device
    ↓
hypervisor / host kernel
    ↓
physical device or host service
```

Device assignment and paravirtualized interfaces can change the path substantially. Performance analysis should identify the actual mechanism rather than assume that every VM performs I/O through the same emulation path.

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

## Container networking

Container networking adds an additional namespace and forwarding layer to the ordinary host network stack. A typical Linux configuration can be modeled as:

```text
container socket
      ↓
container network namespace
      ↓
virtual interface
      ↓
host bridge / virtual network
      ↓
host routing / firewall
      ↓
physical NIC
      ↓
network
```

The exact path depends on the container runtime and network configuration. Diagnose the namespace, virtual link, host forwarding, routing, and physical interface separately.

## Container storage

Container filesystems often combine an image or lower layer with writable state. The application-visible pathname therefore does not necessarily correspond to one physical storage object.

A useful diagnostic model is:

```text
application pathname
      ↓
container mount namespace
      ↓
overlay / bind / volume mapping
      ↓
host filesystem
      ↓
storage stack
      ↓
block device / network storage
```

Persistence must be specified explicitly. A container's writable layer should not be treated as durable application state merely because files remain visible while the container is running.

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

## Cloud computing as a systems stack

A cloud platform can be understood as a set of mechanisms layered above physical infrastructure:

```text
physical machines
      ↓
virtualization / bare-metal allocation
      ↓
virtual networks and storage
      ↓
VMs / containers
      ↓
workload scheduling
      ↓
service discovery / load balancing
      ↓
application services
      ↓
control plane APIs
```

The control plane manages desired state. The data plane performs the workload's actual computation and traffic. A failure in one plane does not necessarily imply a failure in the other.

## Regions, zones, and failure domains

A cloud deployment should identify the failure domains it depends on. A region can contain multiple zones or comparable isolation domains. The exact terminology and guarantees depend on the provider.

Do not treat geographic separation as a guarantee of independence. A design should identify shared dependencies such as identity services, control planes, network paths, storage systems, and external providers.

A useful design question is:

> Which smallest infrastructure failure can take down all replicas?

The answer identifies an architectural failure domain that deserves explicit treatment.

## Capacity and autoscaling

Autoscaling changes resource allocation in response to observed or declared conditions. Scaling is therefore a feedback-control problem:

```text
workload
   ↓
measurement
   ↓
metric / signal
   ↓
control policy
   ↓
capacity change
   ↓
new service behavior
   └──────────────→ measurement
```

A scaling policy can react to CPU utilization, queue depth, request rate, latency, or another signal. The measured signal must correlate with the actual bottleneck. Scaling a CPU-bound service based only on memory usage does not necessarily address the limiting resource.

Autoscaling also has time constants. Provisioning, image retrieval, scheduling, connection establishment, and cache warming can take longer than the workload spike. A stable design therefore considers both steady-state capacity and transient response.

## Load balancing and service discovery

A load balancer separates client location from service-instance location. Service discovery supplies the mapping between a logical service identity and current endpoints.

```text
client
  ↓
service identity
  ↓
service discovery
  ↓
load-balancing decision
  ↓
service instance
```

Health checks determine whether an endpoint should receive work. Health checks themselves are observations and can disagree with application-level health. A process can accept TCP connections while returning unusable application responses.

## Cloud storage classes

Cloud storage commonly exposes object, block, and file interfaces. The interfaces imply different mechanisms and semantics.

| Interface | Primary abstraction | Typical systems concern |
| --- | --- | --- |
| Object | Named object in a service namespace | latency, consistency, request semantics, durability |
| Block | Addressable block device | filesystem, I/O latency, queueing, durability |
| File | Shared pathname hierarchy | metadata, locking, concurrency, network latency |

These are abstractions rather than guarantees of one physical implementation. The service contract should be treated as the architectural boundary.

## Observability

Observability connects system behavior to measurements. Three common signals are:

- **logs** — event records containing contextual information;
- **metrics** — numerical measurements aggregated over time;
- **traces** — correlated spans representing a request or operation across components.

A useful request trace might be:

```text
client request
    ↓
load balancer
    ↓
service process
    ↓
system call
    ↓
storage request
    ↓
storage completion
    ↓
service response
    ↓
client
```

The trace should be correlated with host CPU, memory, network, and storage measurements when diagnosing performance. A distributed trace identifies where time was spent; it does not by itself explain why.

## Identity and security boundaries

Cloud security builds on lower-level isolation mechanisms. Important boundaries include:

```text
human / workload identity
        ↓
authorization policy
        ↓
service API
        ↓
process identity
        ↓
kernel privileges
        ↓
resource access
```

Least privilege means granting the minimum authority required by the workload. Secrets should be treated as controlled data with explicit lifecycle, access, rotation, and audit mechanisms rather than as ordinary configuration strings.

## Kubernetes as a consequence of earlier mechanisms

Kubernetes should be understood after containers, networking, storage, scheduling, and distributed systems have been established. Its major abstractions coordinate mechanisms already introduced elsewhere:

| Kubernetes concept | Underlying systems concern |
| --- | --- |
| Pod | process/container grouping and lifecycle |
| Node | compute resource and kernel boundary |
| Service | service discovery and traffic routing |
| Deployment | desired state and rollout |
| Scheduler | resource placement |
| Persistent volume | storage abstraction |
| Controller | feedback loop from observed to desired state |

The orchestration layer does not remove the underlying mechanisms. It automates their coordination.

## Cloud failure analysis

A cloud failure should be decomposed by layer before corrective action:

```text
symptom
  ↓
client / DNS
  ↓
load balancing
  ↓
network
  ↓
service instance
  ↓
process / thread
  ↓
system call
  ↓
storage / dependency
  ↓
physical or virtual resource
```

For each layer, collect an observation that can falsify the corresponding hypothesis. Do not use a successful health check as proof that every layer below it is healthy.

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

Then design the same service as a multi-zone cloud deployment. Identify the control plane, data plane, service-discovery mechanism, storage interfaces, scaling signal, and smallest failure domain that can remove all service capacity.
