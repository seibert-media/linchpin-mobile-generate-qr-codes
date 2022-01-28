# Example script for generating mass QR codes for linchpin mobile

This script can be used to generate qr codes for the connection of linchpin mobile.

## Prerequisites

You need a current version of [Node](https://nodejs.org/en/) and [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Adjust the data

Take a look into index.js and set the data to fill your needs:

The usernames you want to generate QR codes for:

    let usernames = ['pwinter', 'tschroeder'];

The Confluence baseurl of your system:

    let serverUrl = 'https://mobile-test.linchpin-intranet.com';

An adminaccount for your system:


    let adminname = "adminuser";
    let adminpassword = "adminpassword";


## Install and run

    npm install
    npm run start

## Getting the result

You will find the generated qrcode image files in the directory `qrcodes`. The files are named username.png.
