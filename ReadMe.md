# Crew Management Program

## Overview

This program is for Mobile Applications Course - Assignment 1.
Created by: Mengyao Zhang.

Crew Management Program is a simple program that allows users to manage their crew members including assign works, check their work status, and add new crew members and delete existing ones.

## Features

1. Add New Crew Member: Users can add new crew members by entering their name, selecting role.
2. Delete Crew Member: Users can delete existing crew members by clicking on "Delete" button.
3. Assign Works: Users can assign works to crew members by clicking on their names and entering work details in modal dialog.
4. Complete Works: Users can complete works by clicking on "Complete" button in modal dialog.

## Requirements

To run and develop this project, you'll need:

    -Android Studio: For running the Android emulator and building the APK
    -Visual Studio Code: For editing the source code and running the development server

Additional dependencies:

    -Node.js and npm (Node Package Manager)
    -Expo CLI

## Installation Instructions

### Installing with APK(recommended)

1. Unzip the assignment file.
2. Open the folder and find the apk file.
3. Open devices manager in Android Studio.
4. Select a emulator device and run.
5. Drag and drop the apk file into the device.
6. You will see the app icon like below:
   ![App Icon](./screenShot/icon.png "App Icon")
7. Click on the icon to run the app.

### Installing with Source Code

1. Open Visual Studio Code.
2. Open the folder in Visual Studio Code.
3. Open terminal type the command:
   `npm install`
   `npx expo start`
4. Then it will show a QR code and lots of options. Press "a" to choose the Android emulator.
5. Wait for the app to build and run.

## Usage

1. When opening the app, you will see a welcome page, click on "Get Started" to enter the main page.
2. In the main page, you can see the list of crew members, their roles, and their work status.
3. Click on any crew member to open a modal dialog, either to assign works or complete works.
4. Click on "Manage Employees" Tab on the bottom of the page to go to the employee management page.
5. You can enter new crew members' information and add them to the list.
6. You also can delete existing crew members by clicking on "Delete" button of each crew member.
7. Either add or delete crew members, you will see the changes reflected in the main page.

## github link

[github - Crew Management App](https://github.com/mengyaozhang888/CrewManagementApp.git)

## Screenshots

![Home Screen](./screenShot/Home%20to%20enter.png)
![Employee Page](./screenShot/Employees.png)
![Assign Works](./screenShot/Assign%20work.png)
![Complete Works](./screenShot/Complete%20work.png)
![Manage Employees](./screenShot/Manage%20Employees.png)
