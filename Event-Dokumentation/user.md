## Backend

### Table of Contents

1. [DB setup](#db-setup)
2. [Middleware](#middleware)
3. [User](#user)
4. [Friend](#friend)

### DB setup

First we setup the MongoDB collection and connections. Then we moveon to VSC where we setup the .env setup the db.ts file.

**Mongo db:**
Documentation coming soon

**.env and db**

1. The .env contains sensetive informations such as the MongoDB connection strings and the JWT secret key that was generated.

![.env](./DocumentationImages/.env.png)

- We can generate the JWT secret key by runing the following code in the terminal:

```
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

- The result will be something like this:

![Generate JWT Key](./DocumentationImages/genJWT.png)

- The JWT is to be kept secrue and if compromised is to be changed.If changed all users verfied with old JWT will be logedout and would require to login again.

- A dotenv package was used to load the above variables into the process.env, as follows:

```
dotenv.config();
const port = process.env.PORT || 3000;
```

2. Database connection (`db.ts`):

In this file we iniciate the connection to MongoDB.

- We import dotenv from dotenv and then load the environment variables from the .env file by the follwing code in our db.ts file:

```
 dotenv.config();
```

- We make a function to establish the connection to the db:

```
const connectSportDB = async () => {
  try {
    const mongoURI: string = process.env.MONGODB_URL || "";
    await connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err: any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};
```

- How the function works is that we first get the connection string from the .env by using the variable (process.env.MONGODB_URL). Next the connect function from mongoose module attempts to make a connection to database. When connection is successful, we get a message in the console. If not successful we get appropriate error message with faluire status.

- Finally, the export it as the default export of the module is used to export the function:

```
export default connectSportDB();
```

- That will allow us to import the module and the function that is connectSportDB will be called and connection established to DB.

### Middleware

In this middleware we use a rolebased authoraziton and user authentication.

- We export interface CustomRequest interface which extends the Request interface which is built-in Express interface. We add the user and token properties to let us access them from the request object.

```
export interface CustomRequest extends Request {
  user?: IUser;
  token?: string;
}
```

- The decoded token with the \_id field that is a string is from the user in the database that helps us so we can use it to find the user in the database.

```
interface DecodedToken {
  _id: string;
}
```

- Now we have the auth function where we export the auth function. It is an asynchronous function that takes req, res, and next as arguments.The req is the request object, res is the response object, and next is a callback function that calls the next middleware function. We use the cutomRequest interface from above to define the req object because we want to add the user and token properties to it. And in the res object we use the Response interface from express to define the res object. As for the next function assigned to the next parameter, it is an express function used for callback to call the next middleware function.

![auth](./DocumentationImages/constAuth.png)

- In the auth function, we first try to get the token from the Authorization header of the request. If no token is found, an error is thrown.

```
const token = req.header("Authorization")?.replace("Bearer ", "");
if (!token) {
  throw new Error("Authentication failed. Token missing.");
}
```

- Next, we verify the token using the jwt.verify method. The decoded token is expected to have an \_id property, which is the ID of the user in the database.

```
const decoded = jwt.verify(
  token,
  process.env.JWT_KEY as string
) as DecodedToken;
```

- We then try to find the user in the database using the \_id from the decoded token and the token itself. If no user is found, an error is thrown.

```
const user = await User.findOne({
  _id: decoded._id,
  "tokens.token": token,
});

if (!user) {
  throw new Error("Authentication failed. User not found.");
}
```

- If the user is found and the token is valid, we attach the user and the token to the request object and call the next middleware function.

```
req.user = user;
req.token = token;
next();
```

- If any error occurs during this process, we catch the error and send a response with a status of 401 and a message of "Authentication failed."

```
} catch (error) {
  res.status(401).send({ error: "Authentication failed." });
}
```

2. The admin function is another middleware function that checks if the authenticated user is an admin. It first calls the auth function to authenticate the user. If the user is authenticated and their role is 0 (indicating an admin user), the next middleware function is called. If the user is not an admin, a response with a status of 403 and a message of "Access denied. User is not an admin." is sent.

```
export const admin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await auth(req, res, async () => {
      if (req.user && req.user.role === 0) {
        next();
      } else {
        res.status(403).send({ error: "Access denied. User is not an admin." });
      }
    });
  } catch (error) {
    res.status(401).send({ error: "Authentication failed." });
  }
};
```

-

### User

- User Interface

  - The IUser interface extends the Document interface from Mongoose, which represents a MongoDB document and its properties. It defines the structure of a user document in the database.

  ```
  export interface IUser extends Document {
  name: string;
  userName: string;
  email: string;
  dateOfBirth: Date;
  gender: string;
  description?: object;
  password: string;
  confirmPassword?: string;
  tokens: { token: string }[];
  generateAuthToken: () => Promise<string>;
  role: number;
  }
  ```

- name, userName, email, dateOfBirth, gender, password, and role are required fields.
  description and confirmPassword are optional fields.
  tokens is an array of objects, each containing a token string.
  generateAuthToken is a method that returns a promise that resolves to a string. This method is used to generate an authentication token for the user.
  role is a number that represents the user's role in the application (e.g., admin, regular user).

- User Methods Interface
  The IUserMethods interface defines methods that a user document can use.

```
export interface IUserMethods {
  generateAuthToken(): Promise<string>;
  toJSON(): IUser;
}
```

- generateAuthToken is a method that returns a promise that resolves to a string. This method is used to generate an authentication token for the user.
- toJSON is a method that returns an IUser object. This method is used to customize the JSON.stringify behavior.
  User Model Interface
- The UserModel interface extends the Model interface from Mongoose, which represents a MongoDB model and its properties. It defines methods that can be used on the User model.

```
export interface UserModel extends Model<IUser, IUserMethods> {
  findByCredentials(
    email: string,
    password: string
  ): Promise<HydratedDocument<IUser, IUserMethods>>;
}
```

- findByCredentials is a method that takes an email and a password as arguments and returns a promise that resolves to a hydrated document of type IUser with IUserMethods. This method is used to find a user in the database by their email and password.

- User Schema and Model

- User Controller

- User Routes
