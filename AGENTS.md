# Agent Instructions

## Project Identity

The project is a technical textbook titled **Computer Systems: From Logic Gates to Operating Systems**.

The published book consists of 21 numbered core manuals followed by appendices. The core sequence progresses from transistor and logic-gate foundations through memory, CPU execution, data representation, processes, operating-system mechanisms, scheduling, concurrency, IPC, and user-facing shells and file-system objects.

The appendices extend the core material into practical computer-systems subjects required by the title and by the intended university-level scope:

- glossary and terminology
- syllabus and learning outcomes
- bibliography and primary documentation
- worked low-level examples
- animations, simulations, and practice exercises
- GPUs and heterogeneous computing, with emphasis on NVIDIA/CUDA
- networking
- software-defined broadcast and IP media
- virtualization, containers, and cloud systems
- storage, I/O, DMA, and PCIe
- distributed and real-time systems
- troubleshooting and diagnostic procedures
- final coverage audit

Pratt parsing and other compiler-specific material are excluded from the published sequence unless a future revision establishes a defensible computer-systems dependency for such material.

## Source and Research Rules

Use `GUIDE.md` when creating or revising technical manuals. Preserve technical information, remove spoken and promotional material, use the required numbered manual structure, and maintain the established terminology and level of detail.

When the user explicitly asks to study, review, summarize, extract, answer questions, or draft from attached files or repository sources, treat those materials as the requested basis. Ground the response in what the sources actually support. Preserve their terminology, organization, framing, and level of detail. Do not silently fill gaps, reconcile contradictions, or replace source content with general knowledge.

When the task explicitly asks for research, verification, comparison, expansion, or current information, use appropriate external sources. Clearly distinguish source-derived content from model knowledge, inference, and web research. Prefer primary technical documentation, standards, specifications, and manual pages. For Linux-oriented material, prefer current Ubuntu and Linux documentation and manual pages where applicable.

Do not claim that a source, tool, build, linter, compiler, assembler, or deployment step succeeded unless it was actually executed and verified.

## Review Task List

For transcript-derived content:

1. Check every relevant source transcript against the existing Markdown manuals.
2. Identify missing technical details, factual mistakes, oversimplifications, unsupported claims, or misleading analogies.
3. Confirm whether the issue belongs in an existing manual, appendix, or a new manual.
4. Update the relevant Markdown file using the rules in `GUIDE.md`.
5. Preserve correct technical content and fix inaccurate or incomplete parts.
6. Assess whether each substantive topic is placed in the appropriate manual or appendix.
7. Record placement findings separately from factual findings when reporting review results.
8. Update `README.md` when manuals, appendices, ordering, or scope statements change.
9. Run the configured Markdown lint command when the environment supports it. If the required linter is unavailable and the user has instructed that linter attempts be skipped, perform structural checks instead and state that the automated lint was not run.

For whole-book reviews:

1. Verify that all 21 core manuals are present and ordered correctly.
2. Verify that each manual has the required structure from `GUIDE.md`.
3. Check cross-references, filenames, table-of-contents entries, and appendix references.
4. Check for duplicated ownership of concepts and move material when a clearer primary owner exists.
5. Check prerequisite order from hardware to machine execution to operating-system mechanisms and then to concurrency and user-facing systems.
6. Audit the appendices for coverage, accuracy, source quality, and consistency with the core manuals.
7. Ensure the title and scope accurately describe the contents.
8. Check that practical material connects low-level mechanisms to observable Linux, networking, GPU, cloud, and professional-media behavior.
9. Perform final structural validation across all Markdown files.

## Content Placement Review

Evaluate every substantive topic using these criteria:

- **Conceptual cohesion:** The section groups material that explains one mechanism, abstraction, or workflow.
- **Prerequisite order:** Definitions and lower-level mechanisms appear before concepts that depend on them.
- **Chapter ownership:** Each topic has one primary manual or appendix. Cross-references are used when a topic is relevant to multiple areas.
- **Scope boundaries:** Introductions and summaries accurately state what the manual covers and excludes.
- **Duplication:** Repeated explanations are removed or reduced to a definition and a cross-reference unless repetition is required for context.
- **Granularity:** A section is split when it contains independent concepts with different prerequisites. Sections are merged when they describe one continuous mechanism and neither topic benefits from independent treatment.
- **Student progression:** The core sequence moves from hardware foundations to machine execution, data and program representation, operating-system mechanisms, scheduling and concurrency, and user-facing systems.
- **Applied progression:** Appendices connect the core concepts to Linux, networking, GPU computing, virtualization, cloud systems, and software-defined broadcast/IP media without replacing the core architecture sequence.
- **Navigation integrity:** Table-of-contents entries, section numbering, filenames, and cross-references remain correct after a move, merge, split, rename, or deletion.
- **Scope defensibility:** A topic belongs only when its connection to computer systems is explicit and teachable. Specialist material must be framed as an application of the core concepts rather than as an unrelated survey.

## Technical Scope

The core manuals should establish:

- transistors, logic gates, combinational logic, sequential logic, and clocking
- memory circuits, DRAM, addressing, buses, registers, and CPU datapaths
- instruction fetch/decode/execute and control flow
- data representation, integer and floating-point values, arrays, heap, and stack
- ABIs, calling conventions, executable/process concepts, and system-call boundaries
- interrupts, exception state, context switching, memory protection, and scheduling
- threads, race conditions, atomicity, synchronization, and IPC
- shells, pathname resolution, file-system objects, and process execution

The broader computer-systems scope should address, at an appropriate depth:

- Linux/Ubuntu process state, permissions, services, logs, device I/O, drivers, namespaces, cgroups, and user-space versus kernel-space behavior
- networking: Ethernet, IP, routing, TCP, UDP, RTP, DNS, PTP, packetization, latency, jitter, MTU, and Linux diagnostic tooling
- streaming and broadcast engineering: uncompressed media flows, RTP, PTP, SMPTE ST 2110, AMWA NMOS, redundancy, routing, and interoperability
- software-driven production and cloud platforms, including Grass Valley AMPP as an explicitly identified professional example rather than a universal architecture
- GPUs and heterogeneous computing, with NVIDIA CUDA, GPU memory hierarchy, SIMT execution, synchronization, profiling, and host/device interaction
- virtualization and cloud systems: KVM, QEMU, libvirt, virtual machines, containers, namespaces, cgroups, networking, storage, and resource isolation
- storage and I/O: PCIe, DMA, NVMe, queues, interrupts, device memory, and data movement
- distributed and real-time systems: clocks, deadlines, failure domains, deterministic behavior, synchronization, and latency
- troubleshooting methods that connect observable symptoms to CPU, memory, OS, network, GPU, virtualization, and media-pipeline mechanisms

## Source Hierarchy

For factual verification, prefer sources in this order when available:

1. Architecture specifications and vendor manuals: Intel, Arm, RISC-V, NVIDIA.
2. Standards and specifications: IEEE, IETF, SMPTE, AMWA, POSIX/Open Group.
3. Linux kernel documentation and current Ubuntu documentation/man pages.
4. Official project documentation: QEMU, libvirt, Docker, FFmpeg, VLC, and related projects.
5. Official vendor documentation for professional systems, including Grass Valley AMPP.
6. Peer-reviewed papers and authoritative books when primary documentation is insufficient.

Do not use marketing material as the primary authority for architectural claims.

## Correction Standard

When a source reveals a gap or inaccuracy:

- preserve the correct technical explanation
- replace vague or spoken phrasing with precise technical language
- restore missing details that matter to systems engineering, troubleshooting, or the stated learning outcome
- correct unsupported claims or confusing examples
- keep the tone factual, neutral, and instructional
- avoid sponsor language, personal commentary, engagement requests, and promotional claims
- distinguish architectural requirements from implementation choices
- distinguish educational models from behavior guaranteed by a real architecture
- state version, platform, or implementation scope when a claim is not universal

## Practical and Troubleshooting Material

Troubleshooting content must follow a mechanism-first structure:

1. Observable symptom.
2. Relevant system layer.
3. Hypotheses grounded in documented behavior.
4. Commands, measurements, or tests.
5. Interpretation of results.
6. Corrective action or escalation.
7. Verification after the change.

Linux examples should prefer Ubuntu-compatible commands and current manual pages. Commands must include expected failure cases where those cases are pedagogically relevant.

Broadcast/IP-media troubleshooting should explicitly distinguish:

- source and destination configuration
- link and interface state
- routing and multicast behavior
- packet loss and reordering
- PTP synchronization
- RTP/UDP transport
- media payload format
- NMOS discovery and connection state
- application and platform behavior

## Examples, Animations, and Exercises

Worked examples must reinforce mechanisms introduced in the core manuals.

Animations and simulations should expose state transitions rather than merely decorate the text. Prefer diagrams that show:

- register and datapath changes
- instruction execution
- cache and memory accesses
- virtual-address translation
- interrupt/context-switch state
- race-condition interleavings
- packet and media flow
- CPU/GPU work distribution
- VM/container isolation

Exercises should progress from observation to prediction to implementation to troubleshooting. Include expected reasoning or verification criteria where useful.

## Web-Book Publishing

The repository is intended to publish as a web-based textbook through GitHub Pages.

Maintain:

- `mkdocs.yml`
- `.github/workflows/` deployment configuration
- Mermaid compatibility
- searchable navigation
- stable chapter URLs
- explicit chapter and appendix ordering
- build-time validation of local links and document structure

The web build must treat Markdown as the canonical source. Do not introduce a second manually maintained copy of chapter content.

## Workflow for Each Correction

For each identified issue:

1. identify the affected manual or appendix
2. compare the source material with the existing explanation
3. determine whether the issue is a missing fact, a wrong claim, an unclear explanation, or a placement problem
4. evaluate the topic's placement using the Content Placement Review criteria
5. determine whether the issue belongs in an existing manual, appendix, move, merge, or new document
6. edit the Markdown in the required structure from `GUIDE.md`
7. add or refine examples where they improve understanding without adding fluff
8. update `README.md` when the published structure changes
9. run the configured Markdown lint command when available, or perform documented structural checks when linter execution is intentionally skipped

## Final Verification

Before delivering a final repository:

- verify all core manuals and appendices are present
- verify the README title, table of contents, and sequence rationale
- verify no deleted chapter remains referenced
- verify all local Markdown links
- verify heading hierarchy
- verify fenced code blocks
- verify Mermaid blocks
- verify trailing newlines
- verify no hard tabs or accidental generated artifacts
- verify archive integrity if an archive is produced
- verify the web-book configuration and workflow syntax as far as the available environment permits
- do not claim a successful remote GitHub Pages deployment unless it has actually been observed

The preferred automated Markdown verification command remains:

`npx --yes markdownlint-cli2 '**/*.md'`

When that command cannot run because the environment lacks the package or network access, do not repeatedly retry it after the user has instructed that such attempts be skipped.
