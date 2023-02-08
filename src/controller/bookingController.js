const bookingModel = require("../model/bookingModel");
const userModel = require("../model/userModel");

const bookingForm = async function(req, res){
    try{

        let body = req.body

        if (Object.keys(body).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry Body can't be empty" })
        }
        if (!body.customerName) {
            return res.status(400).send({ Status: false, message: " customer name is required" })
        }
        if (!body.customerEmail) {
            return res.status(400).send({ Status: false, message: " customer email is required" })
        }
         

        if (!body.bookingDate) {
            return res.status(400).send({ Status: false, message: " Date is required" })
        }

        //---------------------- BOOKING DUPLICATE CHECK  -----------***
        let bookingDateCheck = await bookingModel.findOne({bookingDate: body.bookingDate})
        if (bookingDateCheck) {
            if (bookingDateCheck.bookingDate === body.bookingDate) {
                return res.status(400).send({ Status: false, message: " This Date has been used already" })
            }
        }


        if (!body.bookingType) {
            return res.status(400).send({ Status: false, message: " Type is required" })
        }

        let bookingTypeCheck = await bookingModel.findOne({bookingType: body.bookingType})
        if(bookingTypeCheck == "Full Day"){
            return res.status(400).send({ Status: false, message: "Full Day type for same day is not allowed" })
        }

        
        if (!body.bookingSlot) {
            return res.status(400).send({ Status: false, message: " Slot is required" })
        }
        if (!body.bookingTime) {
            return res.status(400).send({ Status: false, message: " Time is required" })
        }

        const acceptBooking = await bookingModel.create(body)
            return res.status(201).send({ Status: true, message: 'Success', data: acceptBooking })

    }catch(err){
        return res.status(500).send({ Status: false, message: err.message })
    }
}

module.exports = {bookingForm};