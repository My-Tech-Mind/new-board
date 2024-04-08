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

<!-- <details>

<summary><b>Routers</b></summary>

-->

### Routers

<!-- <details> -->

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

#### Update user route: `[PUT]/user`

Description: This route is used to update the data of a logged-in user in the application.

#### Detail user route: `[GET]/user`

Description: This route is used to show the data of a logged-in user in the application.

#### Delete user route: `[DELETE]/user`

Description: This route is used to delete the data of a logged-in user in the application.

</details>

<!-- <details> -->

<summary><b>Boards</b></summary>

#### Create board route: `[POST]/board`

Description: This route is used to create a board for the logged-in user in the application.

#### Edit board route: `[PUT]/board/:id`

Description: This route is used to edit a board owned by the logged-in user in the application.

#### Detail board route: `[GET]/board/:id`

Description: This route is used to show the data of a board owned by the logged-in user in the application.

#### List boards route: `[GET]/board` or `[GET]/board?favorited=true`

Description: This route is used to show the list of boards (or only the favorited ones), owned by the logged-in user in the application.

#### Delete board route: `[DELETE]/board/:id`

Description: This route is used to delete a board owned by the logged-in user in the application.

</details>

<details>

<summary><b>Cards</b></summary>

</details>

<details>

<summary><b>Tasks</b></summary>

</details>
    
<!-- </details> -->

