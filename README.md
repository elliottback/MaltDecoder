![Node.js CI](https://github.com/elliottback/MaltDecoder/workflows/Node.js%20CI/badge.svg)
[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)
![GitHub top language](https://img.shields.io/github/languages/top/elliottback/MaltDecoder)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/elliottback/MaltDecoder)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/elliottback/MaltDecoder)
![GitHub issues](https://img.shields.io/github/issues/elliottback/MaltDecoder)
![GitHub pull requests](https://img.shields.io/github/issues-pr/elliottback/MaltDecoder)

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
1. Drag the `dist` folder inside `MaltDecoder-master` anywhere on the page to import it.
1. You may need to toggle the sticky on/off switch by right clicking on a blank part of extensions when on the site the first time to enable it

**Notes**
* Every time you open Chrome it may warn you about running extensions in developer mode, just click 🗙 to keep the extension enabled.

## What permissions are required?

This extension will request the ability to inspect/modify content on SMWS HTTP/s domains.

# Build

Just run `npm run build`