const jwt = require('jsonwebtoken');

const Mid1 = async function (req, res, next) {
    try {
      
        let header = req.headers

        let token = header['x-api-key'] || header['X-API-KEY']

        if (!token) {
            return res.status(400).send({ Status: false, message: " Please enter the token" })
        }
        try {
            let decodedToken = jwt.verify(token, "Silver Webuzz")

            if (decodedToken) {
                req.userId = decodedToken.UserId            // sending UserId in a request, means exporting this decodedToken.UserId 
                return next()
            }
        }catch (err) {
            return res.status(400).send({ Status: false, message: err.message })
        }

    }
    catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}


module.exports = { Mid1 }