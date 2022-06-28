const db = require("../db")
const { BadRequestError } = require("../utils/errors")

class User {
    static async login(information) {
        // gather all relevatn information from req body,
        // check if email exists in database,
        // if it does, check password and if so respond appropriately
        // if some part is wrong, respond with appropriate error
        pass
    }
    static async register(information) {
        // gather all relevatn information from req body,
        // check if everything needed to register is present
        if (!information)
        {
            throw new BadRequestError("No object passed through");
        }

        const necessaryFields = ["password", "first_name", "last_name", "email", "location", "date"];
        necessaryFields.forEach((field) => {
            if (!information.hasOwnProperty(field))
            {
                throw new BadRequestError(`The field: "${field}" is missing from the object passed in`);
            }
        })
        const maybeUserExists = await User.fetchUserByEmail(information.email);
        if (maybeUserExists)
        {
            // should not enter because we are registering...
            throw new BadRequestError("Email already exists in our system. Try logging in.")
        }

        const text = 
        `INSERT INTO users (
            password, 
            first_name,
            last_name,
            email,
            location,
            date)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, first_name, last_name, email`;
        const values = [information.password,
                        information.first_name,
                        information.last_name,
                        information.email.toLowerCase(),
                        information.location,
                        information.date]
        
        const result = await db.query(text, values);   
        return result.rows[0];
        // then, check if email exists already, if
        // if not, then try interacting w databasee and make it
        // if something goes wrong, throw appropriate error
    }
    static async fetchUserByEmail(email) {
        if (!email)
        {
            throw new BadRequestError("No email passed through");
        }
        const text = `SELECT * FROM users WHERE email=$1`;
        const values = [email.toLowerCase()];
        const result = await db.query(text, values);
        return result.rows[0];  // this is the user with that email
    }
}

module.exports = User