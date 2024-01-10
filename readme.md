# KasetFairVerse Project - Database/BackEnd/API

ExpressJS is just a name, but this project doesn't strictly follow the framework format. This might cause confusion for those who are new to the project, including the developers working on it.

The project doesn't include a config file on GitHub (I use config instead of .env). However, there is a config-example file that demonstrates the structure. If you need the actual config file, I will provide it to you via Discord (if I haven't forgotten).

Big Bang Theory Staff request for node major version 18.x.x

## To run the project

1. Clone the project
2. Run `npm install` to install all dependencies
3. Run `npm start` to start the project

## Game API Routes

This document outlines the API routes and their usage for interacting with game-related functionalities.

### API Routes Structure

The API routes follow the structure:
{protocol_name}://{host_name}:{optional_port_number}/{zone_name}/{game_name}/{function_name}/{filter}/{value}


- `{protocol_name}`: The protocol used (e.g., `http`, `https`).
- `{host_name}`: The host name or IP address of the server.
- `{optional_port_number}`: The optional port number (default: `80`).
- `{zone_name}`: Name of the zone in the game.
- `{game_name}`: Name of the game.
- `{function_name}`: Name of the specific function or action.
- `{filter}`: Optional filter parameter.
- `{value}`: Optional value parameter (if no filter specified).

### Examples

#### Get High Score
- To retrieve the high score of a specific user from a game in a zone:
    - **HTTP Method:** GET
    - **Endpoint:** `/{game_name}/{zone_name}/get_high_score/{filter}/{value}`
    - **Example:**
      ```http
      GET http://{host_name}/{game_name}/{zone_name}/get_high_score/user_id/1
      ```
    - **Response:**
      ```json
      {
          "is_success": true,
          "message": "High scores of {game_name}_{zone_name}_PlayRecords with user_id: 1",
          "status": 200,
          "content": 1080
      }
      ```

#### Get Leaderboard
- To retrieve the leaderboard of a game in a zone:
    - **HTTP Method:** GET
    - **Endpoint:** `/{zone_name}/{game_name}/get_leaderboard`
    - **Example:**
      ```http
      GET http://{host_name}/{zone_name}/{game_name}/get_leaderboard
      ```
    - **Response:**
      ```json
      {
          "is_success": true,
          "message": "{zone_name}_{game_name}_PlayRecords leaderboard",
          "status": 200,
          "content": [
              {
                  "user_id": 2,
                  "win_count": 4
              },
              {
                  "user_id": 1,
                  "win_count": 2
              }
          ]
      }
      ```

#### Save Play Record
- To save a play record in a game within a specific zone:
    - **HTTP Method:** PUT
    - **Endpoint:** `/{zone_name}/{game_name}/save`
    - **Example:**
      ```http
      PUT http://{host_name}/{zone_name}/{game_name}/save
      ```
    - **Request Body:**
      ```json
      {
          "user_id": 1,
          "score": 100
      }
      ```
    - **Response:**
      ```json
      {
          "is_success": true,
          "message": "New {game_name}_{zone_name}_PlayRecord created",
          "status": 200,
          "content": {
              "user_id": 1,
              "score": 100,
              "round_id": 1
          }
      }
      ```

Modify the placeholders `{protocol_name}`, `{host_name}`, `{zone_name}`, `{game_name}`, `{function_name}`, `{filter}`, and `{value}` in the examples with the appropriate values according to your setup.
