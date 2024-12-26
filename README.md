# Domo nodejs(gateway,GraphQL) and go endpoint(FiberAPI)

This project is a GraphQL server implemented with Express.js, integrating with an external REST API (Fiber) using Axios for CRUD operations. The server uses `@graphql-tools/schema` to define the schema and resolvers.

## Features

- **GraphQL API**: Query and mutate user data using GraphQL.
- **CRUD Operations**: Create, Read, Update, and Delete user data.
- **Axios Integration**: Communicates with an external REST API.
- **GraphiQL Interface**: Interactive GraphQL playground for testing queries and mutations.

---

## Prerequisites

- Node.js (v14+ recommended)
- npm (v6+)
- Fiber API (or any REST API compatible with the specified endpoints)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pangdfg/Domo-nodejs-gateway-go-endpoint-.git
   cd Domo-nodejs-gateway-go-endpoint-
   ```

2. Install dependencies:

   ```bash
   cd node-app
   npm install
   ```


## Usage

1. Start the with docker-compose:

   ```bash
   docker-compose up --build -d
   ```

2. Open the GraphQL playground:

   - Navigate to [http://localhost:4000/graphql](http://localhost:4000/graphql).

3. Run the following sample queries and mutations.

### Queries

#### Fetch all users:

```graphql
query {
  users {
    id
    name
  }
}
```

#### Fetch a user by ID:

```graphql
query {
  user(id: "123") {
    id
    name
  }
}
```

### Mutations

#### Create a new user:

```graphql
mutation {
  createUser(input: { name: "John Doe" }) {
    id
    name
  }
}
```

#### Update a user:

```graphql
mutation {
  updateUser(id: "123", input: { name: "Jane Doe" }) {
    id
    name
  }
}
```

#### Delete a user:

```graphql
mutation {
  deleteUser(id: "123")
}
```

---


## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **GraphQL**: API query language.
- **Axios**: HTTP client for making requests to the Fiber API.
- **@graphql-tools/schema**: Tool for creating GraphQL schemas.

---

