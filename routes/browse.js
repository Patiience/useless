const express = require('express');
const router = express.Router();

// http://localhost:3000/browse/
router.get("/", (request, response) => {
    response.render("browsePage");
});

module.exports = router;