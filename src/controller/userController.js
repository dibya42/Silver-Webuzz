const usermodel = require('../model/userModel')

const jwt = require('jsonwebtoken')



//---------------------regex create for validation ----------------------------------***
 
        let EmailRegex = /^[A-Za-z]{1}[A-Za-z0-9._]{1,}@[A-Za-z]{2,15}[.]{1}[a-z.]{2,5}$/   //here i m not using @99acre.com :- accepatnce email something: @gmail/hotmail/yahoo etc.
        let Passwordregex = /^[A-Z0-9a-z]{1}[A-Za-z0-9.@#$&]{7,14}$/
      
//*********************---------------------CREATE USER ----------------------------------********************* //

const createUser = async function (req, res) {

    try {
        let body = req.body

        if (Object.keys(body).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry Body can't be empty" })
        }

        // *************---------------- name validation ----------------------********************* //
        if (!body.firstName) {
            return res.status(400).send({ Status: false, message: " name is required" })
        }
        if (!body.lastName) {
            return res.status(400).send({ Status: false, message: " name is required" })
        }
         // *************---------------- Email validation ----------------------********************* //

        if (!body.email) {
            return res.status(400).send({ Status: false, message: " email is required" })
        }
        if (!EmailRegex.test(body.email)) {
            return res.status(400).send({ Status: false, message: " Please enter a valid email, do not use @99acr only gmail/hotmail/yahoo etc" })
        }

        let FinalEmail= body.email
        let changeEmail= FinalEmail.toLowerCase()  // changing capital word into lowercase

         //******------------------- Email and phone unique condition -------------------****** //

        let Checkuniquedata = await usermodel.findOne({ email: changeEmail})
        if (Checkuniquedata) {
            if (Checkuniquedata.email === changeEmail) {
                return res.status(400).send({ Status: false, message: " This email has been used already" })
            }
        }
        // *****------------- Checking PassWord -----------------------------------*******//

        if (!body.password) {
            return res.status(400).send({ Status: false, message: " password is required" })
        }
        if (!Passwordregex.test(body.password)) {
            return res.status(401).send({ Status: false, message: " Please enter a valid password, minlength 8, maxxlength 15" })
        }

            const userCreate = await usermodel.create(body)
            return res.status(201).send({ Status: true, message: 'Success', data: userCreate })
        
    }
    catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}

//--------------------------------------------------USER LOGIN------------------------------------------------***//

const login = async function (req, res) {

    try {
        let body = req.body

        if (Object.keys(body).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry Body can't be empty" })
        }

        //******------------------- Email validation -------------------****** //

        if (!body.email) {
            return res.status(400).send({ Status: false, message: " email is required" })
        }
        if (!EmailRegex.test(body.email)) {
            return res.status(400).send({ Status: false, message: " Please enter a valid email, do not use @99acr only gmail/hotmail/yahoo etc" })
        }
        let FinalEmail= body.email
        let changeEmail= FinalEmail.toLowerCase()  // changing capital word into lowercase

        //******------------------- password validation -------------------****** //

        if (!body.password) {
            return res.status(400).send({ Status: false, message: " password is required" })
        }
        if (!Passwordregex.test(body.password)) {
            return res.status(400).send({ Status: false, message: " Please enter a valid password, minlength 8, maxxlength 15" })
        }

        //******------------------- checking User Detail -------------------****** //
    

        let CheckUser = await usermodel.findOne({ email: changeEmail, password: body.password });

        if (!CheckUser) {
            return res.status(400).send({ Status: false, message: "username or the password is not correct" });
        }
        //******------------------- generating token for user -------------------****** //
        let user_token = jwt.sign({

            UserId: CheckUser._id,
            batch: "Silver"

        }, 'Silver Webuzz', { expiresIn: '86400s' });    // token valid for 24hrs

        res.setHeader("x-api-key", user_token);
        return res.status(201).send({ status: true, data: {token:user_token }});
    }
    catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}


module.exports={createUser,login}
