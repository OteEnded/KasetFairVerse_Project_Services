# KasetFairVerse Project Services

Extended from KasetFairVerse Project - Database/BackEnd/API

## Overview

KasetFairVerse Project Services is the backbone service for the KasetFairVerse Event, handling APIs for minigames in each virtual zone. It also includes a full-stack webpage that allows users (event attendants) to easily access the minigames and use collected points to trade for various gifts.

Originally, this project was designed to be an API (Backend, Database) for KasetFairVerse activities. Below, you will find more details about the project's transformation.

## Project Structure

This project is written in a unique style, referred to as "ExpressJS is just a name." It does not strictly follow the framework format, which might cause confusion for those who strictly adhere to framework conventions. However, it is organized and straightforward for developers.

The project does not include a config file on GitHub (using `config.json` instead of `.env`). However, there is a `config-example.json` file that demonstrates the structure. Collaborators needing the actual config file will receive it via private message.

## Requirements

- Node.js major version 18.x.x (as requested by Big Bang Theory Staff)

## Getting Started

1. Clone the project.
2. Run `npm install` to install all dependencies.
3. Run `npm start` to start the project.
4. (Optional) For Tailwind UI to work, run `npm run build`.
5. (Optional) For Tailwind UI live reload, open a new terminal and run `npm run tw`.

## Game API Routes

API route documentation has been moved to a separate document. More detailed API interface information can be found [here](doc/api.md).

## Collaborators

- [OteEnded](https://github.com/OteEnded) - project lead, backend
- [xMickeyS](https://github.com/xMickeyS) - frontend
- [SoraNual](https://github.com/SoraNual) - sql audit

## Project Evolution

### What is the KasetFairVerse Project?

KasetFair is a large market and research showcase event organized by Kasetsart University. KasetFairVerse is a Metaverse (virtual world) that captures the look and feel of the KasetFair event, allowing people to participate as virtual characters. The project aims to promote the KasetFair event and showcase Metaverse technology, in collaboration with Kasetsart University and Big Bang Theory (a now-defunct Metaverse platform in Thailand).

### Project Transformation

Initially, the project was designed to be an API for backend database activities. However, we decided to include minigames in each zone, themed according to the products promoted in that zone. The minigames were developed in Unity and deployed as web applications on Firebase. Users could interact with NPCs in the virtual world to access these minigames, which would open in new browser windows.

The central API (this project) collects user game progress from each Unity game, processes it, and saves it to the database. The backend server handles most of the logic, ensuring smooth operation.

### Challenges and Solutions

As the project evolved, we faced several challenges, particularly with the point trading system. Initially, Big Bang Theory Staff were responsible for this part, but their implementation did not meet our expectations. The website was barely functional, with numerous bugs and an unpolished GUI.

In response, I decided to take over the development of the point trading system. Despite the tight timeline, we managed to deploy a functional system a few days after the event's opening. The backend server and minigames developed by our team were stable, allowing users to collect points seamlessly.

### Final Implementation

After the initial setbacks, I developed the core trading system, including a QR code coupon system and other necessary features. I recruited a frontend developer ([xMickeyS](https://github.com/xMickeyS)) to assist with the implementation. Together, we ensured the system was fully operational and met user expectations.

---

I will provide detailed documentation on how the trading system works in a future...

---

<p style="font-size: 0.8em;">This README was written with the assistance of <a href="https://copilot.github.com/">GitHub Copilot</a>, an AI programming assistant.</p>