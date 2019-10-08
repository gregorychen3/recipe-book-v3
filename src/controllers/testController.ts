import express from "express";
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.send("ok");
});

export default router;
