# Widget Viewer

## WORK IN PROGRESS

I wrote this project when learning to code so it doesn't represent my current skills. Please judge me by more recent projects in my portfolio [www.sebster.dev](https://sebster.dev).

I might revisit this project at some point.

## Features

- Projects embeded as responsive, resizeable iframes
- Scroll in Z axis (one page at a time)
- Iframes send scroll events to host window (wheel, touch, trackpad)
- Iframes load only when near top of page stack

## TODOs

- REFACTOR
- info panel show on click, not hover; persist through viewed projects
- Get project descriptions (from Readme ?)
- buttons instead of select element for layout selection
- header nav: side-scroll on edge hover
- init with custom-width option selected
- Optimize
- Browser compatibility
- Z-scroll animation
- Add theme(s)

## Known Issues

#### On .panel mouseleave, .title element jumps into it's next position instead of transitioning smoothly

Solutions:

- transition property 'top' instead of 'flex-grow'
- OR Switch to animations instead of transitions

#### When in full-width layout panel is expanded, and layout is changed to half-width, panel remains expanded

Solutions:

- reset .panel classes on layout change
- OR use doc:mousemove instead of .panel:mouseenter/leave
