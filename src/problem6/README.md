## Problem 6

### Documentation

1. Authoriosation: JWT
2. Using redis sorted set for increasing/saving user score
3. Redis sorted set:
   ZSET leaderboard: key = "leaderboard:global", member = user_id, score = cumulative score
   HASH user:<id>:meta (cached metadate needed for display like: user name, age, total tries, ...)
4. User action -> increase score -> check if the score increase get in the top 10 slot
   -> If yes, update the leaderboard and user score (can store user score in database), broadcast the new list to client (FE)
   if no, only update the user score in database
5. Can use websocket for realtime gateway

Flow:

1. Score update triggers event publish (ScoreUpdated).
2. Leaderboard Service recalculates affected ranks (using Redis ZSET rank operations).
3. If top 10 changed OR user newly enters/leaves top 10:
   - Construct leaderboard.update event.
   - Broadcast via Realtime Gateway to subscribers.
