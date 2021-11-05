---
templateKey: custom-page
title: Test
titleColor: "#ffffff"
description: Test
pageBuilder:
  - type: textOnly
    textAlign: center
    bgColor: ""
    textColor: "#264548"
    mdContent: "#### Header"
  - type: textAndImageBlock
    buttons:
      bgColor: "#faf6ee"
      fgColor: "#9de2dd"
      textColor: "#264548"
    image:
      alt: Accessibility name
      image: /img/2_orig.png
    mediaPosition: left
    bgColor: "#faf6ee"
    fgColor: "#9de2dd"
    mdContent: test
  - type: sideBySide
    bgColor: "#9de2dd"
    leftComponent:
      - type: textOnly
        textAlign: left
        bgColor: "#9de2dd"
        textColor: "#264548"
        mdContent: >-
          # This is a test of our Side By Side


          It allows you to select from the items you already know and have them appear next to one another!




          Uses include:


          * Styled Checks

          * Rich Text

          * Box with Logo
    rightComponent:
      - type: boxWithLogo
        bgColor: "#9de2dd"
        fgColor: "#264548"
        textColor: "#faf6ee"
        heading: Wow Look At this!
        mdContent: |-
          So cool! And the more text you add here the larger I get as well!

          It works!
---
