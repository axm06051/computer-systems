# Appendix L: Troubleshooting and Diagnostic Playbooks

## The general method

Good troubleshooting is controlled experimentation. Start with the simplest observable facts, form a hypothesis, change one relevant variable, and measure again.

Use this loop:

```text
observe → localize → hypothesize → test → measure → document
```

Avoid changing configuration repeatedly without recording what changed.

## CPU saturation

Symptoms:

- high CPU utilization;
- increased queueing latency;
- missed real-time deadlines;
- scheduler contention.

First checks:

```bash
uptime
nproc
lscpu
ps -eo pid,psr,stat,pcpu,pmem,comm --sort=-pcpu | head
pidstat -u 1
```

Questions:

1. Is one CPU saturated or the whole machine?
2. Is the workload CPU-bound or waiting on I/O?
3. Is one thread the bottleneck?
4. Is CPU affinity creating imbalance?
5. Is throttling occurring?

## Memory pressure

Checks:

```bash
free -h
vmstat 1
cat /proc/meminfo
ps -eo pid,rss,vsz,comm --sort=-rss | head
```

Distinguish:

- resident memory;
- virtual address space;
- page cache;
- anonymous memory;
- swap activity;
- memory-mapped files.

A large virtual address space is not necessarily a large physical-memory footprint.

## Process problem

Checks:

```bash
ps -ef
pstree -ap
cat /proc/<pid>/status
cat /proc/<pid>/maps
ls -l /proc/<pid>/fd
```

Ask:

- Is the process alive?
- Is it blocked?
- What does it wait for?
- What files/sockets does it hold?
- What environment did it inherit?
- What executable and libraries are mapped?

## System-call problem

Use:

```bash
strace -f -tt -T -o trace.log <command>
```

Look for:

- `ENOENT` — object not found;
- `EACCES` — permission problem;
- `EPERM` — operation not permitted;
- `ECONNREFUSED` — connection refused;
- `ETIMEDOUT` — timeout;
- `EPIPE` — broken pipe.

Do not treat an error number as the root cause. It is evidence about where the failure was detected.

## Network problem

Use a staged test:

```bash
ip link
ip addr
ip route
ip neigh
resolvectl status
ss -s
ping <peer>
tracepath <peer>
sudo tcpdump -ni <interface>
```

If the interface is down, do not debug DNS. If packets never leave the host, do not debug the remote application first.

## Packet-loss problem

Separate:

1. application loss;
2. socket-buffer overflow;
3. kernel queue loss;
4. NIC/ring loss;
5. switch loss;
6. physical-layer errors;
7. receiver processing delay.

Check interface counters and packet captures before changing application buffer sizes.

## PTP problem

For a timing-dependent system:

1. Identify the PTP domain.
2. Identify the grandmaster.
3. Confirm endpoint lock/synchronization.
4. Check offset and path-delay behavior.
5. Check whether hardware timestamping is active where required.
6. Verify that applications use the intended clock.
7. Only then investigate media timestamps and buffering.

A packet arriving successfully does not prove that its timestamp is useful.

## ST 2110/NMOS problem

Use separate checklists.

### Discovery

- Is the node registered?
- Is the registry reachable?
- Are the expected resources present?

### Connection

- Is the sender active?
- Is the receiver active?
- Does the connection API report the expected state?

### Network

- Is the destination reachable?
- Is multicast configured?
- Are VLANs and routes correct?
- Are ACLs/firewalls allowing the flow?

### Media

- Are RTP packets arriving?
- Are sequence numbers increasing as expected?
- Are timestamps sensible?
- Is the receiver decoding the payload?

### Timing

- Are all relevant devices synchronized?
- Is the correct PTP domain in use?
- Is receiver buffering hiding or amplifying jitter?

## GPU problem

On NVIDIA systems, begin with:

```bash
nvidia-smi
```

Then ask:

- Is the process using the intended GPU?
- Is the GPU memory full?
- Is the workload compute-bound or transfer-bound?
- Are kernels launching as expected?
- Is synchronization forcing the CPU to wait?
- Is PCIe or host-memory transfer the bottleneck?

Use NVIDIA's profiling tools for detailed work rather than inferring utilization from one metric. [CUDA Toolkit documentation](https://docs.nvidia.com/cuda/).

## VM/container problem

For VMs:

```bash
virsh list --all
virsh dominfo <name>
virsh domiflist <name>
```

For containers:

```bash
docker ps

docker inspect <container>
cat /proc/<pid>/cgroup
lsns -p <pid>
```

Ask whether the failure is:

- inside the guest/container;
- at the virtual device;
- at the host;
- at the network bridge;
- at the physical device;
- at the cloud control plane.

## Troubleshooting rule: preserve the boundary

When a system fails, identify the first boundary that can be proven to be broken.

For example:

```text
application
   ↓ working?
socket
   ↓ working?
IP stack
   ↓ working?
NIC
   ↓ working?
switch
   ↓ working?
remote NIC
   ↓ working?
remote application
```

Do not skip directly from "the application failed" to "the network is broken." The system is a chain of observable interfaces.
