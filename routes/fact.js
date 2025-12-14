const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const FactComment = require("../schemas/factComment");

// http://<app>:3000/fact/
router.get("/", async (request, response) => {
   let res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/today");
   let todayJSON = await res.json();

   let variables = {
      uselessFact: todayJSON["text"]
   };

   response.render("factPage", variables);
});

// http://<app>:3000/fact/submit
router.post("/submit", async (request, response) => {
   let fact = request.body.fact;
   let comment = request.body.comment;

   try {
      await mongoose.connect(process.env.MONGO_CONNECTION_STRING);

      let factEntry = await FactComment.findOne({ fact: fact });

      if (factEntry) {
         // Entry already exists, add comment
         factEntry.comments.push(comment);
         await factEntry.save();
      } else {
         // Entry doesn't exist, create new entry
         await FactComment.create({
            fact: fact,
            comments: [comment]
         })
      }

      mongoose.disconnect();
   } catch (err) {
      console.error(err);
   }

   response.render("submitPage");
});

module.exports = router;