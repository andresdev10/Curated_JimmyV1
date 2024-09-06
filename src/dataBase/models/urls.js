import mongoose, { Schema, Types } from "mongoose";

const urls = new Schema({
    platform: { type: String, required: true },
    url: { type: String, required: true},
    category: { type: String, required: true}
}, { timestamps: true });

const Urls = mongoose.model( 'Urls', urls)

export default Urls;