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

#### Data sent

- Authentication token
- Parameter: [x]
- Body of the request:
 - [x] title
 - board_id

#### Data returned (status code 201)

- id
- title
- board_id
- sorting

#### Requirements

- Validate the required fields:
 - title
 - board_id
- Validate that the title entered is up to 20 characters long
- Validate that the board_id entered exists in the database
- Validate that the user has not exceeded the limit of 10 cards created per board
- Update the board_update in the database as soon as the data from the request to create a new card is sent to you
- Register the card in the database
 - Remember to record the card's sort number in the database to indicate its position on the page. When the card is created, the sort number assigned to it is the highest of those already stored in the sort column of the card table (remember that the maximum limit for creating cards is 10, so the highest number will be 10). So the last card created will appear in the last position of the board

#### **Examples of successful requests**

```javascript
// POST/card
{
 "title": "Make the week's food"
 "board_id": 1
}
```

#### **Examples of successful response**

```javascript
// HTTP Status Code: 200
{
 "id": 2
 "title": "Make the week's food"
 "board_id": 1
 "sort": 1
}
```

#### **Examples of unsuccessful response**

```javascript
// HTTP Status Code: 401
{
 "message": "You must be logged in to access this resource"
}

// HTTP Status Code: 400
{
 "message": "The title field is required"
}

// HTTP Status Code: 400
{
 "message": "The board_id field is required"
}

// HTTP Status Code: 400
{
 "message": "The card title can only be up to 20 characters long."
}

// HTTP Status Code: 404
{
 "message": "Board not found."
}

// HTTP Status Code: 403
{
 "message": "You cannot create another card on this board, you can only have 10 cards per board."
}
```

### Detail Card: `GET/card/:id`

#### Description: This route is used to retrieve details of a card.

#### Data Sent

- Parameters in the request:
  - id (card id)

#### Requirements

- Retrieve the card details from the database
- Check if the card exists
- Check if the user requesting the card details is the owner of the board to which the card belongs
- Respond with the card details if successful

#### **Successful Response Examples**

```javascript
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

````javascript
// HTTP Status Code: 404
{
    "message": "Card not found."
}

// HTTP Status Code: 403
{
    "message": "Denied access."
}

// HTTP Status Code: 500
{
    "message": "Internal server error"
}

````

### Editing a card: `[PUT] /card/:id`

Description: This is the route that will be used to edit a card.

#### Data sent

- Authentication token
- Parameter: route - ID of the card to be edited
- Body of the request:
 - _title
 - board_id

#### Data returned (status code 200)

- id
- title
- board_id
- sorting

#### Requirements

- Validate that there is a card for the ID entered as url params
- Validate the required fields:
 - title
 - board_id
- Validate that the title entered is up to 20 characters long
- Validate that the board entered exists
- Update the board's update_date in the database as soon as the data from the request to edit a card of yours is sent
- Update the card data in the database
 - Remember to update the card's sort number in the database to indicate its position on the page.

#### **Examples of successful requests**

**Input:**

```javascript=
 {
 board_id: 1,
 title: Card 1
 }
```

**Exit:**

```javascript=
 //status code 200
 {
 id: 1,
 title: Card 1,
 board_id: 1
 sort: 1
 }
```

### Ordenate Cards: `[PUT]/card/ordenation`

#### Description: This route is used to update the ordenation of cards on the board.

#### Request Body Schema

- cardIdSourcePosition: number (required)
- cardIdDestinationPosition: number (required)
- cardId: number (required)

#### ** Validation Errors **

- HTTP Status Code: 400
  - {"message": "The cardIdSourcePosition field is required."}
  - {"message": "The cardIdSourcePosition field cannot be empty."}
  - {"message": "The cardIdSourcePosition field must be a number."}

- HTTP Status Code: 400
  - {"message": "The cardIdDestinationPosition field is required."}
  - {"message": "The cardIdDestinationPosition field cannot be empty."}
  - {"message": "The cardIdDestinationPosition field must be a number."}

- HTTP Status Code: 400
  - {"message": "The cardId field is required."}
  - {"message": "The cardId field cannot be empty."}
  - {"message": "The cardId field must be a number."}

#### **Request Example**

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

#### Data returned (status code 204)

- (No content in Body)

#### Requirements

- Validate that there is a card for the ID entered as url params
- Delete the tasks associated with the card as well, otherwise the database won't allow the card to be deleted.
- Update the sort value of the other cards in the database, as their position will change when a card is deleted.
- Update the board's update_date in the database before the data from your card deletion request is sent (it has to be updated before the deletion, because otherwise it won't be able to pick up which card exists to update your board).
- Delete the card from the database

#### **Examples of successful requests**

**Input:**

```javascript=
 //Id of card passed by Params query
 // DELETE /card/1
```

**Output:**

```javascript=
 // 204 (No Content) = successful request, no content in the response body
```

</details>

<details>

<summary><b>Tasks</b></summary>

### Task creation: `[POST] /task`

Description: This is the route that will be used to create a task on the card.

#### Data sent

- Authentication token
- Parameter (none)
- Body of the request:
 - _title
 - description
 - card_id

#### Data returned (status code 200)

- id
- title
- description
- card_id
- sorting

#### Requirements

- Validate that there is a card for the card_id entered in the body
- Validate the required fields:
 - title
 - card_id
- Validate that the user has not exceeded the limit of 20 tasks created per card
- Validate that the title entered is up to 50 characters long
- If the description is entered, validate that it is up to 1000 characters long
- Update the board's update_date in the database as soon as the data from your card deletion request is sent.
- Create the task in the database
 - Remember to record the task's sort number in the database to indicate the position it occupies on the page. When the task is created, the sort number assigned to it is the highest of those already stored in the sort column of the task table (remember that the maximum limit for creating tasks is 20, so the highest number will be 20). So the last task created will appear in the last position of the card

#### **Examples of successful requests**

**Input

```javascript=
 // POST /task
 {
 title: Task 1,
 description: Do PR,
 }
```

**Exit:**

```javascript=
 //status code 201
 {
 id: 1,
 title: Task 1,
 description: Make PR,
 card_id: 1
 sort: 1
 }
```

### Ordenate Tasks: `[PUT/]card/ordenation`

#### Description: This route is used to reorder tasks within a card.

#### Data Sent

- Body of the request:
  - taskSourceDestination
  - taskSourcePosition
  - cardIdSource
  - cardIdDestination
  - taskId

#### Requirements

- Validate if the taskId exists in the database
- Validate if the cardIdDestination exists in the database
- Validate if the number of tasks for the cardIdDestination is less than 20
- Update the ordenation of the tasks in the database according to the new positions
- Update the update_date of the board in the database if the cardIdSource is different from the cardIdDestination
- Respond with a status code 204 (No Content) on success

#### **Successful Response Examples**

```javascript
// PUT/card/ordenation
{
    "taskSourceDestination": 2,
    "taskSourcePosition": 4,
    "cardIdSource": 1,
    "cardIdDestination": 2,
    "taskId": 1
}
```

### **Unsuccessful Response Examples**

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

#### Data sent

- Authentication token
- Parameter: route - ID of the task to be edited
- Body of the request:
 - title
 - description
 - card_id

#### Data returned (status code 200)

- id
- title
- description
- card_id
- sorting

#### Requirements

- Validate that there is a task for the ID entered as url params
- Validate the required fields:
 - title
 - card_id
- Validate that the title entered is up to 50 characters long
- If the description is entered, validate that it is up to 1000 characters long
- Update the board_update in the database as soon as the data from the request to delete a card of yours is sent
- Update the task data in the database
 - Remember to update the task's sort number in the database

#### **Examples of successful requests**

**Input:**

```javascript=
 //ID passed by query params
 // /task/1
 {
 title: Task 1 updated,
 description: Do PR,
 card_id: 1
 }
```

**Exit:**

```javascript=
 {
 id: 1,
 title: Task 1 updated,
 description: Make PR,
 card_id: 1
 sort: 1
 }
```

### Task detailing: `[GET]/task/:id`

Description: This is the route that will be used to detail/access a task on the card.

#### Data sent

- Authentication token
- Route parameter - ID of the task to be detailed
- Body of the request (No content)

#### Data returned (status code 200)

- id
- title
- description
- card_id
- sorting

#### Requirements

- Validate if there is a task for the ID entered as url params
- Display the task data from the database

#### **Examples of successful requests**

**Input:**

```javascript=
 //Id passed by query params
```

**Output:**

```javascript=
 {
 id: 1,
 title: Task 1 updated,
 description: Do PR,
 card_id: 1,
 sort: 1
 }
```


### Task deletion: `[DELETE] /task/:id`

Description: This is the route that will be used to delete a task from the card.

#### Data sent

- Authentication token
- Route parameter - ID of the task to be deleted
- Body of the request (No content)

#### Data returned (status code 204)

- No content returned (Status code 204)

#### Requirements

- Validate that a task exists for the ID entered as url params
- Update the sort value of the other tasks in the database, since their position will change when a task is deleted.
- Update the board's update_date in the database as soon as the data from your card deletion request is sent (it has to be updated before deletion, because otherwise it won't be able to see which task exists to update your board).
- Delete the task from the database

#### **Examples of successful requests**

**Input:**

```javascript
 //Id passed in query params
 // task/1
```

**Output:**

```javascript
 //No content status code 204
```





</details>
    
</details>

