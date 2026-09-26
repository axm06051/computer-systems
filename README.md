# Computer Systems: From Logic Gates to Operating Systems

A sequential manual series covering the computing stack from transistors to user-facing shells. Each manual assumes the reader has completed the manuals listed before it.

**[Interactive assets](assets/index.html)** · **[GitHub repository](https://github.com/axm06051/computer-systems)**

## Sequence Rationale

The manuals progress from hardware foundations (1–3) to machine execution (4–6), to data and program representation (7–12), to operating-system mechanisms (13–16), to scheduling and concurrency (17–20), and finally to user-facing tools (21).

Within the operating-system mechanisms group:

- **Operating System Boundaries (13)** introduces processor privilege, interrupts, and system calls.
- **Interrupt Context Saving (14)** describes the processor and software state that must be preserved when control enters an operating-system handler.
- **Process Context and Context Switching (15)** builds on those mechanisms to describe how execution state is saved and restored when execution moves between processes or threads.
- **Memory Protection (16)** describes hardware enforcement of address and access boundaries and depends on the privileged operating-system mechanisms introduced earlier.

**Shells and File-System Objects (21)** is the final core manual because it applies the preceding process, ABI, operating-system, and file-system concepts to user-facing command execution and pathname resolution. Language-implementation topics are excluded because they introduce a separate compiler and programming-language domain that is not required by the architecture and systems progression. The appendices extend the core sequence into the surrounding systems-engineering domains that the title evokes, including networking, GPUs, virtualization, storage, real-time media, cloud infrastructure, and troubleshooting.

## Web Edition

The web edition uses `mkdocs.yml` as its sole navigation definition. The repository README does not duplicate the web-book table of contents.
