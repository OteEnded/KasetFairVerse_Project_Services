# KasetFairVerse Project Services

Extended from KasetFairVerse Project - Database/BackEnd/API

* Database/BackEnd/API For KasetFairVerse Project.
* (Unintentionally) User interface for reward system

### Overview

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
### For Game Developing teams

API route documentation has been moved to a separate document. More detailed API interface information can be found [here](doc/api.md).

## Collaborators

- [OteEnded](https://github.com/OteEnded) - Project Lead, Backend
- [xMickeyS](https://github.com/xMickeyS) - Frontend
- [SoraNual](https://github.com/SoraNual) - SQL (MySQL) Audit

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


## User's Point/Reward Trading System

Since we made the system for users to trade game points for rewards, users will open our website and log in with the same credentials as the Metaverse platform (BigBangTheory). The system sends the login request to BigBang's auth API to authenticate the user. Once authenticated, the user's data will be displayed, including username, user's points grouped by game, a list of rewards that the user can trade for, and even the user game point leaderboard. Thanks to [xMickeyS](https://github.com/xMickeyS) for making the user dashboard look so appealing.

To trade for a reward, users will navigate to the trading page where more details and a menu about trading rewards will be shown. Users will select an available reward that they have enough points to trade for and confirm the trade. The system will generate a coupon for that reward item and mark it as reserved in our reward stock. The system also generates a QR code from the coupon UUID that users can show to our staff when claiming the reward.

Meanwhile, we also created a system for staff to manage rewards accurately, such as a QR code scanner that verifies the user's coupon validity and the reward being claimed. Staff will see which reward to grab, and after giving out the reward, they will sign their name to confirm the transaction. The system logs the transaction and deducts the item from the reward stock. The reward stock updates in real-time and affects the list of rewards that users can trade for, preventing over-demand at the reward booth.

## My Word for This Project

This project has been a really good experience for me. I have learned to do many things to make this work great. I have dealt with many aspects during the project period, including teamwork, system analysis, database management, API development, problem-solving, and more. It wasn't just about writing code; I also had to design endpoints for the game dev team, who at that moment had no experience with APIs. I found many workarounds to get past the limited Metaverse platform resources and functions.

I want to say thanks to everyone in the project who worked so hard in the hope of our success: the game dev team, BigBang team, 3D model team, architecture team, business team, and more. Special thanks to the project's professors, including Pakaket Wattuya, Pisut Wisessing, Somchoke Rueng-ittinun, and others I haven't mentioned. Also, thanks to my friend who significantly contributed to this repo, [xMickeyS](https://github.com/xMickeyS), who really helped with the UI frontend, and [SoraNual](https://github.com/SoraNual), who was always enthusiastic about the project and really helped with MySQL.

Thank you, everyone.

---

<p style="font-size: 0.8em;">This README was written with the assistance of <a href="https://copilot.github.com/">GitHub Copilot</a>, an AI programming assistant.</p>