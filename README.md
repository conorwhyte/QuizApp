# Quiz App
A quiz app that can create a quiz with a number of different genres and difficulties. 

### Workflow pre-play
- Pulls down X number of questions from the quiz API. 
- Store it in the store as potential questions. 
- Pull down the first 100 questions from the QuizApp API DynamoDB table. Should be filtered by tag of genre by either API call or the browser itself.
- Compare these questions, in a clever way, against the current potential questions. If one does not exist in DynamoDB table, save in the Store as the question to be saved to the DynamoDB table. 
- Once the quota has been reached, generate the quiz on the client side.

### Workflow post-play
- Allow the users to play through the quiz, storing the percentage of questions they get correct. 
- Once complete, show the user the score. 
- When showing that. Save the quiz to the store as a new quiz, and save the score of that user in an array. 
- Bring the user back to the main page. 

## Technologies 
- React 16
- Redux
- Parcel
- Trivia API 
- AppSync