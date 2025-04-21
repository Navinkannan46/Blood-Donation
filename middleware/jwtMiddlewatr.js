const jwt = require("jsonwebtoken")

const jwtMiddleware = (req, res, next) => {
    console.log("inside middleware");
    const token = req.headers["authorization"].split(" ")[1]
    if (token != "") {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWTPASSAWORD)
            req.userId=jwtResponse.userId
            next()
        } catch (error) {
            res.status(401).json("Autherization failed... Please Login")
            console.log("r");

        }
    } else {
        res.status(404).json("Authorisation Failed.. Token is Missing...!!!!")
        console.log("r");
        
    }
    
}
module.exports = jwtMiddleware