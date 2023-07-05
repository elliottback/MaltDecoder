![Node.js CI](https://github.com/elliottback/MaltDecoder/workflows/Node.js%20CI/badge.svg)
[![Release](https://github.com/elliottback/MaltDecoder/actions/workflows/release.yml/badge.svg)](https://github.com/elliottback/MaltDecoder/actions/workflows/release.yml)
![CodeQL](https://github.com/elliottback/MaltDecoder/workflows/CodeQL/badge.svg)
![Snyk Vulnerabilities](https://snyk.io/test/github/elliottback/MaltDecoder/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=elliottback_MaltDecoder&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=elliottback_MaltDecoder)
![GitHub issues](https://img.shields.io/github/issues/elliottback/MaltDecoder)
![GitHub pull requests](https://img.shields.io/github/issues-pr/elliottback/MaltDecoder)
![GitHub top language](https://img.shields.io/github/languages/top/elliottback/MaltDecoder)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/elliottback/MaltDecoder)
[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# What is this?

This is a Chrome plugin to automatically decode the SMWS website whisky numbers and add their names in parentheses nearby.  Currently, this is only working for the Japan and UK sites. 

## What does this Chrome Plugin look like?

|Before (no Distillery name)|After (With Name)|
|----|-----|
|![Before](/img/smwsbefore.png)|![After](/img/smwsafter.png)|

# Installation Instructions
**Google Chrome**
1. Download the [latest release ZIP file from GitHub](https://github.com/elliottback/MaltDecoder/releases/latest/download/MaltDecoder.zip).
1. Unzip the file to the folder of your choice, say `MaltDecoder`.
1. In Chrome go to the extensions page (`chrome://extensions`).
1. Enable Developer Mode.
1. Drag the `MaltDecoder` folder anywhere on the page to import it.
1. You may need to toggle the sticky on/off switch by right clicking on a blank part of extensions when on the site the first time to enable it

**Notes**
* Every time you open Chrome it may warn you about running extensions in developer mode, just click 🗙 to keep the extension enabled.

## What permissions are required?

This extension will request the ability to inspect/modify content on SMWS HTTP/s domains.

# Build & Test

Just run `npm run ci` before `npm test`