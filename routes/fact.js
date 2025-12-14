const express = require('express');
const router = express.Router();

// http://localhost:3000/fact/
router.get("/", (request, response) => {
   response.render("factPage");
});

module.exports = router;