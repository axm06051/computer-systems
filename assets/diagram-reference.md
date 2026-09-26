# Interactive Diagram Reference

This document defines the visual and instructional conventions for interactive diagrams in the textbook. The diagrams support the canonical Markdown explanation; they do not replace it.

## Purpose

Diagrams must make a mechanism understandable to a student who has no prior experience interpreting technical schematics. Prefer visible objects, labels, state changes, and simple paths over abstract circuit symbols.

Every diagram should answer three questions immediately:

1. What are the inputs and outputs?
2. What physical or logical mechanism connects them?
3. What changes when the student changes an input?

## Visual language

Use a black background and a restrained system font. Use white for primary labels, muted gray for structural lines and secondary labels, and yellow for active signal or current flow.

Use consistent geometry:

- Canvas: responsive SVG with a viewBox.
- Main content width: approximately 1125 px.
- Structural line width: 6 px.
- Signal-flow line width: 6 px.
- Node outline: 5 px.
- Rounded input/output nodes should use the same size within a diagram family.
- Keep paths horizontal or vertical wherever possible.
- Keep labels outside paths and align them to the object they describe.
- Do not allow animated elements to float independently of a physical or logical path.

## Interaction

Interaction should expose a mechanism, not merely change decoration.

A control must produce an observable change in the flow, state, or result. For a circuit diagram, the active signal should follow the actual conducting path represented by the circuit model.

Use simple controls such as `Input A: OFF / ON`. Avoid complex control panels, menus, legends, or unnecessary animation.

Each interactive state must have a short textual description below the diagram. The description must agree exactly with the visual state.

## Signal animation

Yellow animation represents an active electrical path or signal transition only when the underlying model supports that interpretation.

Do not animate a logic value as though it were current. A HIGH or LOW output is a voltage/state, not automatically a stream of current leaving the output.

When an output is represented as a node state, change the node or indicator state rather than creating a false continuous current path.

Animation must stop at an actual open path. Never let yellow flow terminate in empty space or pass through a component that the current state has made non-conducting.

## Transistor diagrams

For the chapter's introductory BJT model, use the terminology established in the chapter:

- collector
- emitter
- base
- base current as the control input
- collector-emitter path as the controlled path

The chapter states that the base terminal acts as the input and the emitter terminal acts as the output signal in its introductory example. The diagram must preserve that framing even though other transistor conventions exist.

Show the three terminals explicitly. Do not replace the transistor with an unexplained generic switch when the transistor itself is the teaching subject.

For the introductory NOT-gate example, show the relationship among POWER, LED/load, collector, transistor, emitter/output, RETURN, and INPUT/base. Keep the output visually connected to the emitter in accordance with the chapter's stated model.

## Logic gates

Do not use abstract gate symbols as the primary teaching representation in the low-level transistor section. Show the conducting paths instead.

For two-input gates:

- AND: both input paths must conduct for the output path to conduct.
- OR: either input path may conduct for the output path to conduct.
- NOT: the transistor arrangement produces the inverse output state.

Truth-table behavior may be stated in text below the interactive diagram when useful, but the animation should demonstrate the mechanism rather than merely illuminate a truth-table row.

## Accessibility

Text must remain readable at normal viewing size. Use sufficient contrast between primary text and the black background. Avoid small labels embedded inside dense geometry.

Every SVG must have an accessible `role="img"` and a useful `aria-label` describing the mechanism shown.

The interactive control must have a visible label and must work with keyboard focus.

## Layout checks

Before publication, verify:

- input nodes align with their paths;
- output nodes align with their paths;
- component terminals connect exactly to their wires;
- labels do not overlap paths or other labels;
- animated paths remain inside the corresponding structural path;
- open paths visibly stop at the correct location;
- active paths do not appear when the relevant state is inactive;
- the visual state and explanatory text agree;
- the diagram remains readable at narrow viewport widths.

## Naming and location

Interactive teaching assets belong directly in `assets/`. Do not create a `teaching/` subdirectory for these diagrams.

Name each file for what it shows, for example:

- `and-gate.html`
- `or-gate.html`
- `not-gate.html`

Use lowercase kebab-case. Avoid generic names such as `diagram1.html`, `interactive.html`, or `teaching-asset.html`.

## Consistency rule

When a later diagram establishes a clearer representation of an existing mechanism, update earlier diagrams to the same visual language rather than introducing a second design system.

The AND, OR, and NOT gate assets should therefore share typography, node geometry, line weights, signal animation, controls, spacing, and state-description conventions while retaining mechanism-specific layouts.
