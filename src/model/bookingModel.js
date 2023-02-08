const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({

    customerName: {
        type: String,
        required: "title is required",
        trim: true             //Customer Name
        // Customer Email
        // Booking Date
        // Booking Type (Full Day, Half Day, and Custom) - Dropdown
        // Booking Slot (First Half, Second Half) - Dropdown
        // Booking Time - Time picker
        // Booking slot will be visible if Booking Type if Half day
        // Booking time will be visible if Booking type is custom
    },
    customerEmail: {
        type: String,
        required: "email is required",
        unique: true,
        trim: true,
        lowercase:true
    },
   bookingDate:{
    type: Date,
    required: true,
   },
   bookingType:{
    type: String,
    required: true,
    enum: ["Full Day", "Half Day", "Custom"]

   },
   bookingSlot:{
    type: String,
    required: true,
    enum: ["First Half", "Second Half"]
   },
   bookingTime:{
    type: String,
    require: true
   }

}, { timestamps: true })


module.exports = mongoose.model("bookingmodel", bookingSchema);
