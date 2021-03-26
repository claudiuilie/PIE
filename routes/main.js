const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {

    res.render('home',
        {
            payload: {
                message: "Bun venit!",
                title: "SSI"
            }
        });
});

module.exports = router;
