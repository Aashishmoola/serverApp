import express from "express";
import { usersRouter } from "./routes/usersRouter";

const appServer = express();

// Unexpected: views dir path is by default relative to main dir instead of src dir 
appServer.set("views", "./src/views");
appServer.set("view engine", "ejs");
// Parses through body of html req (for "Post and Put Req") such that it is accessible
appServer.use(express.urlencoded({ extended: true }));

appServer.use("/", usersRouter);

const PORT = process.env.PORT || 3000;

appServer.listen(PORT, () =>
  console.log(`Express app listening on port http://localhost:${PORT}/`)
);
