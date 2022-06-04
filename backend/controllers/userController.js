const userModel = require('../model/UserModel')  //import UserModel
var validator = require('validator');              // import validator for email validation
const jwt = require('jsonwebtoken');              // import jsonwebtoken to generate token

//=========== Create user ====================//

//------------validation function-----------//
let isValid = (value) => {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const createUser = async (req, res) => {
    try {
        let data = req.body;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "BAD REQUEST,Please provide User details " });
        }
        if (!isValid(data.fname)) {
            return res.status(400).send({ status: false, msg: "First Name is Required" });
        }
        if (!isValid(data.lname)) {
            return res.status(400).send({ status: false, msg: "Last Name is Required" });
        }
        if (!isValid(data.title)) {
            return res.status(400).send({ status: false, msg: "title is Required" });
        }
        if (!isValid(data.email)) {
            return res.status(400).send({ status: false, msg: "email is mandatory" });
        }
        if (!isValid(data.password)) {
            return res.status(400).send({ status: false, msg: "password is mandatory" });
        }
        if (!validator.isEmail(data.email)) {
            return res.status(400).send({ status: false, msg: "Enter a Valid Email" });
        }

        const usedEmail = await UserModel.findOne({ email: data.email })  //For checking duplicate email id

        if (usedEmail) {
            return res.status(400).send({ status: false, message: `${data.email} this email is already registered` })
        }
        let savedData = await UserModel.create(data)
        return res.status(201).send({ status: true, msg: savedData });
    }
    catch (error) {
        console.log("This is the error:", error.message);
        res.status(500).send({ status: false, msg: error.message });
    }
}


//================= Login ====================//


const login = async (req, res) => {
    try {
        let data = req.body;
        if (!Object.keys(data).length) {
            return res.status(400).send({ status: false, msg: "Invalid Request , Please Provide Login Details" })
        }
        if (data.email && data.password) {
            let User = await UserModel.findOne({ email: data.email, password: data.password })
            if (!User) {
                return res.status(400).send({ status: false, msg: "Invalide email or password" });
            }
            let token = jwt.sign(
                {
                    UserId: User._id.toString(),          ///payload
                    Name: "Priyanka",

                },
                "NodeJS-Project"
            )
            res.header('x-api-key', token);
            res.status(200).send({ data: "User login successful", token: { token } })
        }
        else {
            res.status(400).send({ status: false, msg: "must contain email and password" })
        }

    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}
//========================
let getUserData = async function (req, res) {
    try {
        const data = req.query;
        if (!Object.keys(data).length) {

            return res.status(400).send({ status: false, msg: "enter user name" });
        }

        else {
            let user = await userModel.find({ $and: [{ isDeleted: false }, data] });
            if (!Object.keys(user).length) {
                return res.status(404).send({ status: false, msg: "1.No such user exists" });
            }
            return res.status(200).send({ status: true, list: user });
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}

    module.exports={createUser,login,getUserData}