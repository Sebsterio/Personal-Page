# Personal Page

## WORK IN PROGRESS

## Features

- Dynamically loaded content
- Projects embeded as responsive iframes
- Custombizable number of projects displayed in viewport
- Custom scroll function - one page at a time
- Iframes send scroll events to host window (wheel, touch, trackpad)
- Iframes loads when near viewport (scroll-wise)

## TODOs

- a lot...

## Known Issues

#### On .panel mouseleave, .title elemenet jumps into it's next position instead of transitioning smoothly

Solutions:

- transition property 'top' instead of 'flex-grow'
- OR Switch to animations instead of transitions

#### When in full-width layout panel is expanded, and layout is changed to half-width, panel remains expanded

Solutions:

- reset .panel classes on layout change
- OR use .page mousemove instead of .panel mouseenter/leave
