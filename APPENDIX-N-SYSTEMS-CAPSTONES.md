# Appendix N: End-to-End Systems Capstones

## Purpose

The core manuals teach mechanisms in dependency order. The capstones reverse the direction: a learner starts with a visible systems problem and follows the causal chain downward until the mechanism that explains the behavior becomes explicit.

Each capstone is deliberately cross-layer. The exercises do not replace the canonical explanations in the core manuals and appendices. They provide a controlled way to reuse them.

## Capstone 1: From Instruction to Process

Trace one small program from an instruction through the CPU, executable image, process address space, system call, and kernel boundary.

### Capstone 1 dependency path

```text
instruction encoding
      ↓
fetch / decode / execute
      ↓
registers and memory
      ↓
stack / heap / address space
      ↓
executable
      ↓
process
      ↓
system call
      ↓
kernel
```

### Capstone 1 tasks

1. Identify one instruction and its architectural operands.
2. Identify the registers and memory locations involved.
3. Explain how the instruction reaches the CPU.
4. Identify the process address-space regions used by the program.
5. Trace one system call from the application to the kernel boundary.
6. State which transitions are architectural requirements and which are implementation choices.

### Capstone 1 verification

A learner should be able to explain every transition without introducing an unexplained abstraction.

## Capstone 2: From Application Buffer to Storage Device

Trace an application write from user memory to a storage device and back to a subsequent read.

### Capstone 2 dependency path

```text
application
    ↓
system call
    ↓
virtual address
    ↓
page translation / protection
    ↓
kernel I/O path
    ↓
DMA buffer
    ↓
PCIe
    ↓
storage controller
    ↓
NVMe device
```

### Capstone 2 questions

- Which component owns the buffer at each stage?
- Which address is virtual and which address is physical or device-visible?
- Where does the CPU execute instructions?
- Where does DMA move data without CPU copying each byte?
- Which events notify the CPU that work has completed?
- Which queues can contribute latency?

### Capstone 2 measurements

Measure request latency, throughput, queue depth, and CPU utilization. Interpret each measurement in terms of the mechanism that can produce it.

## Capstone 3: From Socket to Packet and Back

Trace a message between two Linux processes on different hosts.

### Capstone 3 dependency path

```text
application
    ↓
socket API
    ↓
system call
    ↓
kernel socket state
    ↓
transport protocol
    ↓
IP routing
    ↓
Ethernet / NIC
    ↓
physical link
    ↓
peer NIC
    ↓
peer kernel
    ↓
peer socket
    ↓
application
```

### Capstone 3 investigation

Use packet capture and socket inspection to correlate:

- process state;
- socket state;
- source and destination addresses;
- Ethernet frames;
- IP packets;
- transport segments or datagrams;
- queueing;
- loss and retransmission;
- observed application latency.

Do not begin by changing configuration. First identify the layer that exhibits the symptom.

## Capstone 4: Real-Time Media Through an IP Network

Explain a real-time media stream as a systems path rather than as an isolated media protocol.

### Capstone 4 dependency path

```text
media producer
    ↓
application buffer
    ↓
CPU / GPU processing
    ↓
DMA / NIC
    ↓
Ethernet
    ↓
IP routing / switching
    ↓
RTP / UDP
    ↓
receiver NIC
    ↓
kernel / socket
    ↓
application buffer
    ↓
media clock / presentation
```

Add PTP where the system requires a shared timing reference. Distinguish packet transport time from media presentation time.

### Capstone 4 troubleshooting sequence

1. Verify configuration.
2. Verify link and interface state.
3. Verify routing and multicast behavior where applicable.
4. Measure packet loss and reordering.
5. Measure PTP state and offset.
6. Inspect RTP sequence numbers and timestamps.
7. Inspect application buffers and processing latency.
8. Verify the rendered or consumed result.

The same sequence applies to professional IP-media systems, with standards requirements separated from implementation-specific behavior.

## Capstone 5: CPU and GPU Work Division

Move a computational workload between CPU and GPU and determine whether the complete system improves.

### Capstone 5 dependency path

```text
application
    ↓
CPU scheduling
    ↓
host memory
    ↓
PCIe / accelerator interface
    ↓
GPU memory
    ↓
kernel execution
    ↓
GPU synchronization
    ↓
result transfer
    ↓
CPU consumer
```

### Capstone 5 measurements

Measure:

- CPU execution time;
- host-to-device transfer time;
- kernel execution time;
- device-to-host transfer time;
- synchronization time;
- total end-to-end latency;
- throughput;
- memory utilization.

A GPU speedup claim is incomplete unless the complete path is measured.

## Capstone 6: From Process Isolation to a Virtual Machine

Explain how a physical CPU can execute a guest operating system while preserving isolation from the host.

### Capstone 6 dependency path

```text
physical CPU privilege
      ↓
memory protection
      ↓
hypervisor
      ↓
virtual CPU
      ↓
VM exit / entry
      ↓
guest OS
      ↓
virtual memory
      ↓
virtual device
      ↓
host I/O
```

Compare the mechanism with containers:

```text
virtual machine
  guest kernel + isolated virtual hardware

container
  host kernel + isolated process namespaces / resource controls
```

The comparison must identify the actual isolation mechanism rather than treating containers as smaller virtual machines.

## Capstone 7: From Container to Cluster

Follow a containerized service from a process on one machine to a replicated service distributed across multiple machines.

### Capstone 7 dependency path

```text
process
  ↓
container isolation
  ↓
container network
  ↓
host network
  ↓
load balancing
  ↓
service discovery
  ↓
multiple hosts
  ↓
replication
  ↓
control plane
```

The learner should identify which behavior comes from the Linux kernel, which comes from the network, and which comes from orchestration software.

## Capstone 8: Cloud Service Failure

Diagnose a cloud service whose requests intermittently fail.

### Capstone 8 layer model

```text
client
  ↓
DNS / service discovery
  ↓
load balancer
  ↓
network
  ↓
service instance
  ↓
container / VM
  ↓
process
  ↓
system call
  ↓
storage / external service
```

### Capstone 8 required investigation

Collect logs, metrics, traces, network observations, process state, resource utilization, and storage latency. Establish the failing layer before changing the architecture.

The exercise should distinguish:

- capacity exhaustion;
- packet loss;
- timeout amplification;
- process failure;
- resource contention;
- storage latency;
- dependency failure;
- control-plane failure;
- configuration error.

## Capstone 9: Design Review

Choose a workload and design a complete system from hardware to cloud service.

The design must identify:

1. CPU and memory requirements.
2. Storage path and durability requirements.
3. Network topology and transport.
4. Process and concurrency model.
5. GPU or accelerator requirements, if any.
6. Virtualization boundary.
7. Container boundary, if applicable.
8. Distributed failure model.
9. Observability strategy.
10. Security boundaries.
11. Scaling mechanism.
12. Failure-domain strategy.
13. Verification and performance measurements.

The final design must include a data plane and a control plane. Each major design decision must identify the lower-level mechanism that constrains it.

## Capstone Completion Standard

A capstone is complete when the learner can move both upward and downward through the stack:

```text
cloud service
    ↕
distributed system
    ↕
container / VM
    ↕
process / thread
    ↕
system call
    ↕
virtual memory / I/O
    ↕
network / storage device
    ↕
CPU / GPU
    ↕
ISA
    ↕
register / datapath
    ↕
memory cell / logic
```

The objective is not memorization of the stack. The objective is causal reasoning across the stack.
