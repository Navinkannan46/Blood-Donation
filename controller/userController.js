const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

exports.registerController = async (req, res) => {
    console.log("inside registerController ");
    const { username, email, password } = req.body
    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            res.status(406).json("Alredy existing user.. please login!!!")
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = new userModel({
                username, email, password:hashPassword
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(err)
        console.log(err);
        
    }

}
exports.loginController = async (req, res) => {
    console.log("inside loginController ");
    const { email, password } = req.body
    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            const decodePassword = await bcrypt.compare(password, existingUser.password)
            if (!decodePassword) {
                res.status(406).json("Password Error")
            }
            const token = await jwt.sign({ userId: existingUser._id }, process.env.JWTPASSAWORD)
            res.status(200).json({ user: existingUser, token })
        } else {
            res.status(406).json("Email  existing.. please register!!!")

        }
    } catch (err) {
        res.status(401).json(err)
        console.log(err);
        
    }

}

exports.getAllUsers = async (req, res) => {
    const name = req.query.name
    try {
        const allUser = await userModel.find({ role: "User", username: { $regex: name, $options: 'i' } })
        console.log(allUser);
        res.status(200).json(allUser)

    } catch (error) {
        res.status(401).json(err)

    }
}
exports.deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.findByIdAndDelete({ _id: id })
        res.status(200).json("Delete Successfully")

    } catch (error) {
        res.status(401).json(error)

    }
}