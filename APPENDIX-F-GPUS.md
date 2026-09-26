# Appendix F: GPUs and Heterogeneous Computing

## Why GPUs belong in a computer-systems course

A modern computer is often heterogeneous. A CPU and one or more accelerators can share a system while having different execution models, memory paths, and performance characteristics. NVIDIA's current CUDA Programming Guide describes a heterogeneous model with a CPU host and GPU device, and represents the GPU as a collection of Streaming Multiprocessors (SMs). [CUDA Programming Guide](https://docs.nvidia.com/cuda/cuda-programming-guide/).

The GPU therefore extends the book's CPU concepts rather than replacing them. The important question is not "Is a GPU just a faster CPU?" It is "What execution and memory model makes a GPU effective for a different class of workloads?"

## CPU versus GPU

A simplified comparison is:

| Property | CPU | GPU |
| --- | --- | --- |
| Primary strength | General-purpose, latency-sensitive work | Large-scale data-parallel throughput |
| Control flow | Sophisticated, irregular control flow | Efficient when many threads follow similar work |
| Parallelism | A few to many powerful CPU threads | Very large number of lightweight GPU threads |
| Memory hierarchy | Caches optimized for general workloads | Multiple memories optimized for throughput and locality |
| Launch model | Process/thread scheduling | Kernel launch and GPU scheduling |
| Programming model | Processes, threads, syscalls | Kernels, grids, blocks, GPU threads |

This table is a teaching abstraction. Actual GPU architectures contain sophisticated scheduling, caches, interconnects, and specialized units.

## CUDA's execution model

CUDA programs normally begin on the CPU. Host code allocates or accesses memory, launches a kernel, and synchronizes with device work. The GPU executes the kernel using many logical threads organized into a grid and blocks. NVIDIA describes this model in its current documentation. [CUDA programming model](https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/programming-model.html).

A conceptual sequence is:

```text
CPU process
    │
    ├── prepare input
    ├── allocate/copy data
    ├── launch kernel
    │       │
    │       ▼
    │    GPU grid
    │       │
    │       ├── block 0
    │       ├── block 1
    │       └── ...
    │
    └── synchronize / consume result
```

## SIMT and warps

NVIDIA GPUs execute groups of threads using a SIMT model. A kernel can be written as if many threads execute independently, while the hardware groups work for efficient execution. Divergent control flow can reduce efficiency because different threads may need different paths.

Students should distinguish:

- **thread-level parallelism** — many logical GPU threads are available;
- **instruction-level execution** — the hardware executes instructions through its internal pipelines;
- **memory-level parallelism** — multiple memory operations can be outstanding;
- **occupancy** — the number of active warps relative to available resources.

These are related but not interchangeable terms.

## GPU memory hierarchy

The conceptual hierarchy includes:

```text
host memory
    │
    │ transfer / mapped access
    ▼
device global memory
    │
    ├── L2 cache
    │
    └── SM-local resources
          ├── registers
          ├── shared memory
          └── caches
```

The exact hierarchy depends on GPU architecture and CUDA feature set. NVIDIA's documentation should be used for architecture-specific behavior.

## PTX: the GPU analogue of an ISA layer

PTX is a virtual instruction set architecture rather than the physical instruction encoding of one specific GPU. NVIDIA documents PTX as an abstraction layer over real GPU hardware ISAs. [PTX ISA](https://docs.nvidia.com/cuda/parallel-thread-execution/).

This provides an important systems lesson: an application can be compiled through multiple intermediate layers before the hardware executes the final machine instructions.

## GPU synchronization

GPU programs have their own synchronization mechanisms. A barrier inside a kernel is not equivalent to a Linux process barrier, and host/device synchronization is not equivalent to CPU thread synchronization.

When teaching a race condition on a GPU, ask:

1. Which threads access the same location?
2. Which memory space contains that location?
3. What ordering or atomicity guarantees exist?
4. At what scope is synchronization valid?
5. Has the host synchronized with the device before consuming results?

## NVIDIA in production systems

NVIDIA GPUs are used for rendering, video processing, AI inference, transcoding, signal processing, and other workloads. NVIDIA's current CUDA documentation includes libraries, profiling tools, GPU virtual memory, multi-GPU programming, and hardware-specific tuning guides. [CUDA Toolkit documentation](https://docs.nvidia.com/cuda/).

For live media, GPU placement should be treated as a systems problem. A GPU may reduce compute time while increasing memory-transfer, PCIe, scheduling, or synchronization overhead. A production design must measure the complete path.

## Exercise

Take a CPU image-processing loop and divide it into:

1. work that must remain on the CPU;
2. data that must cross the CPU/GPU boundary;
3. work suitable for a GPU kernel;
4. synchronization points; and
5. output operations.

Then estimate whether the GPU can plausibly improve end-to-end latency or throughput. Do not use raw GPU FLOPS as the sole argument.
