import express, { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import logger from "morgan";
import path from "path";
import recipeController from "./controllers/recipeController";
import testController from "./controllers/testController";
import { initDbConn } from "./db/db";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

initDbConn();

app.use("/", testController);
app.use("/recipes", recipeController);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  return res.sendStatus(err.status ? err.status : 500);
});

module.exports = app;
