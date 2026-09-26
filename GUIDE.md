# Technical Document Author Guidelines

## Purpose

This document defines the rules for converting a spoken transcript into a technical manual in Markdown format. These guidelines apply to manuals covering hardware, software, electronics, and computing topics.

## Table of Contents

1. [Source Material](#1-source-material)
2. [Voice and Tone](#2-voice-and-tone)
3. [Forbidden Content](#3-forbidden-content)
4. [Sentence Structure](#4-sentence-structure)
5. [Word Choice](#5-word-choice)
6. [Document Structure](#6-document-structure)
7. [Headings](#7-headings)
8. [Tables](#8-tables)
9. [Code Blocks](#9-code-blocks)
10. [Mathematical Expressions](#10-mathematical-expressions)
11. [Notes and Warnings](#11-notes-and-warnings)
12. [Formatting Rules](#12-formatting-rules)
13. [Markdown Linter Compliance](#13-markdown-linter-compliance)
14. [Review Checklist](#14-review-checklist)

## 1. Source Material

### 1.1 Transcript Conversion

Convert the transcript into written text. Remove all elements that exist only in the spoken format.

Remove the following:

- Greetings and introductions
- Channel names, host names, and social media references
- Subscription requests and engagement requests
- Sponsor segments and product promotions
- References to video, audio, or visual elements
- References to other videos, channels, or creators
- Personal anecdotes and opinions
- Humor, jokes, and asides

### 1.2 Content Preservation

Preserve all technical content. Preserve all definitions, operations, values, tables, and sequences. Remove only the spoken format elements listed in Section 1.1.

## 2. Voice and Tone

### 2.1 Voice

Use the third person. Use the passive voice when the actor is not relevant.

| Avoid                                      | Use                                                    |
| :----------------------------------------- | :----------------------------------------------------- |
| I will show you how a transistor works.    | This document describes the operation of a transistor. |
| You can connect two transistors in series. | Two transistors connect in series.                     |
| We need a circuit that outputs one.        | A circuit that outputs one is required.                |
| Let's start with adders.                   | This section describes adders.                         |

### 2.2 Tone

Write factual statements. Do not address the reader. Do not use contractions.

| Avoid                            | Use                              |
| :------------------------------- | :------------------------------- |
| Don't forget to check the carry. | The carry requires verification. |
| It's important to note that...   | The carry requires verification. |
| You'll need eight full adders.   | Eight full adders are required.  |

## 3. Forbidden Content

### 3.1 Adjectives

Do not use adjectives. Adjectives introduce subjectivity. Replace adjectives with measurements, facts, or removal.

| Avoid                     | Use                                |
| :------------------------ | :--------------------------------- |
| a simple gate             | a gate with one input              |
| a powerful concept        | the concept of abstraction         |
| incredible speed          | the speed of the electrical signal |
| a very brief introduction | an introduction                    |
| more useful things        | adders and subtractors             |
| a rudimentary version     | a version                          |
| severe consequences       | undefined behavior                 |
| fancy 3D printed parts    | 3D printed parts                   |

Exception: adjectives in established technical terms. Examples: "full adder," "half adder," "arithmetic logic unit," "binary decoder."

### 3.2 Subjective Statements

Remove statements that express opinion, emotion, or judgment.

| Avoid                                                    | Use                                               |
| :------------------------------------------------------- | :------------------------------------------------ |
| This may seem confusing.                                 | The NOT gate inverts the input signal.            |
| This is huge.                                            | A decoder with four inputs controls 16 outputs.   |
| Believe it or not...                                     | (Remove)                                          |
| This is where we begin to see the power of abstractions. | Abstraction combines logic gates into components. |

### 3.3 Filler and Repetition

Remove filler words and repeated phrases.

| Avoid                  | Use                                    |
| :--------------------- | :------------------------------------- |
| basically              | (Remove)                               |
| essentially            | (Remove)                               |
| actually               | (Remove)                               |
| quite simple           | (Remove or replace with a measurement) |
| very, very, very brief | (Remove)                               |
| one more time          | (Remove)                               |
| and so on              | (Remove or complete the list)          |
| stuff like that        | (Remove or replace with the list)      |

## 4. Sentence Structure

### 4.1 Sentence Length

Use one clause per sentence when the clause carries a complete instruction or definition. Split compound sentences.

| Avoid                                                                                               | Use                                                           |
| :-------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ |
| When current is applied to the base terminal, it acts as a conductor, allowing electricity to flow. | Current applied to the base terminal allows current to flow.  |
| This is where we begin to apply a powerful concept called abstraction.                              | Abstraction replaces transistor-level detail with components. |

### 4.2 Active and Passive Voice

Use active voice when the subject performs the operation. Use passive voice when the actor is not relevant.

| Avoid                                             | Use                                    |
| :------------------------------------------------ | :------------------------------------- |
| Electricity is allowed to flow by the transistor. | The transistor allows current to flow. |
| The input is received by the decoder.             | The decoder receives the input.        |

### 4.3 Parallel Structure

Use parallel structure in lists and tables.

| Avoid                                                 | Use                                             |
| :---------------------------------------------------- | :---------------------------------------------- |
| The adder takes inputs, and then the sum is produced. | The adder receives inputs and produces the sum. |

## 5. Word Choice

### 5.1 Terminology

Use one term for one concept. Do not alternate between synonyms.

| Avoid                       | Use     |
| :-------------------------- | :------ |
| electricity, current, power | current |
| one, 1, high                | one     |
| zero, 0, low                | zero    |
| op code, opcode             | opcode  |
| 8 bit, 8-bit, 8bit          | 8-bit   |

### 5.2 Technical Precision

Replace spoken approximations with measured values.

| Avoid             | Use                                   |
| :---------------- | :------------------------------------ |
| a small current   | a current                             |
| almost instantly  | at the speed of the electrical signal |
| incredible speed  | the speed of the electrical signal    |
| some instructions | the instructions listed in Section 8  |

### 5.3 Contractions

Do not use contractions.

| Avoid  | Use               |
| :----- | :---------------- |
| don't  | do not            |
| it's   | it is             |
| we'll  | the document will |
| you'll | the reader will   |

## 6. Document Structure

### 6.1 Required Sections

Every manual contains the following sections in order:

1. Title
2. Table of Contents
3. Introduction
4. Numbered content sections
5. Summary

### 6.2 Numbering

Number all content sections with Arabic numerals. Number subsections with the parent number and a period.

```markdown
## 1. Section Title

### 1.1 Subsection Title

### 1.2 Subsection Title

## 2. Section Title

### 2.1 Subsection Title
```

### 6.3 Introduction

State the subject of the document and the scope. Do not state the value of the document. Do not address the reader.

| Avoid                                                 | Use                                                    |
| :---------------------------------------------------- | :----------------------------------------------------- |
| In this document, we will learn how transistors work. | This document describes the operation of a transistor. |
| This guide will help you understand adders.           | This document describes adders.                        |

### 6.4 Summary

State the content of the document and the excluded content. Do not request engagement.

| Avoid                               | Use                                  |
| :---------------------------------- | :----------------------------------- |
| Don't forget to like this document. | This document does not cover memory. |
| Thanks for reading!                 | (Remove)                             |

## 7. Headings

### 7.1 Heading Levels

Use `#` for the title. Use `##` for content sections. Use `###` for subsections. Do not use `####` or deeper levels.

Increment heading levels by one at a time. Do not skip a level.

| Avoid            | Use                         |
| :--------------- | :-------------------------- |
| `#` then `###`   | `#` then `##` then `###`    |
| `##` then `####` | `##` then `###` then `####` |

### 7.2 Heading Text

Use noun phrases. Do not use questions, verbs, or sentences.

| Avoid                            | Use                  |
| :------------------------------- | :------------------- |
| How does a transistor work?      | Transistor Operation |
| Let's build an adder             | Building Adders      |
| What about multi-digit addition? | Multi-Digit Addition |

Exception: a heading in the form of a question is permitted when the section answers the question and the question is the subject of the section. Example: "How a CPU Interprets Instructions."

### 7.3 Heading Capitalization

Capitalize the first word and proper nouns. Do not capitalize articles, conjunctions, or prepositions with fewer than four letters.

| Avoid                           | Use                             |
| :------------------------------ | :------------------------------ |
| Building Adders And Subtractors | Building Adders and Subtractors |
| The 8-Bit Adder                 | The 8-Bit Adder                 |

### 7.4 Heading Spacing

Place one space after the hash marks. Do not place multiple spaces after the hash marks.

| Avoid                    | Use                    |
| :----------------------- | :--------------------- |
| `##  Section Title`      | `## Section Title`     |
| `###   Subsection Title` | `### Subsection Title` |

### 7.5 Blank Lines Around Headings

Place one blank line above and one blank line below every heading.

```markdown
## Section Title

Content begins here.

### Subsection Title

Content begins here.
```

Do not place zero blank lines above or below a heading. Do not place multiple blank lines above or below a heading.

### 7.6 Trailing Hashes

Do not place closing hash marks after the heading text.

| Avoid                 | Use                |
| :-------------------- | :----------------- |
| `## Section Title ##` | `## Section Title` |

## 8. Tables

### 8.1 Table Use

Use a table for input-output mappings, truth tables, and value lists.

### 8.2 Table Format

Use a header row. Use left alignment for text. Use center alignment for binary values. Place one space on each side of every pipe character.

```markdown
| Input A | Input B | Output |
| :-----: | :-----: | :----: |
|    0    |    0    |   0    |
|    0    |    1    |   0    |
|    1    |    0    |   0    |
|    1    |    1    |   1    |
```

### 8.3 Table Alignment

Align the pipe characters in the delimiter row with the pipe characters in the header row. Do not use compact style with missing spaces around pipes.

Compact table syntax omits spaces around pipe characters. Use spaces around every pipe.

- Compact header: `|A|B|`; aligned header: `| A | B |`.
- Compact delimiter: `|:---|:---|`; aligned delimiter: `| :--- | :--- |`.

### 8.4 Table Content

State values in the cells. Do not add commentary in the cells.

## 9. Code Blocks

### 9.1 Code Block Use

Use a code block for binary operations, formulas, and code.

### 9.2 Code Block Format

Use triple backticks. State the language when the language applies.

````markdown
```math
0 + 0 = 0
```

```text
0 + 0 = 0
```
````

### 9.3 Code Span Format

Do not place spaces inside code span elements.

| Avoid             | Use              |
| :---------------- | :--------------- |
| `` `Markdown ` `` | `` `Markdown` `` |
| `` ` code` ``     | `` `code` ``     |

## 10. Mathematical Expressions

### 10.1 LaTeX Support

GitHub supports LaTeX formatted math within Markdown. Mathematical expressions render in GitHub Issues, GitHub Discussions, pull requests, wikis, and Markdown files. GitHub uses MathJax as the display engine. MathJax supports a range of LaTeX macros and accessibility extensions.

### 10.2 Inline Expressions

Delimit inline mathematical expressions with dollar symbols (`$`). Use the `` $` `` and `` `$ `` delimiters when the expression contains characters that overlap with Markdown syntax.

| Avoid                     | Use                         |
| :------------------------ | :-------------------------- |
| `0 + 0 = 0`               | `$0 + 0 = 0$`               |
| `n` full adders           | `$n$` full adders           |
| `2` cannot be represented | `$2$` cannot be represented |
| `16` outputs              | `$16$` outputs              |

Example:

```markdown
This sentence uses `$` delimiters to show math inline: $\sqrt{3x-1}+(1+x)^2$
```

### 10.3 Block Expressions

Place a mathematical expression on its own line. Delimit the expression with two dollar symbols (`$$`). Alternatively, use a `math` code block. The `math` code block does not require dollar delimiters.

```math
\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
```

```markdown
$$
\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
$$
```

In a `.md` file, end the line with a backslash to create a line break before a block expression.

```markdown
**The Cauchy-Schwarz Inequality**\
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
```

### 10.4 Dollar Signs in Expressions

To display a dollar sign as a character on the same line as a mathematical expression, escape the non-delimiter dollar sign with a backslash. Within a math expression, add a backslash before the explicit dollar sign.

| Avoid        | Use                |
| :----------- | :----------------- |
| `$\sqrt{$4}` | ``$`\sqrt{\$4}`$`` |

Example:

```markdown
This expression uses `\$` to display a dollar sign: $`\sqrt{\$4}`$
```

### 10.5 Dollar Signs Outside Expressions

To display a dollar sign outside a math expression but on the same line, wrap the explicit dollar sign in span tags.

| Avoid    | Use                   |
| :------- | :-------------------- |
| `$100/2` | `<span>$</span>100/2` |

Example:

```markdown
To split <span>$</span>100 in half, we calculate $100/2$
```

### 10.6 Variable and Value Usage

Use LaTeX delimiters for variables, values, and expressions. Apply the convention consistently throughout the document.

| Avoid                                                         | Use                                                             |
| :------------------------------------------------------------ | :-------------------------------------------------------------- |
| When the input is 0, the output is 0.                         | When the input is $0$, the output is $0$.                       |
| Adding binary numbers of n digits requires n full adders.     | Adding binary numbers of $n$ digits requires $n$ full adders.   |
| The value 2 cannot be represented with a single binary digit. | The value $2$ cannot be represented with a single binary digit. |
| A decoder with four inputs controls 16 outputs.               | A decoder with four inputs controls $16$ outputs.               |
| An AND gate outputs 1 if and only if both inputs are 1.       | An AND gate outputs $1$ if and only if both inputs are $1$.     |

### 10.7 Binary Addition Example

Use a `math` code block for a sequence of binary operations.

```math
0 + 0 = 0
```

```math
0 + 1 = 1
```

```math
1 + 0 = 1
```

```math
1 + 1 = 2
```

### 10.8 Consistency

Do not alternate between LaTeX delimiters and plain text for the same type of value. Choose one convention and apply it throughout the document. Values in tables remain in plain text. Values in prose use LaTeX delimiters.

## 11. Notes and Warnings

### 11.1 Note Format

Use a blockquote for a note. State the note as a factual statement.

```markdown
> An AND gate outputs one when both inputs are one.
```

### 11.2 Warning Format

Use a blockquote for a warning. State the condition and the result.

```markdown
> Operation overflows that are not managed produce undefined behavior.
```

### 11.3 Note Content

Do not use notes for commentary. Use notes for definitions, conditions, and results.

## 12. Formatting Rules

### 12.1 Section Separation

Do not use horizontal rules to separate sections. Headings separate sections.

### 12.2 Emphasis

Use bold for terms on first use. Use bold for values in tables and lists. Do not use italic for emphasis.

| Avoid                | Use                   |
| :------------------- | :-------------------- |
| This is _important_. | This is **required**. |
| The _sum_ output     | The **sum** output    |

### 12.3 Lists

Use a hyphen for unordered lists. Use numerals for ordered lists. Use parallel structure in list items. Place one blank line above and one blank line below every list.

| Avoid                                        | Use                                          |
| :------------------------------------------- | :------------------------------------------- |
| - Takes input&lt;br&gt;- The sum is produced | - Receives input&lt;br&gt;- Produces the sum |

### 12.4 Links

Do not include links to videos, channels, or social media. Include links only to specifications, standards, and reference documents.

### 12.5 Hard Tabs

Do not use hard tabs. Use spaces for indentation.

| Avoid | Use                       |
| :---- | :------------------------ |
| `\t`  | Two spaces or four spaces |

### 12.6 Multiple Blank Lines

Do not use multiple consecutive blank lines. Use one blank line.

| Avoid                               | Use            |
| :---------------------------------- | :------------- |
| Two or more consecutive blank lines | One blank line |

### 12.7 Trailing Newline

End the file with a single newline character.

### 12.8 First Line Heading

Start the file with a top-level heading (`#`). Do not start the file with a lower-level heading or a paragraph.

| Avoid                               | Use                                  |
| :---------------------------------- | :----------------------------------- |
| `## Introduction` as the first line | `# Document Title` as the first line |

## 13. Markdown Linter Compliance

### 13.1 Rule Reference

The following markdownlint rules apply to all documents. Verify each rule before publication.

| Rule  | Description                                        |
| :---- | :------------------------------------------------- |
| MD001 | Heading levels increment by one level at a time    |
| MD010 | No hard tabs                                       |
| MD012 | No multiple consecutive blank lines                |
| MD019 | No multiple spaces after hash on ATX style heading |
| MD022 | Headings are surrounded by blank lines             |
| MD032 | Lists are surrounded by blank lines                |
| MD038 | No spaces inside code span elements                |
| MD041 | First line in a file is a top-level heading        |
| MD047 | File ends with a single newline character          |
| MD060 | Table column style is consistent                   |

### 13.2 Automated Verification

Run the markdownlint linter before publication. The linter reports violations with the rule identifier and the line number.

```yaml
- name: Lint Markdown
  uses: DavidAnson/markdownlint-cli2-action@v24
  with:
    globs: "**/*.md"
    config: ".markdownlint.json"
    fix: true
```

### 13.3 Configuration

Place the markdownlint configuration in the repository root as `.markdownlint.json`.

```json
{
  "default": true,
  "MD013": false
}
```

This configuration enables all default rules and disables line-length limits (MD013). Line-length limits are disabled because technical documents contain long tables and URLs.

## 14. Review Checklist

Verify each item before publication.

- [ ] All spoken format elements removed (Section 1.1)
- [ ] All technical content preserved (Section 1.2)
- [ ] Third person voice (Section 2.1)
- [ ] No contractions (Section 2.2, Section 5.3)
- [ ] No adjectives outside established terms (Section 3.1)
- [ ] No subjective statements (Section 3.2)
- [ ] No filler words (Section 3.3)
- [ ] One clause per sentence where required (Section 4.1)
- [ ] One term per concept (Section 5.1)
- [ ] No horizontal rules (Section 12.1)
- [ ] Table of Contents present (Section 6.1)
- [ ] Sections numbered (Section 6.2)
- [ ] Introduction states subject and scope (Section 6.3)
- [ ] Summary states content and exclusions (Section 6.4)
- [ ] Heading levels correct (Section 7.1)
- [ ] Heading text correct (Section 7.2)
- [ ] Heading capitalization correct (Section 7.3)
- [ ] Heading spacing correct (Section 7.4)
- [ ] Blank lines around headings present (Section 7.5)
- [ ] Tables formatted (Section 8)
- [ ] Table alignment correct (Section 8.3)
- [ ] Code spans have no spaces (Section 9.3)
- [ ] Inline math uses dollar delimiters (Section 10.2)
- [ ] Block math uses double dollar delimiters or math code block (Section 10.3)
- [ ] Dollar signs in math are escaped (Section 10.4)
- [ ] Dollar signs outside math use span tags (Section 10.5)
- [ ] Math delimiters applied consistently (Section 10.8)
- [ ] Notes formatted (Section 11)
- [ ] No hard tabs (Section 12.5)
- [ ] No multiple blank lines (Section 12.6)
- [ ] Single trailing newline (Section 12.7)
- [ ] First line is a top-level heading (Section 12.8)
- [ ] No links to video or social media (Section 12.4)
- [ ] Markdown linter passes (Section 13)
