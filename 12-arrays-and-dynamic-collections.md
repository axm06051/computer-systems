# Arrays and Dynamic Collections

## Table of Contents

1. [Introduction](#1-introduction)
2. [Fixed-Size Arrays](#2-fixed-size-arrays)
3. [Indexing and Bounds](#3-indexing-and-bounds)
4. [Dynamic Arrays](#4-dynamic-arrays)
5. [Linked Lists and Locality](#5-linked-lists-and-locality)
6. [Language Implementations](#6-language-implementations)
7. [Complexity Summary](#7-complexity-summary)
8. [Summary](#8-summary)

## 1. Introduction

This document describes array storage, indexed access, bounds, and data structures that support changing collection sizes. The document compares dynamic arrays and linked lists and summarizes how language implementations represent collections. It does not specify the behavior of a particular language runtime or allocator.

## 2. Fixed-Size Arrays

An **array** stores a sequence of elements. A fixed-size array has a set number of elements and does not resize itself when another element is assigned. Many languages require its element type and size to be declared or inferred, but language rules differ.

An array commonly stores its elements in adjacent memory locations. When the element size is known, the address of an element can be calculated from the array's base address and its index:

$$
\text{element address} = \text{base address} + (\text{index} \times \text{element size})
$$

This layout supports direct access by index. The actual layout depends on the language, type, and implementation.

## 3. Indexing and Bounds

Many programming languages use zero-based indexing. Under this convention, the first element has index $0$, and an array with $n$ elements has valid indices from $0$ through $n - 1$. Zero-based indexing is a language convention; it is not required by the address calculation.

Some languages check an index against the array length at runtime and report an error when the index is outside the valid range. Other languages, including C for ordinary array access, do not guarantee such a check. An out-of-bounds access in C has undefined behavior. It can read or overwrite another object in the process, or it can access an unmapped address and cause a fault. Operating-system memory protection generally checks mapped memory regions, not the logical bounds of each array.

An array's length may be available through its type, declaration, or a separate runtime value. A raw pointer to an element does not necessarily carry the array's length.

## 4. Dynamic Arrays

A **dynamic array** stores elements in an array while tracking a length and a capacity. The length is the number of elements currently stored. The capacity is the number of elements that fit in the current allocation.

When an insertion would exceed the capacity, an implementation can allocate a larger region, copy the elements, release or reuse the previous region, and update the collection's reference and capacity. The growth policy varies. Geometric growth, such as doubling capacity, can make repeated appends amortized constant time, although an individual resize requires time proportional to the number of elements copied.

Index access remains constant time when the collection uses a contiguous array. Inserting or removing an element near the beginning can require shifting later elements and therefore take time proportional to the number of shifted elements. Reallocation can invalidate pointers or references to elements, depending on the language and collection API.

## 5. Linked Lists and Locality

A **linked list** stores elements in nodes connected by references or pointers. Nodes do not need to occupy adjacent memory locations. Accessing the element at an index requires traversing nodes from the list's head and takes time proportional to the number of nodes traversed.

Inserting or removing a node can take constant time when the relevant node and its predecessor are already known. Finding a node by index still requires traversal. A linked list therefore does not make every insertion or removal constant time.

Array elements are stored together, which can improve cache locality when adjacent elements are accessed in sequence. Linked-list nodes can be spread across memory and require pointer chasing. This can increase cache misses on processors with caches. Performance depends on access patterns, allocation, and the target system.

## 6. Language Implementations

A collection's source-level behavior does not specify its complete memory representation. Implementations use different layouts and can optimize them at runtime or compile time.

For example, a Python list stores references to objects, which allows elements of different types but requires an additional reference lookup. Java distinguishes arrays of primitive values from arrays of object references. Rust generics are commonly monomorphized into code and layouts for concrete types. These implementation details are language-specific.

JavaScript arrays have indexed properties and a defined length behavior. JavaScript engines can use different internal representations, including optimized storage for sequences and sparse representations for arrays with distant indices. Describing all JavaScript arrays as hash maps is inaccurate; exact storage is an engine implementation detail.

## 7. Complexity Summary

The following pseudocode implements the doubling growth policy described in Section 4:

```text
function append(array, value):
    if array.length == array.capacity:
        new_capacity <- max(1, array.capacity * 2)
        new_storage <- allocate(new_capacity)
        copy array.storage[0 .. array.length] to new_storage
        release(array.storage)
        array.storage <- new_storage
        array.capacity <- new_capacity
    array.storage[array.length] <- value
    array.length <- array.length + 1
```

Doubling the capacity means that the total number of element copies performed across $n$ appends, starting from an empty array, is bounded by $1 + 2 + 4 + \dots + n \leq 2n$. Dividing this bound by $n$ appends gives an **amortized** cost per append of $O(1)$, even though any individual append that triggers a resize costs $O(n)$.

The table below summarizes the time complexity of common operations for a dynamic array and a singly linked list, both described in Sections 4 and 5.

| Operation | Dynamic Array | Linked List |
| :--- | :---: | :---: |
| Access by index | $O(1)$ | $O(n)$ |
| Append at the end | $O(1)$ amortized | $O(1)$ with a tail pointer, else $O(n)$ |
| Insert or remove at a known node | $O(n)$, due to shifting | $O(1)$ |
| Insert or remove by index | $O(n)$ | $O(n)$, due to traversal |
| Memory overhead per element | None beyond unused capacity | One or more pointers per node |

## 8. Summary

This document describes fixed-size arrays, indexed address calculation, bounds behavior, dynamic arrays, linked lists, cache locality, language-specific collection representations, and the time-complexity trade-offs between contiguous and node-based storage. The document does not specify a particular runtime's allocation policy or internal layout.
