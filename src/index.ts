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

const LocalStrategy = passportLocal.Strategy;

mongoose
  .connect(
    "mongodb+srv://masemota:bestbatman10@userprofiles.tv5tgoq.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  )
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

// Passport
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err: any, user: any) => {
    if (err) throw err;
    if (!user) return done(null, false);
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw err;
      if (result === true) {
        return done(null, user);
      } else {
        return done(null, false);
      }
});

passport.deserializeUser((user: any, cb) => {
  cb(null, user.id);
});
passport.deserializeUser((id: string, cb) => {
  User.findOne({id: id}, (err: any, user: any) => {
    const userInformation = {
      username: user.username
    };
    cb(err, userInformation);
    })
})


// Routes

app.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req?.body;
  if (
    username ||
    password ||
    typeof username !== "string" ||
    typeof passport !== "string"
  ) {
    res.send("Improper Value");
    return;
  }
  User.findOne({ username }, async (err: Error, doc: UserInterface) => {
    if (err) throw err;
    if (doc) res.send("User already exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new user({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("success");
    }
  });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
