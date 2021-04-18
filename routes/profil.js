const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {

    res.render('profil',
        {
            payload: {
                message: "Bun venit!",
                title: "PIE",
                user: req.user
            }
        });
});

module.exports = router;