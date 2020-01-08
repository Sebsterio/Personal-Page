# Personal Page

## WORK IN PROGRESS

## Features

- Dynamically loaded content
- Projects embeded as responsive, resizeable iframes
- Custom scroll in Z axis (one page at a time)
- Iframes send scroll events to host window (wheel, touch, trackpad)
- Iframes load only when near top of page stack

## TODOs

- Find a CSS solution for header positioning (middle col centered and (width: auto); side cols fill remaining space)
- Add nav bar side scroll arrow icons when overflows
- Make page scrolling functionality explicit
- Don't hide content under hover OR point to it in a clear way
- Lint
- Browser compatibility
- Single button instead of select element for layout selection
- Home page
  - Headline: 'Click for info' (maybe...)
  - Split-view panel title: 'Hover for info' (maybe...)
- Add project descriptions
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
