# Personal Page

## WORK IN PROGRESS

## Features

- Dynamically loaded content
- Projects embeded as responsive iframes
- Custombizable number of projects displayed in viewport
- Custom scroll function - one page at a time
- Iframes send scroll events to parent window (wheel, touch, trackpad)
- Iframes loads when near viewport (scroll-wise)

## TODOs

- a lot...

## Known Issues

#### Trackpad scroll event inertia keeps sending scroll event messages from iframe to window.parent

#####attempted solutions:

- window.parent: on scroll out, kill iframe script
  _ add attribute 'sandbox' --> no effect;
  _ iframe src='' --> no effect
