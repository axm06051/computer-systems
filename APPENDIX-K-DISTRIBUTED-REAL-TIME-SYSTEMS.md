# Appendix K: Distributed and Real-Time Systems

## Distributed systems

A distributed system is a collection of independently executing components that communicate over a network. The components do not share one CPU clock, one memory space, or one failure boundary.

This creates problems that do not occur inside one process:

- network delay;
- partial failure;
- clock differences;
- message duplication or loss;
- retries;
- inconsistent observations;
- independent restarts;
- version skew.

## Real-time systems

A real-time system is concerned with deadlines, not simply high throughput. A system can process a million packets per second and still fail a real-time requirement if a required packet misses its deadline.

Distinguish:

- **hard deadline** — missing the deadline constitutes failure;
- **soft deadline** — late work reduces quality or utility;
- **latency** — time for one operation;
- **jitter** — variation in timing;
- **throughput** — work completed per unit time.

## Distributed time

No two independent oscillators remain perfectly synchronized. Networked time protocols provide a mechanism for estimating and correcting clock offsets. IEEE 1588 PTP is especially relevant to systems that require precise network-wide timing. [IEEE 1588 Working Group](https://sagroups.ieee.org/1588/).

## Failure domains

For each component, ask:

```text
What happens if this component stops?
What happens if it becomes slow?
What happens if it becomes unreachable?
What state is lost?
What state is replicated?
Who notices the failure?
Who decides to recover?
```

A redundant system without a failure-detection and recovery mechanism is not necessarily resilient.

## Broadcast example

A live-production workflow can have independent failures in:

```text
source → network → receiver → processing → output
          │           │          │
        switch      clock      GPU
```

The system should localize failures rather than simply report "video is missing."

## Exercise: deadline budget

Suppose a live-media processing path has a 20 ms end-to-end budget. Allocate it among:

- capture;
- packetization;
- network;
- buffering;
- decode;
- GPU processing;
- output.

Then introduce a 5 ms network-jitter excursion. Decide which component should absorb it and what trade-off that creates.
