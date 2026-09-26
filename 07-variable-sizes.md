# Variable Sizes and Data Types

## Table of Contents

1. [Introduction](#1-introduction)
2. [Bit Width and Value Range](#2-bit-width-and-value-range)
3. [Fixed-Width Types](#3-fixed-width-types)
4. [Runtime Type Information](#4-runtime-type-information)
5. [Dynamic Collections](#5-dynamic-collections)
6. [Text Encoding and Numeric Parsing](#6-text-encoding-and-numeric-parsing)
7. [Floating-Point Representation](#7-floating-point-representation)
8. [Summary](#8-summary)

## 1. Introduction

This document describes how data types determine the storage and interpretation of program values. The document covers bit width, signedness, runtime type information, and dynamically sized collections. The document does not cover the detailed operation of the stack or heap.

## 2. Bit Width and Value Range

Computer data is represented as bits. A sequence of $n$ bits has $2^n$ possible bit patterns. An unsigned value represented with $n$ bits ranges from $0$ through $2^n - 1$.

An 8-bit unsigned value has $2^8 = 256$ possible values, from $0$ through $255$. Each additional bit doubles the number of representable patterns. Common integer widths include 8, 16, 32, and 64 bits.

## 3. Fixed-Width Types

A fixed-width type specifies the number of bits used to represent a value. Its type also determines how the bit pattern is interpreted, including whether an integer can represent negative values or whether a value is floating point.

Selecting a type requires a range large enough for the values the program must represent. An unsigned 8-bit integer can represent an age only when the application's permitted values are within $0$ through $255$. A wider type can represent a larger range but uses more storage per value.

Static type and size information can allow a compiler to select machine operations and storage at compile time. Exact storage layout and generated code depend on the language, compiler, and target architecture.

## 4. Runtime Type Information

Some dynamically typed language implementations store type information with runtime values. The runtime uses this information to select operations and detect incompatible values. The metadata requires storage, and interpreting it can add work during operations.

Implementations vary. Dynamically typed languages can use different value representations, and statically typed languages can also require runtime metadata. Type systems alone do not determine a program's memory use or performance.

## 5. Dynamic Collections

The size of a fixed-size array is part of its type or declaration. Some languages require the size to be known when the array is created or compiled.

A dynamically sized collection can grow or shrink during execution. Its elements are stored in dynamically allocated memory. A collection value commonly contains a reference to that memory and metadata such as its current length. The allocation strategy and metadata depend on the language and collection type.

## 6. Text Encoding and Numeric Parsing

Text is stored as encoded numeric values. An encoding maps characters to code points or encoded byte sequences. ASCII assigns codes to characters such as the decimal digits. UTF-8 represents the ASCII character set with the same byte values, but Unicode is a character repertoire rather than one specific byte encoding.

The encoded character for a digit is not the integer value of the digit. A parser first validates that each input character is a permitted digit and converts it to its numeric value. For a base-10 string, the parser can update an accumulator for each digit using:

$$
value <- 10 * value + digit
$$

The parser must also handle an invalid character and detect overflow when the result cannot be represented by the selected integer type. Formatting a number as text performs the inverse conceptual operation by producing the encoded characters for its decimal digits.

The following pseudocode parses an unsigned base-10 string into a fixed-width integer and detects both an invalid character and overflow:

```text
function parse_unsigned(text, max_value):
    value <- 0
    if length(text) == 0:
        return error("empty input")
    for character in text:
        if character < '0' or character > '9':
            return error("invalid character")
        digit <- numeric_value_of(character)
        if value > (max_value - digit) / 10:
            return error("overflow")
        value <- value * 10 + digit
    return value
```

The overflow check compares against a rearranged bound, `value > (max_value - digit) / 10`, instead of computing `value * 10 + digit` first, because the unchecked computation could itself overflow before the comparison occurs.

## 7. Floating-Point Representation

Many languages represent non-integer numeric values using the binary floating-point formats defined by IEEE 754. A floating-point value is stored as a sign bit, a biased exponent, and a significand (also called a mantissa). The two most common IEEE 754 binary formats are listed below.

| Format | Total Bits | Sign | Exponent | Significand |
| :--- | :---: | :---: | :---: | :---: |
| `binary32` (single precision) | 32 | 1 | 8 | 23 |
| `binary64` (double precision) | 64 | 1 | 11 | 52 |

A floating-point value approximates a real number and cannot represent every real number exactly. Fractions such as $0.1$ that are exact in decimal are not exact in binary floating point, which can produce results that differ slightly from a decimal computation with the same input. This differs from the fixed-width integer types in Sections 2 and 3, which represent every integer in their range exactly. IEEE 754 also defines special values, including positive and negative infinity and "not a number" (NaN), which is produced by operations such as $0/0$.

### 7.1 References

- Institute of Electrical and Electronics Engineers, [IEEE 754-2019, IEEE Standard for Floating-Point Arithmetic](https://ieeexplore.ieee.org/document/8766229), the authoritative specification for `binary32`, `binary64`, and related formats and operations.
- Unicode Consortium, [The Unicode Standard](https://www.unicode.org/versions/latest/), the authoritative reference for Unicode code points and encoding forms, including UTF-8.
- American National Standards Institute / International Organization for Standardization, [ISO/IEC 646](https://www.iso.org/standard/4777.html), the international reference version of the character set commonly known as ASCII.

## 8. Summary

This document describes how bit width and type determine value ranges and can affect storage and generated operations. It also covers runtime type metadata, dynamically sized collections, text encodings, numeric parsing, and IEEE 754 floating-point representation. The document does not cover the detailed operation of the stack or heap.
