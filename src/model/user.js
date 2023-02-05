import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    created_At: {
        type: Date,
        default: Date.now
    },
    name: {
        type : String,
        required: true,
        trim: true 
    },
    phoneNo: {
        type: Number,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    }
})

const user = mongoose.model('Users', userSchema)
export default user