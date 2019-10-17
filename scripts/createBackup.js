const axios = require("axios");
const fs = require("fs");

axios
  .get("https://greg-ally-recipe-book.herokuapp.com/api/recipes")
  .then(res => {
    const recipes = res.data;

    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    fs.writeFileSync(
      `../backups/${month}_${day}_${year}.json`,
      JSON.stringify(recipes, null, 2)
    );

    console.log("Success");
  })
  .catch(e => {
    console.error(e);
  });
