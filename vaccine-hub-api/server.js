// any imports are here
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { BadRequestError, NotFoundError } = require("./utils/errors")

// setting up app
const app = express()
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// define all route variables
const authRoute = require("./routes/auth")

// define all actual paths for routes
app.use("/auth", authRoute)

app.use((req, res, next) => {
    return next(new NotFoundError());
})

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message;
    return res.status(status).json({error: {message, status}})
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running from http://localhost:${PORT}`);
})