# Appendix H: Software-Driven Broadcast and IP Media Systems

## Why broadcast engineering belongs in a computer-systems book

Modern live production increasingly combines dedicated devices, software services, IP networks, GPUs, virtual machines, containers, and cloud infrastructure. The underlying problems are the same problems developed throughout this book: computation, memory, scheduling, synchronization, networking, process isolation, and resource management.

## ST 2110

SMPTE ST 2110 specifies the carriage, synchronization, and description of separate professional-media essence streams over managed IP networks. The suite separates video, audio, and ancillary-data flows and uses precise timing to keep the independent streams aligned. [SMPTE ST 2110](https://www.smpte.org/standards/st2110).

A simplified system is:

```text
             PTP domain
                 │
                 ▼
        ┌─────────────────┐
        │ Managed IP fabric│
        └─────────────────┘
          ▲       ▲      ▲
          │       │      │
       video    audio   ANC
        RTP      RTP    RTP
          │       │      │
          └──── receiver ┘
```

The three media flows are independent network traffic. Synchronization is a separate concern.

## NMOS

ST 2110 defines media transport, but a large production system also needs mechanisms to discover devices and establish connections. AMWA NMOS provides specifications for those control-plane functions. Current stable specifications include IS-04 for Discovery and Registration and IS-05 for Device Connection Management. [AMWA NMOS specifications](https://specs.amwa.tv/nmos/specs-by-type.html).

The architectural distinction is:

```text
Control plane:
  discovery → registration → connection management

Media plane:
  RTP essence flows → timing → processing → output
```

Keeping these planes conceptually separate makes troubleshooting much easier.

## PTP and media timing

A media system can receive every packet and still fail operationally if clocks disagree. PTP establishes a common timing reference; media systems then use timestamps and scheduling to maintain alignment.

Troubleshoot timing separately from transport:

1. Is the PTP domain visible?
2. Is the expected grandmaster selected?
3. Are endpoints synchronized?
4. Are timestamps sane?
5. Is the receiver buffering correctly?
6. Is the application scheduling against the intended clock?

## Redundancy

Professional media networks commonly use redundant paths and receivers. A systems engineer should distinguish:

- link redundancy;
- switch redundancy;
- path redundancy;
- source redundancy;
- application redundancy;
- state redundancy.

Two network paths do not automatically produce seamless application redundancy. The receiver must understand how to combine, select, or recover the streams.

## Cloud and software-defined production

Cloud production moves some or all processing into virtualized infrastructure. The design therefore inherits cloud latency, network variability, resource scheduling, storage, identity, and observability concerns.

Grass Valley currently describes AMPP OS as a platform for software-defined production with on-premises, cloud, and hybrid deployment models. Its public documentation describes orchestration, lifecycle management, operational visibility, security, and performance engineering as platform concerns. [Grass Valley AMPP](https://www.grassvalley.com/solutions/ampp-explained/).

Grass Valley's public material also describes AMPP Edge as an on-premises extension of AMPP OS, illustrating an edge/cloud architecture in which processing can be placed near the media source while remaining part of a larger operational system. [AMPP Edge](https://www.grassvalley.com/products/ampp/ampp-edge/).

## Media-processing data path

A useful conceptual pipeline is:

```text
capture / ingest
      ↓
packet reception
      ↓
DMA + memory buffers
      ↓
CPU scheduling
      ↓
GPU / CPU processing
      ↓
shared-memory or network handoff
      ↓
encoding / packetization
      ↓
network transport
      ↓
receiver buffer
      ↓
playout
```

Every arrow is a potential source of latency, buffering, copying, synchronization, or loss.

## AMPP as a systems case study

Use AMPP as a case study rather than as a generic definition of cloud computing. Public Grass Valley material describes AMPP as cloud-native and capable of public-cloud, private/on-premises, and hybrid deployment. Current product material also discusses distributed media infrastructure and edge processing. These are examples of the broader architectural patterns discussed in this book.

Do not infer implementation details that are not publicly documented. A systems textbook should distinguish documented product behavior from architectural inference.

## Exercise: diagnose a media-flow failure

Scenario: a receiver discovers a sender, but no video appears.

Investigate in this order:

1. NMOS discovery and registration.
2. Connection state.
3. Sender/receiver network reachability.
4. Multicast or unicast routing.
5. Firewall and ACL state.
6. RTP packet arrival.
7. RTP sequence and timestamp behavior.
8. PTP synchronization.
9. Receiver buffering.
10. Decode/render pipeline.

This ordering prevents an engineer from changing application configuration when the packets never reach the host.
