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

```json
{
  username: string,
  email: string,
}
```

### `/login`

#### POST

Logs in an existing user

##### Request parameters

| Parameter | Type   |
|-----------|--------|
| username  | string |
| password  | string |

##### Response

201

```json
{
  username: string,
  email: string,
}
```
