![Node.js CI](https://github.com/elliottback/MaltDecoder/workflows/Node.js%20CI/badge.svg)

# What is this?

This is a Chrome plugin to automatically decode the SMWS website whisky numbers and add their names in parentheses nearby.  Currently, this is only working for the Japan and UK sites. 

## What does this Chrome Plugin look like?

|Before (no Distillery name)|After (With Name)|
|----|-----|
|![Before](/img/smwsbefore.png)|![After](/img/smwsafter.png)|

# Installation Instructions
**Google Chrome**
1. Download this repo as a [ZIP file from GitHub](https://github.com/elliottback/MaltDecoder/archive/master.zip).
1. Unzip the file and you should have a folder named `MaltDecoder-master`.
1. In Chrome go to the extensions page (`chrome://extensions`).
1. Enable Developer Mode.
1. Drag the `MaltDecoder-master` folder anywhere on the page to import it.

**Notes**
* Every time you open Chrome it may warn you about running extensions in developer mode, just click 🗙 to keep the extension enabled.

## What permissions are required?

This extension will request the ability to inspect/modify content on SMWS HTTP/s domains.