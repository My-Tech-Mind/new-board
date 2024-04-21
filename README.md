# New Board

## Introduction

### About the project

- This project is a task manager, in which the user can organize his own tasks in cards and boards. 

- The project was developed by five people from My Tech Mind organization.

### Features

- User creation, update, log-in, detail, and deletion
- Board creation, edition, detail, listing (including filter by favorited or not), and deletion
- Card creation, edition, ordering, and deletion
- Task creation, edition, ordering, and deletion

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

Return data: id, title, favorited, user_id, creation_date, update_date, cards (to, doing, done) with tasks

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
			"ordenation": 1,
			"tasks": []
		},
		{
			"id": 91,
			"title": "doing",
			"board_id": 62,
			"ordenation": 2,
			"tasks": []
		},
		{
			"id": 92,
			"title": "done",
			"board_id": 62,
			"ordenation": 3,
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

<summary><b>Cards</b></summary>

### Card creation: `[POST]/card`

#### Description: This is the route that will be used to create a card on the board.



#### **Example of Body Request (JSON)**

```Json
// POST/card
{
 "title": "Make the week's food",
 "board_id": 1
}
```

##### Example of return

```javascript
// HTTP Status Code: 200
{
 "id": 2
 "title": "Make the week's food"
 "board_id": 1
 "sort": 1
}
```


### Detail Card: `GET/card/:id`

#### Description: This route is used to retrieve details of a card.


#### **Example of Body Request (JSON)**

```jSON
// GET/card/1
{
    "id": 1,
    "title": "Task 1",
    "board_id": 1,
    "order": 1,
    "created_at": "2022-04-25T10:15:30.000Z",
    "updated_at": "2022-04-25T10:15:30.000Z"
}
```
### ##### Example of return

````javascript
// HTTP Status Code: 404
{
    "message": "Card not found."
}

// HTTP Status Code: 403
{
    "message": "Denied access."
}

````

### Editing a card: `[PUT] /card/:id`

Description: This is the route that will be used to edit a card.


##### Example of Body Request (JSON)

```Json
 {
 "board_id": 1,
 "title": "Card 1"
 }
```

##### Example of return

```Json
 //status code 200
 {
 "id": 1,
 "title": "Card 1",
 "board_id": 1,
 "sort": 1
 }
``` 

### Ordenate Cards: `[PUT]/card/ordenation`

#### Description: This route is used to update the ordenation of cards on the board.

##### Example of Body Request (JSON)

````Json
{
  "cardSourcePosition": 3,
  "cardDestinationPosition": 1,
  "cardId": 5
}


````

##### Example of return


````javaScript
// HTTP Status Code: 404
{
    "message": "Card not found."
}

// HTTP Status Code: 500
{
    "message": "Internal server error"
}


````


### Deleting a card: `[DELETE] /card/:id`

Description: This is the route that will be used to delete a card.

#### Data sent

- Authentication token
- Parameter: route - ID of the card to be deleted



##### Example of Body Request (JSON)

```javascript
 //Id of card passed by Params query
 // DELETE /card/1
```

##### Example of return

```javascript
// HTTP Status 204
// No content in the return
```

</details>

<details>

<summary><b>Tasks</b></summary>

### Task creation: `[POST] /task`

Description: This is the route that will be used to create a task on the card.


##### Example of Body Request (JSON)

```Json
 // POST /task
 {
 "title": "Task 1",
 "description": "Do PR",
 }
```

##### Example of return

```Json
 //status code 201
 {
 "id": 1,
 "title": "Task 1",
 "description": "Make PR",
 "card_id": 1,
 "sort": 1
 }
```

### Ordenate Tasks: `[PUT/]task/ordenation`

#### Description: This route is used to reorder tasks within a card.


##### Example of Body Request (JSON)

```Json
// PUT/card/ordenation
{
    "taskSourceDestination": 2,
    "taskSourcePosition": 4,
    "cardIdSource": 1,
    "cardIdDestination": 2,
    "taskId": 1
}
```

##### Example of return

````javascript

// HTTP Status Code: 200
// No content


````

```JavaScript
// HTTP Status Code: 404
{
    "message": "Task not found."
}

// HTTP Status Code: 404
{
    "message": "Card with cardIdDestination = 2 was not found."
}

// HTTP Status Code: 403
{
    "message": "Alert: The maximum number of tasks (20) for this card has been reached. New tasks cannot be added to this card due to this limit."
}

// HTTP Status Code: 500
{
    "message": "Internal server error"
}



```




### Task editing: `[PUT]/task/:id`

Description: This is the route that will be used to edit a task on the card.

##### Example of Body Request (JSON)

```Json

 // PUT/task/1
 {
 "title": "Task 1 updated",
 "description": "Do PR",
 "card_id": 1
 }
```

##### Example of return

```Json
 {
 "id": 1,
 "title": "Task 1 updated",
 "description": "Make PR",
 "card_id": 1,
 "sort" : 1
 }
```

### Task detailing: `[GET]/task/:id`

Description: This is the route that will be used to detail/access a task on the card.

##### Example of Body Request (JSON)

```javascript
 // GET/task/1
 // No content in body

```

##### Example of return

```Json
 {
 "id": 1,
 "title": "Task 1 updated",
 "description": "Do PR",
 "card_id": 1,
 "sort": 1
 }
```


### Task deletion: `[DELETE] /task/:id`

Description: This is the route that will be used to delete a task from the card.


**Input:**

```javascript

 // DELETEtask/1
 // No content in the request body

```







</details>
    
</details>

