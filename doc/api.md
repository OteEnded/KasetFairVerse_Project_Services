## Game's Database API

For game development teams, this is how you store user progress to the central database, retrieve user progress for further processing, or even get the user's scoreboard for the game.

I have set up API keys for each game and sent them out to each game dev team. If you have any questions about the API or need an API key, you can contact me directly (I prefer Discord, but feel free to reach me through other means).

### API Routes Structure

First, take a look at the URL route structure. The API routes follow the structure: `{protocol_name}://{host_name}:{optional_port_number}/{zone_name}/{game_name}/{function_name}/{filter}/{value}`

- `{protocol_name}`: The protocol used (e.g., http, https).
- `{host_name}`: The host name or IP address of the server.
- `{optional_port_number}`: The optional port number (default: 80).
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

### Available Functions

Every game has the following functions:

- **get**: Returns player score transactions.
  - **Available filters**: `user_id`, `round_id`
- **save**: Saves the player's score for a round of the game to the database.
- **delete**: Deletes a score transaction, must be used with a filter.
  - **Filter**: `round_id`

Some games have additional functions:

- **get_leaderboard**: Returns the leaderboard in the form of a list of users and scores.
  - **Filter**: `range`
- **get_win_amount**: Returns how many times the user has won the game, must be used with a filter.
  - **Filter**: `user_id`
- **get_find**: Returns scoring transactions by filtering by column and value.
  - **Filter**: `column-value`
- **get_sum_score**: Returns the sum of scores that the user has obtained, must be used with a filter.
  - **Filter**: `user_id`
- **get_high_score**: Returns the high score of the user, must be used with a filter.
  - **Filter**: `user_id`
- **get_highest_score**: Returns the highest score from every record.
- **get_playlife**: Returns how many play lives the user has remaining, must be used with a filter.
  - **Filter**: `user_id`
- **offset_playlife**: Updates the user's play life, used to add or take play life from a user, must be used with a filter.
  - **Filter**: `user_id`
- **get_number_of_ending**: Returns how many endings the user has achieved in the game, must be used with a filter.
  - **Filter**: `user_id`
- **get_progress**: Returns the number of different endings that the user has achieved, must be used with a filter.
  - **Filter**: `user_id`

Modify the placeholders `{protocol_name}`, `{host_name}`, `{zone_name}`, `{game_name}`, `{function_name}`, `{filter}`, and `{value}` in the examples with the appropriate values according to your setup.