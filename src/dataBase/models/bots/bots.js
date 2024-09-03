import mongoose from "mongoose";

const bots = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    activationTime: {
        type: Number,
        default: 2
    }
})

const Bots = mongoose.model('Bots', bots)

export default Bots;