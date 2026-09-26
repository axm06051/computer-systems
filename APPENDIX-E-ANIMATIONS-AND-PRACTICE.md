# Appendix E: Animations, Simulations, and Practice Exercises

The web edition should make the following models interactive. A static diagram is useful for reference; a step-through animation is useful for developing intuition.

## Animation 1: One instruction cycle

Animate four states:

```text
FETCH → DECODE → EXECUTE → COMMIT/NEXT
  ↑                         │
  └─────────────────────────┘
```

At each frame display:

- program counter;
- instruction bytes;
- decoded operation;
- source and destination registers;
- memory accesses;
- resulting flags.

Allow the student to step forward and backward. Include an invalid-opcode state that stops execution rather than silently continuing.

## Animation 2: A cache line

Show a CPU requesting one byte while the memory hierarchy transfers an entire cache line. Then repeat the access nearby and show a cache hit. Finally jump to a distant address and show another miss.

Practice questions:

1. Why can a larger transfer make one byte access faster?
2. Why can a larger cache line also hurt performance?
3. How does spatial locality differ from temporal locality?

## Animation 3: Virtual-address translation

Animate:

```text
virtual address
      │
      ▼
    TLB hit? ── yes ──→ physical address
      │ no
      ▼
 page-table walk
      │
      ├── valid + permitted ──→ TLB fill → physical address
      │
      └── fault ──→ kernel fault handler
```

Let the student change page permissions and observe why the same virtual address can be readable but not executable.

## Animation 4: Context switch

Display two threads with separate register sets and stacks. Move execution from A to B and explicitly show that the process address space may remain unchanged when both threads belong to the same process.

## Animation 5: Race-condition interleaving

Use two lanes:

```text
Thread A                 Thread B
--------                 --------
load counter
                         load counter
add 1
                         add 1
store counter
                         store counter
```

Let the student reorder events and predict the final value. Then replace the increment with an atomic read-modify-write operation and show why the problematic interleaving is no longer equivalent.

## Animation 6: CPU versus GPU

Show one CPU thread progressing through a loop and one GPU kernel launching a grid of many logical threads. Then introduce memory transfer and synchronization costs so that students see why GPU acceleration is workload-dependent.

## Animation 7: Network packet journey

Animate an application message through:

```text
application
→ socket
→ TCP/UDP
→ IP
→ Ethernet
→ switch
→ Ethernet
→ IP
→ TCP/UDP
→ socket
→ application
```

For an ST 2110-style example, replace the application payload with RTP media and show PTP timing as a separate control plane.

## Practice set: foundational

1. Convert several hexadecimal addresses to binary.
2. Draw a full-adder truth table.
3. Construct an 8-bit addition and identify carry-out and signed overflow.
4. Trace a load instruction through a conceptual CPU datapath.
5. Explain why a byte-addressed machine can still manipulate individual bits.

## Practice set: operating systems

1. Explain the difference between an exception and an interrupt.
2. Trace `fork()` followed by `execve()` and identify which process image changes.
3. Explain why a page fault can be recoverable.
4. Distinguish a scheduler decision from a context switch.
5. Explain why two threads can share an address space but have separate stacks.

## Practice set: concurrency

1. Construct an interleaving that loses an update.
2. Explain the difference between atomicity and mutual exclusion.
3. Identify a potential deadlock from a lock-order graph.
4. Explain why increasing the number of threads can reduce throughput.
5. Compare a process boundary with a thread boundary.

## Practice set: networking

1. Given two IP addresses and routes, determine the selected next hop.
2. Explain the difference between a TCP stream and a UDP datagram.
3. Identify whether a problem is likely at Layer 1, Layer 2, Layer 3, transport, or application level.
4. Explain why MTU mismatches can cause apparently intermittent failures.
5. Explain why multicast requires deliberate network configuration.

## Practice set: broadcast systems

1. Explain why video and audio are separate flows in ST 2110.
2. Explain the role of PTP in maintaining common media time.
3. Explain what discovery solves that RTP transport does not.
4. Diagnose a hypothetical receiver that discovers a sender but cannot connect to it.
5. Diagnose a system in which all flows arrive but audio/video synchronization drifts.

## Capstone exercise

Given a fictional live-production system with CPU nodes, NVIDIA GPU nodes, IP media flows, a PTP grandmaster, VMs, containers, and cloud services, produce:

1. an architecture diagram;
2. a resource map;
3. a timing model;
4. a network flow table;
5. a failure matrix;
6. a troubleshooting sequence; and
7. a short explanation connecting every major design choice to a mechanism from the book.
