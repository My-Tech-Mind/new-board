# New Board - Gerenciador de tarefas

# New Board

## Introduction

### About the project

- This project is a task manager, in which the user can organize his own tasks in cards and boards. 

- The project was developed by five people from My Tech Mind organization.

### Features

- User creation, update, log-in, detail, and deletion
- Board creation, edition, detail, listing (including filter by favorited or not), and deletion
- Card creation, edition, detail, ordering, and deletion
- Task creation, edition, detail, ordering, and deletion

### Technologies

#### Languages

- JavaScript
- SQL

#### Platforms

- Node.js
- PostgreSQL

#### Libraries

- Bcrypt
- Cors
- Date-fns
- Express
- Joi
- Jsonwebtoken
- Knex
- Pg

#### External API'S

- Supabase (for database)
- Render (for deployment)

### Run project

#### Remote run

Deploy link: https://new-board-54mj.onrender.com

#### Local run

##### Requirements

- Node installed on your machine
- npm installed on your machine

##### Preparation

1) Clone the repository: `git clone git@github.com:My-Tech-Mind/new-board.git`

2) Navigate to the project directory: `cd new-board`

3) Navigate to the backend directory: `cd backend`

4) Install dependencies: `npm install`


##### Execution

Run the development server: `npm run dev`

## More Details

<details>

<summary><b>Database</b></summary>

-   users
    - id
    - name 
    - email
    - password

-   boards
    - id
    - title
    - favorited
    - user_id
    - creation_date
    - update_date

-   cards
    - id
    - title
    - board_id
    - ordenation

-   tasks
    - id
    - title
    - description
    - card_id
    - ordenation

</details>

<details>

<summary><b>Routers</b></summary>

<details>

<summary><b>Users</b></summary>

#### Create user route: `[POST]/user`

Description: This route is used to create a user in the application.

Sent data: name, email, password

Return data: id, name, email

##### Example of Body Request (JSON)

```javascript
// POST/user
{
    "name": "testuser",
    "email": "testuser@email.com",
    "password": "*Testtest1"
}
```

##### Example of return

```javascript
// HTTP Status 201
{
    "id": 1,
    "name": "testuser",
    "email": "testuser@email.com",
}
```

#### Login user route: `[POST]/login`

Description: This route is used to log in a user in the application.

Sent data: email, password

Return data: user (id, name, email), token

##### Example of Body Request (JSON)

```javascript
// POST/login
{
    "email": "testuser@email.com",
    "password": "*Testtest1"
}
```

##### Example of return

```javascript
// HTTP Status 200
{
    "user": {
        "id": 1,
        "name": "testuser",
        "email": "testuser@email.com"
    },
    "token":
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNzEyMjczMDg3LCJleHAiOjE3MTIzNTk0ODd9.geQfWbB2iEPXFH7rUMD_6MtMEDk1Ej_SLJKL7U9TwjA"
}
```
## All the subsquent routes need authentication

#### Update user route: `[PUT]/user`

Description: This route is used to update the data of a logged-in user in the application.

Sent data: name, email, password

Return data: id, name, email

##### Example of Body Request (JSON)

```javascript
// PUT/user
{
    "name": "testuser1",
    "email": "testuser1@email.com",
    "password": "*Testtest1"
}
```

##### Example of return

```javascript
// HTTP Status 200
{
    "id": 1,
    "name": "testuser1",
    "email": "testuser1@email.com",
}
```

#### Detail user route: `[GET]/user`

Description: This route is used to show the data of a logged-in user in the application.

Sent data: N/A

Return data: id, name, email

##### Example of Body Request (JSON)

```javascript
// GET/user
// No content in the request body
```

##### Example of return

```javascript
// HTTP Status 200
{
    "id": 1,
    "name": "testuser1",
    "email": "testuser1@email.com",
}
```

#### Delete user route: `[DELETE]/user`

Description: This route is used to delete the data of a logged-in user in the application.

Sent data: N/A

Return data: N/A

##### Example of Body Request (JSON)

```javascript
// DELETE/user
// No content in the request body
```

##### Example of return

```javascript
// HTTP Status 204
// No content in the return
```

</details>

<details>

<summary><b>Boards</b></summary>

#### Create board route: `[POST]/board`

Description: This route is used to create a board, with the initial cards cards (to, doing, done), for the logged-in user in the application.

Sent data: title, favorited

Return data: id, title, favorited, user_id, creation_date, update_date, cards (to, doing, done) with tasks []

##### Example of Body Request (JSON)

```javascript
// POST/board
{
    "title": "Week tasks",
    "favorited": "false"
}
```

##### Example of return

```javascript
// HTTP Status 201
{
	"id": 62,
	"title": "Week tasks",
	"favorited": false,
	"user_id": 9,
	"creation_date": "2024-04-15 20:37:47",
	"update_date": "2024-04-15 20:37:47",
	"cards": [
		{
			"id": 90,
			"title": "to do",
			"board_id": 62,
			"ordenation": 0,
			"tasks": []
		},
		{
			"id": 91,
			"title": "doing",
			"board_id": 62,
			"ordenation": 1,
			"tasks": []
		},
		{
			"id": 92,
			"title": "done",
			"board_id": 62,
			"ordenation": 2,
			"tasks": []
		}
	]
}
```

#### Edit board route: `[PUT]/board/:id`

Description: This route is used to edit a board owned by the logged-in user in the application.

Sent data: title, favorited

Return data: id, title, favorited, user_id, creation_date, update_date

##### Example of Body Request (JSON)

```javascript
// PUT/board/1
{
    "title": "Week tasks",
    "favorited": "true"
}
```

##### Example of return

```javascript
// HTTP Status 200
{
    "id": 1,
    "title": "Week tasks",
    "favorited": "true",
    "user_id": 2,
    "creation_date": "2024-03-23 15:21:57",
    "update_date": "2024-03-24 10:43:25"
}
```

#### Detail board route: `[GET]/board/:id`

Description: This route is used to show the data of a board owned by the logged-in user in the application.

Sent data: N/A

Return data: id, title, favorited, user_id, creation_date, update_date, cards (id, title, board_id, ordenation) with tasks (id, title, description, card_id, ordenation)

##### Example of Body Request (JSON)

```javascript
// GET/board/1
// No content in the request body
```

##### Example of return

```javascript
// HTTP Status 200
{
    "id": 1,
    "title": "Week tasks",
    "favorited": "true",
    "user_id": 2,
    "creation_date": "2024-03-23 15:21:57",
    "update_date": "2024-03-24 10:43:25",
    "cards": [
        {
        "id": 1,
        "title": "Home",
        "board_id": 1,
        "ordenation": 1,
        "tasks": [
            {
            "id": 1,
            "title": "Food",
            "description": "Prepare the week's meals",
            "card_id": 1,
            "ordenation": 1
            },
            {
            "id": 2,
            "title": "Cleaning",
            "description": "Clean the house",
            "card_id": 1,
            "ordenation": 2
            }
            ]
        },
        {
        "id": 2,
        "title": "Others",
        "board_id": 1,
        "ordenation": 2,
        "tasks": []
        }
    ]
}
```

#### List boards route: `[GET]/board` or `[GET]/board?favorited=true`

Description: This route is used to show the list of boards (or only the favorited ones), owned by the logged-in user in the application.

Sent data: N/A

Return data: boards owned by the logged-in user

##### Example of Body Request (JSON)

```javascript
// GET/board
// No content in the request body
```

##### Example of return

```javascript
// HTTP Status 200
[
    {
        "id": 1,
        "title": "Week tasks",
        "favorited": "true",
        "user_id": 2,
        "creation_date": "2024-03-23 15:21:57",
        "update_date": "2024-03-24 10:43:25"
    },
    {
        "id": 2,
        "title": "Monthly commitments",
        "favorited": "true",
        "user_id": 2,
        "creation_date": "2024-04-01 14:28:32",
        "update_date": "2024-04-01 14:28:32"
    }
]
```

#### Delete board route: `[DELETE]/board/:id`

Description: This route is used to delete a board owned by the logged-in user in the application.

Sent data: N/A

Return data: N/A

##### Example of Body Request (JSON)

```javascript
// DELETE/board/1
// No content in the request body
```

##### Example of return

```javascript
// HTTP Status 204
// No content in the return
```

</details>

<details>

<summary><b>Ordenate Cards</b></summary>

#### Ordenate card route: `[POST]/card/ordenation`

Description: This route is used to change the ordenation number (position) of a card owned by the logged-in user in the application.

Sent data: cardId, cardSourcePosition, cardDestinationPosition

Return data: N/A

##### Example of Body Request (JSON)

```javascript
// PUT/card/ordenation
{
    "cardSourcePosition": 6,
	"cardDestinationPosition": 3,
	"cardId": 87
}
```

##### Example of return

```javascript
// HTTP Status 204
// No content in the return
```
</details>

<details>

<summary><b>Ordenate Tasks</b></summary>

#### Ordenate task route: `[POST]/task/ordenation`

Description: Description: This route is used to change the ordenation number (position) of a task owned by the logged-in user in the application.

Sent data: taskSourcePosition, taskDestinationPosition, cardIdDestination, cardIdSource, taskId

Return data: N/A

##### Example of Body Request (JSON)

```javascript
// POST/task/ordenation
{
	"taskSourcePosition": 2,
    "taskDestinationPosition": 3,
	"cardIdDestination": 96,
	"cardIdSource": 97,
	"taskId": 102
}
```

##### Example of return

```javascript
// HTTP Status 204
// No content in the return
```

</details>

<details>

<summary><b>Cards</b></summary>

#### Card creation route: `[POST]/card`

Description: This route is used to create a card on the board owned by the logged-in user in the application.

Sent data: title, board_id

Return data: id, title, board_id, ordenation, tasks of the card (starts with [])

##### Example of Body Request (JSON)

```javascript
// POST/card
{
    "title": "test cards",
    "board_id": "64"
}
```

##### Example of return

```javascript
// HTTP Status 201
{
	"id": 110,
	"title": "test cards",
	"board_id": 64,
	"ordenation": 4,
	"tasks": []
}
```

#### Card edition route: `[PUT]/card/:id`

Description: This route is used to edit a card owned by the logged-in user in the application.

Sent data: title, board_id

Return data: id, title, board_id, ordenation, tasks of the card

##### Example of Body Request (JSON)

```javascript
// PUT/card/96
{
    "title": "Random tasks",
    "board_id": "61"
}
```

##### Example of return

```javascript
// HTTP Status 200
{
	"id": 96,
	"title": "Random tasks",
	"board_id": 61,
	"ordenation": 3,
	"tasks": [
		{
			"id": 102,
			"title": "Go to the gym",
			"description": "Observation: before the lunch",
			"card_id": 96,
			"ordenation": 0
		},
		{
			"id": 103,
			"title": "Buy groceries",
			"description": "Don't forget the fruits",
			"card_id": 96,
			"ordenation": 1
		},
		{
			"id": 104,
			"title": "Feed the cat",
			"description": "Observation: before the afternoon",
			"card_id": 96,
			"ordenation": 2
		}
	]
}
```

#### Detail card route: `[GET]/card/:id`

Description: This route is used to detail a card owned by the logged-in user in the application.

Sent data: N/A

Return data: id, title, board_id, ordenation, tasks of the card

##### Example of Body Request (JSON)

```javascript
// GET/card/96
// No content in the request body
```

##### Example of return

```javascript
// HTTP Status 200
{
	"id": 96,
	"title": "Random tasks",
	"board_id": 61,
	"ordenation": 3,
	"tasks": [
		{
			"id": 102,
			"title": "Go to the gym",
			"description": "Observation: before the lunch",
			"card_id": 96,
			"ordenation": 0
		},
		{
			"id": 103,
			"title": "Buy groceries",
			"description": "Don't forget the fruits",
			"card_id": 96,
			"ordenation": 1
		},
		{
			"id": 104,
			"title": "Feed the cat",
			"description": "Observation: before the afternoon",
			"card_id": 96,
			"ordenation": 2
		}
	]
}
```

#### Delete card route: `[DELETE]/card/:id`

Description: This route is used to delete a card owned by the logged-in user in the application.

Sent data: N/A

Return data: N/A

##### Example of Body Request (JSON)

```javascript
// DELETE/card/45
// No content in the request body
```

##### Example of return

```javascript
// HTTP Status 204
// No content in the return
```

</details>

<details>

<summary><b>Tasks</b></summary>

#### Task creation route: `[POST]/task`

Description: This route is used to create a task on the card owned by the logged-in user in the application.

Sent data: title, description, card_id

Return data: id, title, description, card_id, ordenation

##### Example of Body Request (JSON)

```javascript
// POST/task
{
    "title": "Review annotations",
    "description": "Read portuguese and math annotations "
    "card_id": "96"
}
```

##### Example of return

```javascript
// HTTP Status 201
{
	"id": 104,
	"title": "Review annotations",
	"description": "Read portuguese and math annotations ",
	"card_id": 96,
	"ordenation": 2
}
```

#### Task edition route: `[PUT]/task/:id`

Description: This route is used to edit a task owned by the logged-in user in the application.

Sent data: title, description, card_id

Return data: id, title, description, card_id, ordenation

##### Example of Body Request (JSON)

```javascript
// PUT/task/80
{
    "title": "Do the homework",
	"description": "Finish at least 5 exercises",
	"card_id": 45
}
```

##### Example of return

```javascript
// HTTP Status 200
{
	"id": 80,
    "title": "Do the homework",
	"description": "Finish at least 5 exercises",
	"card_id": 45
	"ordenation": 2
}
```

#### Detail task route: `[GET]/task/:id`

Description: This route is used to detail a task owned by the logged-in user in the application.

Sent data: N/A

Return data: id, title, description, card_id, ordenation

##### Example of Body Request (JSON)

```javascript
// GET/task/80
// No content in the request body
```

##### Example of return

```javascript
// HTTP Status 200
{
	"id": 80,
    "title": "Do the homework",
	"description": "Finish at least 5 exercises",
	"card_id": 45
	"ordenation": 2
}
```

#### Delete task route: `[DELETE]/task/:id`

Description: This route is used to delete a task owned by the logged-in user in the application.

Sent data: N/A

Return data: N/A

##### Example of Body Request (JSON)

```javascript
// DELETE/task/78
// No content in the request body 
```

##### Example of return

```javascript
// HTTP Status 204
// No content in the return
```
</details>

</details>