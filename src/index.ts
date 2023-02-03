import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import path from "path";
import passport from "passport";
import passportLocal from "passport-local";
import cookieParser from "cookie-parser";
import session from "express-session";
import bcrypt from "bcryptjs";
import cors from "cors";
import User from "./User";
import { UserInterface } from "./interfaces/Userinterface";

// create passport local strategy
const LocalStrategy = passportLocal.Strategy;

//connect to mongoose database
mongoose
  .connect(`${process.env.DATABASE_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then((res) => {
    console.log("Connected to MongoDB");
  });
(err: Error) => {
  if (err) throw err;
  console.log("Error connecting to MongoDB");
};

dotenv.config();

// Middleware
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({ secret: "secretcode", resave: true, saveUninitialized: true })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// passport use local strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err: any, user: UserInterface) => {
      if (err) throw err;
      if (!user) return done(null, false);
      // compare username/password to stored in database
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);

// store cookie in browser session
passport.serializeUser((user: any, cb) => {
  cb(null, user.id);
});

// return user that matches cookie id
passport.deserializeUser((id: string, cb) => {
  User.findOne({ id: id }, (err: any, user: any) => {
    const userInformation = {
      username: user.username,
    };
    cb(err, userInformation);
  });
});

// register user route
app.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req?.body;
  // check if user has inputted correct values
  if (
    !username ||
    !password ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    res.send("Improper Value");
    return;
  }
  // check if user already exists
  User.findOne({ username }, async (err: Error, doc: UserInterface) => {
    if (err) throw err;
    if (doc) res.send("User already exists");
    if (!doc) {
      // secure user password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create new user in mongodb
      const newUser = new User({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("success");
    }
  });
});

// authenticate user on login
app.post(
  "/login",
  passport.authenticate("local", (req, res) => {
    res.send("Authentication successful");
  })
);

// get user route
app.get("/user", (req, res) => {
  res.send(req.user);
});

// app.get("/logout", (req, res) => {
//   req.logout();
//   res.send("logged out");
// })

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
