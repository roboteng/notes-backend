# Notes

A RESTful API to manange notes

- Notes are created in markdown, and can be tagged with tags to group notes
  together.
- Provides authenitcation support so users can't see other users' notes.

## Setup

Run `npm install` or `npm i` to download dependencies.

All scripts can be found in the [package.json](./package.json), but some are
highlighted here

### Testing

To run all test files through Jest, and generate a coverage report, run
`npm test`.

### Running the Server

To start the server, run `npm start`.

## Authenticaion state

The server keeps track of users and authentication with session cookies.
When a user first contacts the server, it asks the client to store a `connect.sid` cookie.
Every subsequent response to the server should have this session cookie, so it knows what user its talking to.
This means that after logging in, the client only needs to send the cookie (which should happen by default),
back to the server, and doesn't need to keep sending the username/password combination.

## Routes

### `/`

#### GET

Used to ping the server, not strcitly neccessary

##### Request parameters

None

##### Response

`"ok"`

### `/register`

#### POST

Registers a new user, and logs that user in

##### Request parameters

| Parameter | Type   |
|-----------|--------|
| username  | string |
| email     | string |
| password  | string |

##### Response

201

```typescript
{
  username: string,
  email: string,
}
```

### `/login`

#### POST

Logs in an existing user, even if the user is already logged in

##### Request parameters

| Parameter | Type   |
|-----------|--------|
| username  | string |
| password  | string |

##### Response

201

```typescript
{
  username: string,
  email: string,
}
```

### `/lgout`

#### POST

Ensures that the user is logged out.  If the user is logged in, they are logged out. If the user was already logged out, then nothing happens.

##### Request parameters

None

##### Response

200
