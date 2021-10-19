# Prerequisites

**USER TYPES**: donor, merchant, youth

# Frontend

### `/`: Homepage

**Description**: This is the root directory and homepage of our website.
**Authorization**: All user types are authorized to view this page (including unregistered users).
**Miscellaneous**:

- Users will be able to browser through profiles of homeless youths registered on the site.
- Serves as the base route that other routes will redirect unauthorized users to.

### `/login`: Login page

**Description**: This is the login page where all types of users will be able to login.
**Authorization**: Unregistered users are only authorized to view this page (logged in users are redirected to `/`).
**Miscellaneous**:

- Users will have access to a link to `/login` (in the header) if they are not logged in.
- `POST` requests are used in order to securely transfer credentials to the backend `/api/v1/user/login` endpoint.
- Error handling is done purely server side (for security) and toast notifications provide optimal user experience.

### `/signup`: Signup page

**Description**: This is the login page where all types of users will be able to login.
**Authorization**: Unregistered users are only authorized to view this page (logged in users are redirected to `/`).
**Miscellaneous**:

- Users will have access to a link to `/signup` (in the header) if they are not logged in.
- `POST` requests are used in order to securely transfer details to the backend `/api/v1/:user_type/signup` endpoint.
- Error handling is done purely server side (for security) and toast notifications provide optimal user experience.
- Successful signup will redirect users to their default page (donors -> `/`, youths -> `/store`, merchants -> `/profile`).

### `/profile`: Signup page (NOT DONE)

**Description**: This is the profile page where all types of users will be able to edit details on their account.
**Authorization**: All logged in users are authorized to view this page (unregistered users are redirected to `/`).
**Miscellaneous**:

- Users will have access to a link to `/profile` (in the header) if they are logged in.
- Users will be able to edit their respective profile information (e.g., youths may modify their story, saving plan, etc.).
- Every user type will have a dynamically rendered page showing controls for their specific user type.
- `POST` requests (or `PATCH` is also appropriate) will be used to send data to the backend.

### `/store`: Store page (NOT DONE)

**Description**: This is the store page where users will be able to browser through products uploaded by merchants.
**Authorization**: Only youth users are authorized to view this page (all other users are redirected to `/`).
**Miscellaneous**:

- Youths will have access to a link to `/store` (in the header) if they are logged in as a youth.
- Youths will be able to browse offered goods and services from merchants (and categorize, filter, etc.).
- `GET` requests will be used to obtain the listings from the backend.

# Backend

### `POST /api/v1/login` : Login endpoint

**Description**: This is the login endpoint where all user types will be able to authenticate themselves will receiving authorization.
**Request Fields** Only authentication fields (detailed below) are required.
**Authentication**: Requests must pass their username and password as a JSON payload.
**Authorization**: No authorization required.
**Responses**:

- `200`: user has correct credentials and a JWT token is passed back (authorization is included as a `role` field).
- `400`: bad request signal when request is malformed, does not contain the required fields, etc. (error sent as response)
- `401`: user cannot be authenticated and an appropriate message is passed back to indicate the specific error.
- `500`: unknown internal server error.

### `POST /api/v1/:user_type/signup`: Signup endpoint

**Description**: These are the signup endpoints where all users will be able to create an account.
**Request Fields**: Each signup form has different fields for their specific signup process (error messages detail missing fields).
**Authentication**: No authentication required.
**Authorization**: No authorization required.
**Responses**:

- `201`: user was successfully created and a JWT token is passed back (authorization is included as a `role` field).
- `400`: bad request signal when request is malformed, does not contain the required fields, etc. (error sent as response)
- `500`: unknown internal server error.

### `GET /api/v1/validate`: Validate endpoint

**Description**: This is the validate endpoint where all user types can validate (in terms of expiration, format, etc.) their JWT token.
**Request Fields** Only authorization fields (detailed below) are required.
**Authentication**: No authentication required.
**Authorization**: Requests must pass their JWT token as a `Authorization` header (bearer format is preferable).
**Responses**:

- `200`: user has a valid token and an appropriate message is passed back.
- `401`: user has an invalid token and an appropriate message is passed back.
- `500`: unknown internal server error.
