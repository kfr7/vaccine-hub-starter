const express = require("express")
const router = express.Router()


router.post("/login", async (req, res, next) => {
    try {
        // do something to log in in model folder
        pass
    }
    catch(error) {
        next(error)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        // do something to register in model folder
        pass
    }
    catch(error) {
        next(error)
    }
})

module.exports = router