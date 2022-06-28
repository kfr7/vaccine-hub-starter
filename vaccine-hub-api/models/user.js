const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const bcrypt = require("bcrypt")
const { BCRYPT_SALT_ROUNDS } = require("../config")

class User {
    static async login(information) {
        // should need at least an email and password to log in
        // gather all relevatn information from req body,
        const necessaryFields = ["email", "password"];
        necessaryFields.forEach((field) => {
            if (!information.hasOwnProperty(field))
            {
                throw new BadRequestError(`The field: "${field}" is missing from the object passed in to log in`)
            }
        })
        const maybeUserExists = await User.fetchUserByEmail(information.email);
        if (maybeUserExists)
        {
            const isValid = await bcrypt.compare(information.password, maybeUserExists.password);
            if (isValid)
            {
                return User.returnPublicUser(maybeUserExists);
            }
        }
        throw new UnauthorizedError("Email/Password were incorrect/invalid combination")

        // check if email exists in database,
        // if it does, check password and if so respond appropriately
        // if some part is wrong, respond with appropriate error
        pass
    }
    static async register(information) {
        // information should have many fields to fill out information to register
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
                throw new BadRequestError(`The field: "${field}" is missing from the object passed in to register`);
            }
        })

        if (information.email.indexOf("@") <= 0) {
            throw newBadRequestError("Invalid email.");
        }

        const maybeUserExists = await User.fetchUserByEmail(information.email);
        if (maybeUserExists)
        {
            // should not enter because we are registering...
            throw new BadRequestError("Email already exists in our system. Try logging in.")
        }
    
        const hashedPassword = await bcrypt.hash(information.password, BCRYPT_SALT_ROUNDS);

        const text = 
        `INSERT INTO users (
            password, 
            first_name,
            last_name,
            email,
            location,
            date)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, first_name, last_name, email, location, date`;
        const values = [hashedPassword,
                        information.first_name,
                        information.last_name,
                        information.email.toLowerCase(),
                        information.location,
                        information.date]
        
        const result = await db.query(text, values);   
        console.log(result.rows[0]);
        return User.returnPublicUser(result.rows[0]);
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
    static returnPublicUser(userWithAllAttributes) {
        return {
            id: userWithAllAttributes.id,
            email: userWithAllAttributes.email,
            full_name: `${userWithAllAttributes.first_name} ${userWithAllAttributes.last_name}`,
            location: userWithAllAttributes.location,
            date: userWithAllAttributes.date
        }
    }
}

module.exports = User