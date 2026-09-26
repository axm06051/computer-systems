# Appendix J: Storage, I/O, DMA, and PCIe

## Why storage and I/O matter

The core book explains memory, processes, system calls, and file-system objects, but a modern system also needs a path from software buffers to devices. Storage and network devices commonly use DMA and high-speed interconnects such as PCIe.

## CPU-driven I/O versus DMA

A simple CPU-driven model is:

```text
CPU → device register → device → CPU → memory
```

DMA changes the path:

```text
CPU programs device
       ↓
     device
       ↓ DMA
memory buffer
       ↓
CPU processes result
```

DMA does not mean that the CPU disappears. The CPU configures descriptors, handles completion, manages ownership, and responds to errors.

## PCIe

PCIe provides a high-speed serial interconnect for devices such as GPUs, NVMe storage, and network adapters. A useful systems model is:

```text
CPU / memory
    │
 PCIe root complex
    │
    ├── GPU
    ├── NIC
    └── NVMe controller
```

The exact topology matters. Devices may share links, switches, memory paths, or NUMA nodes.

## NVMe

NVMe is a family of standards for nonvolatile storage. Linux maintains a dedicated NVMe subsystem. Current Linux documentation covers NVMe host-driver policy and multiple transport families. [Linux NVMe documentation](https://docs.kernel.org/nvme/).

A simplified I/O path is:

```text
application
   ↓ read()/write()
system call
   ↓
VFS / filesystem
   ↓
block layer
   ↓
NVMe driver
   ↓
PCIe
   ↓
SSD controller
   ↓
flash media
```

Every layer can add latency or queueing.

## Queueing

Modern devices expose multiple queues so that multiple CPUs can submit work concurrently. Queue depth, CPU affinity, NUMA locality, interrupt placement, and storage media behavior all affect performance.

## Media-system relevance

A broadcast application may read configuration, clips, graphics, or recorded media while simultaneously receiving live streams. Storage throughput and latency can therefore interact with real-time media deadlines.

A storage system with excellent average throughput can still fail a real-time workflow if tail latency or queueing produces missed deadlines.

## Exercise

Given a media application that occasionally drops frames while reading a large file, measure:

```bash
iostat -xz 1
pidstat -d 1
cat /proc/interrupts
lsblk -o NAME,MODEL,TYPE,SIZE
```

Then determine whether the problem is more consistent with CPU saturation, storage latency, queueing, network delay, or application scheduling.
