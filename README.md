# Project Title

A Node/Express based backend app which persists data on a remote MongoDB database allowing users to create quiz questions, get quiz questions, and submit quiz answers

## Prerequisites
* Nodejs Version 9.5.0
* npm Version 5.6.0
* Mongodb Version 3.6.2

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

```
1. git clone git@github.com:qwertwerty21/Form-test-backend.git
2. cd Form-test-backend
3. Create .env file in the root directory (Ask me for env variables)
3. npm install 
4. npm start
```
## API Features

### Create a Quiz Question: `[POST]localhost:3001/question`
**Sample Request Data:**
```
{
	"questionText":"What is a CRM? What are the greatest benefits of using a CRM?"
}
```
**Sample Response Data:**
```
{
    "questionText": "What is a CRM? What are the greatest benefits of using a CRM?",
    "timeLimitInSec": 180,
    "_id": "5a89fd8f55e5631e6da5641b",
    "created": "2018-02-18T22:26:23.386Z",
    "updated": "2018-02-18T22:26:23.386Z",
    "__v": 0
}
```
**Get All Quiz Questions**: `[GET]localhost:3001/question`
**Sample Request Data:**
```
none
```
**Sample Response Data:**
```
[
    {
        "questionText": "In your career thus far, what has been your favorite job and least favorite job and why?",
        "timeLimitInSec": 180,
        "_id": "5a89fd2f55e5631e6da56417",
        "created": "2018-02-18T22:24:47.655Z",
        "updated": "2018-02-18T22:24:47.655Z",
        "__v": 0
    },
    {
        "questionText": "What do you hope to be doing professionally five years from now?",
        "timeLimitInSec": 180,
        "_id": "5a89fd4255e5631e6da56418",
        "created": "2018-02-18T22:25:06.301Z",
        "updated": "2018-02-18T22:25:06.301Z",
        "__v": 0
    },
    ...
 ]
```
**Submit a Quiz Answer**: `[POST]localhost:3001/question/:questionID/answer`
**Sample Request Data:**
```
{
	"userID": "fdsa78fd9sa",
	"questionID": "5a89fd8f55e5631e6da5641b",
	"answerText": "test thing"
}
```
**Sample Response Data:**
```
{
    "answerText": "test thing",
    "_id": "5a89ffbbc78ea831403907c5",
    "userID": "fdsa78fd9sa",
    "questionID": "5a89fd8f55e5631e6da5641b",
    "created": "2018-02-18T22:35:39.375Z",
    "updated": "2018-02-18T22:35:39.375Z",
    "__v": 0
}
```
