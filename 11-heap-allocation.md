# Heap Allocation

## Table of Contents

1. [Introduction](#1-introduction)
2. [Process Memory Regions](#2-process-memory-regions)
3. [Heap Allocation](#3-heap-allocation)
4. [Fragmentation](#4-fragmentation)
5. [Dynamic Data Structures](#5-dynamic-data-structures)
6. [Allocation Costs](#6-allocation-costs)
7. [A Free-List Allocator](#7-a-free-list-allocator)
8. [Summary](#8-summary)

## 1. Introduction

This document describes dynamic memory allocation from a process heap. The document covers process memory regions, allocation and release, fragmentation, pointers, dynamic data structures, and allocation costs. The document does not cover garbage collection or detailed allocator implementations.

## 2. Process Memory Regions

A process memory layout can include a **text segment** for executable code, data segments for global and static values, a stack for function execution, and a heap for dynamically allocated memory. Exact layouts vary by operating system, executable format, and runtime.

The stack provides space for function-call state with a bounded allocation pattern. The heap supports allocations whose lifetime and size are not tied to one function call. Heap memory remains allocated until the program or its memory-management system releases it.

## 3. Heap Allocation

A program requests a heap allocation with a size. A memory allocator tracks available regions and returns a pointer to a region large enough for the request. A pointer identifies an address; it does not necessarily include the size of the allocated object.

The allocator can satisfy a request using memory it already manages. If more memory is required, the allocator can request additional memory from the operating system. Operating systems commonly manage memory in pages or other units, so the amount provided can differ from the requested object size.

When a program no longer needs an allocation, it releases the allocation through the applicable memory-management interface. The allocator marks the region as available for reuse and can combine adjacent free regions. In C, `malloc` and `free` provide common interfaces for manual heap allocation and release.

## 4. Fragmentation

**External fragmentation** occurs when free memory is divided into separate regions and no individual region is large enough for a request, even though the total free space is sufficient. Releasing allocations in an unpredictable order can create this pattern.

Allocators use strategies such as first fit, best fit, or worst fit to select a free region. Each strategy has different search costs and fragmentation behavior. No simple selection strategy eliminates all fragmentation.

## 5. Dynamic Data Structures

A dynamically sized collection can grow or shrink during execution. An array-like collection may need a larger contiguous allocation when its capacity is exceeded. The allocator or collection implementation may move the elements to a new region.

A linked list stores nodes separately and connects them with pointers. This structure can grow without requiring one contiguous region for all elements, but nodes can be scattered in memory. Scattered access can reduce cache locality.

An array list or vector stores elements contiguously and can provide locality during sequential access. It may require a larger allocation and copying when its capacity grows. The choice of data structure depends on the access pattern and allocation requirements.

## 6. Allocation Costs

Heap allocation can require allocator searches, bookkeeping, memory initialization, or requests to the operating system. These operations can add overhead. Repeated allocation and release can also increase fragmentation.

Allocating a heap object does not make each later memory access inherently slower than a stack access. Access time depends on the memory hierarchy and access pattern. Compact, frequently accessed data can improve cache locality regardless of whether its storage is on the heap or stack.

## 7. A Free-List Allocator

One allocator design, the **free-list allocator**, tracks available memory as a linked list of free blocks, each with a stored size. The following pseudocode illustrates a first-fit allocation strategy, referenced in Section 4:

```text
function allocate(requested_size):
    block <- free_list.head
    while block is not null:
        if block.size >= requested_size:
            remove block from free_list
            if block.size - requested_size > MINIMUM_SPLIT_SIZE:
                remainder <- split(block, requested_size)
                add remainder to free_list
            mark block as allocated
            return pointer_to(block)
        block <- block.next
    request_more_memory_from_os(requested_size)
    retry allocate(requested_size)

function release(pointer):
    block <- block_header_for(pointer)
    mark block as free
    if adjacent_block(block, direction=next) is free:
        merge block with next
    if adjacent_block(block, direction=previous) is free:
        merge block with previous
    add block to free_list
```

The `release` function's merging step, sometimes called **coalescing**, combines adjacent free blocks into one larger block. Coalescing directly addresses the external fragmentation described in Section 4: without it, a pattern of allocate and release calls can leave many small adjacent free blocks that, individually, are too small to satisfy a large request, even though their combined size would be sufficient.

First fit, best fit (searching for the smallest block that still satisfies the request), and worst fit (using the largest available block) all use a search over the free list; they differ in which block a search selects once a candidate is found. Production allocators, such as the implementations behind `malloc` in widely used C libraries, use more sophisticated structures, including segregated free lists indexed by size class, to reduce search time.

## 8. Summary

This document describes heap allocation, release, fragmentation, dynamically sized data structures, and a free-list allocator with first-fit allocation and coalescing. Allocation overhead and access locality affect performance, but heap memory is not inherently slower to access than stack memory. The document does not cover garbage collection or detailed production allocator implementations.

### 8.1 References

- The Linux man-pages project, [malloc(3) man page](https://man7.org/linux/man-pages/man3/malloc.3.html), for the C standard library heap-allocation interface.
- The Open Group, [POSIX.1-2017 (IEEE Std 1003.1-2017)](https://pubs.opengroup.org/onlinepubs/9699919799/), for the standard `malloc`, `free`, and related interfaces.
