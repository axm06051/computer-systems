# Appendix D: Worked Examples and Low-Level Tracing

These examples are designed to be executed, traced, or simulated. They connect the conceptual models in the core chapters to observable Linux behavior.

## Example 1: Follow a process from source to system call

Create a minimal C program:

```c
#include <unistd.h>

int main(void) {
    const char message[] = "hello\n";
    write(1, message, sizeof(message) - 1);
    return 0;
}
```

Build and inspect it:

```bash
gcc -O0 -g hello.c -o hello
file hello
readelf -h hello
readelf -S hello
objdump -d -Mintel hello | less
strace ./hello
```

Questions:

1. Which parts of the file describe executable code?
2. Which instruction establishes the call to the operating system?
3. Which registers carry the Linux x86-64 system-call number and arguments?
4. What changes when `-O2` replaces `-O0`?

The important observation is that compilation, linking, loading, execution, and system calls are separate stages.

## Example 2: Observe a process address space

Run:

```bash
sleep 1000 &
pid=$!
cat /proc/$pid/maps
pmap $pid
cat /proc/$pid/status
kill $pid
```

Identify:

- executable mappings;
- shared libraries;
- writable anonymous memory;
- the stack;
- permissions such as `r-xp` and `rw-p`.

The exercise demonstrates why a process is more than a contiguous block of memory.

## Example 3: Observe a context switch without pretending to see the kernel's private state

Run two CPU-bound processes:

```bash
yes >/dev/null & a=$!
yes >/dev/null & b=$!
ps -o pid,psr,stat,comm -p $a,$b
pidstat -p $a,$b 1
kill $a $b
```

Then repeat with one process. Compare CPU assignment and utilization.

Do not infer that every scheduler decision is visible as a context switch in one command's output. User-space tools expose measurements and summaries, not every kernel transition.

## Example 4: Demonstrate a race

A deliberately unsafe counter:

```c
#include <pthread.h>
#include <stdio.h>

static long counter;

static void *worker(void *unused) {
    (void)unused;
    for (long i = 0; i < 1000000; ++i)
        ++counter;
    return NULL;
}

int main(void) {
    pthread_t a, b;
    if (pthread_create(&a, NULL, worker, NULL) != 0) return 1;
    if (pthread_create(&b, NULL, worker, NULL) != 0) return 1;
    if (pthread_join(a, NULL) != 0) return 1;
    if (pthread_join(b, NULL) != 0) return 1;
    printf("%ld\n", counter);
}
```

Compile with:

```bash
gcc -O2 -pthread race.c -o race
```

The lesson is not that one particular output must occur. The lesson is that the increment is a read-modify-write sequence and the C memory model requires synchronization for the shared object.

Repair the program first with a mutex, then with a C atomic counter. Compare the source and generated assembly.

## Example 5: Follow a packet through a Linux host

Use a loopback UDP socket or a local application, then inspect:

```bash
ip addr
ip route
ss -uap
sudo tcpdump -ni lo udp
```

Trace the path conceptually:

```text
application
    ↓
socket API
    ↓
transport protocol
    ↓
IP routing decision
    ↓
network device / loopback
    ↓
packet capture
```

Repeat with a real Ethernet interface. Ask which layers changed and which did not.

## Example 6: Measure a memory hierarchy effect

Write a benchmark that walks a large array sequentially and then with a deliberately poor stride. Measure several runs rather than one. Explain the result in terms of locality, cache lines, prefetching, TLB behavior, and memory bandwidth.

Do not conclude that a single benchmark proves a universal cache hierarchy. It measures one implementation under one workload.

## Example 7: Compare CPU and GPU execution

On an NVIDIA system, compile a minimal CUDA kernel or use an existing CUDA sample. Observe the distinction between:

```text
CPU process
   │
   ├── host memory
   │
   └── CUDA runtime/driver
          │
          ├── device allocation
          ├── kernel launch
          └── device synchronization
                 │
                 ▼
             GPU kernel
```

NVIDIA's CUDA documentation describes the CPU as the host and the GPU as the device, with kernels launched for execution by many GPU threads. The current guide also describes PTX as a virtual ISA between high-level code and GPU machine code.

## Example 8: Inspect virtualization layers

On an Ubuntu host with hardware virtualization enabled:

```bash
lscpu | grep -i virtualization
kvm-ok
virsh list --all
```

If a VM is available, compare:

```bash
uname -a
lscpu
free -h
ip addr
```

inside and outside the guest.

Explain which resources are virtualized and which are passed through or shared.

## Example 9: Trace an ST 2110-style media flow conceptually

Start with separate flows:

```text
video essence ── RTP ──┐
audio essence ── RTP ──┼── managed IP fabric ── receiver
ANC essence   ── RTP ──┘
                         ↑
                       PTP
                         ↑
                    Grandmaster
```

Then add NMOS:

```text
NMOS registry/discovery
          │
          ▼
   sender/receiver identities
          │
          ▼
 connection management
          │
          ▼
     media flows
```

The exercise is to identify which problem each technology solves: transport, timing, discovery, or connection control.
