# Appendix G: Networking for Computer Systems

## Why networking belongs here

Processes communicate through IPC, but distributed systems require communication across machines. Networking therefore extends the process, socket, scheduling, memory, and I/O models developed in the core book.

Ubuntu's current server documentation treats TCP/IP, IP routing, TCP, UDP, ICMP, DHCP, DNS, time synchronization, and firewalling as fundamental networking topics. [Ubuntu networking documentation](https://ubuntu.com/server/docs/explanation/networking/).

## Layered model

Use the following as a practical teaching model rather than a claim that every implementation has exactly seven physical layers:

```text
Application
Transport       TCP / UDP
Network         IPv4 / IPv6
Link            Ethernet / VLAN
Physical        copper / fiber / radio
```

The Linux networking stack adds substantial implementation detail between an application socket and a physical interface.

## Addresses and routes

An IP address identifies a network-layer endpoint. A route determines where traffic should be sent next. A default route handles destinations for which no more specific route exists.

On Ubuntu:

```bash
ip addr
ip route
ip neigh
```

Do not confuse:

- an IP address with a MAC address;
- a route with a DNS record;
- a TCP port with an IP address;
- a VLAN with an IP subnet.

These solve different problems.

## TCP and UDP

TCP provides a reliable byte stream with sequencing, retransmission, flow control, and congestion-control behavior. UDP provides datagrams with substantially less transport-layer machinery.

A TCP application must therefore define its own message boundaries. A UDP receiver receives datagrams, but delivery is not equivalent to reliable end-to-end transport.

## RTP

RTP is designed for real-time applications such as audio and video. RFC 3550 defines RTP and RTCP and explicitly does not guarantee quality of service. [RFC 3550](https://www.rfc-editor.org/rfc/rfc3550).

RTP adds media-oriented sequence and timing information to the transport path. That does not eliminate the need for application-level buffering, clock synchronization, or network engineering.

## PTP

IEEE 1588 Precision Time Protocol transfers time through a packet network. The active IEEE 1588-2019 standard supports precise clock synchronization and profiles for different applications. [IEEE 1588-2019](https://standards.ieee.org/ieee/1588/6825/).

For real-time media, distinguish:

- wall-clock synchronization;
- media timestamps;
- packet arrival time;
- playout time;
- network delay and jitter.

A synchronized clock does not make packet delay deterministic.

## Linux networking tools

A practical diagnostic sequence is:

```bash
ip link
ip addr
ip route
resolvectl status
ss -lntup
ping <address>
tracepath <address>
sudo tcpdump -ni <interface>
```

For performance work, add interface counters, CPU utilization, queue statistics, and packet-capture analysis.

## High-speed networking

Modern Linux networking can use multiple queues, RSS/RPS/RFS, checksum offload, segmentation offload, XDP, AF_XDP, and hardware steering. The kernel documentation exposes these mechanisms and their trade-offs. [Linux networking documentation](https://www.kernel.org/doc/html/latest/networking/).

The systems lesson is that the application-visible socket abstraction hides a large amount of work. At high packet rates, cache locality, queue placement, interrupts, CPU affinity, NUMA locality, and memory allocation can dominate performance.

## Broadcast networking

A professional-media network adds deterministic timing, multicast, QoS, redundancy, and operational control. A media engineer therefore needs both network engineering and computer-systems intuition.

## Exercise: route failure

Given:

```text
host:       10.20.30.40/24
interface:  enp5s0
route:      default via 10.20.30.1
```

Ask students to determine:

1. whether `10.20.30.55` is local;
2. which route handles `10.20.40.55`;
3. what must work before DNS can be blamed;
4. what evidence `ip route get 10.20.40.55` provides.
