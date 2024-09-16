import mongoose, {Schema} from "mongoose";

const links = new Schema({
    date: { type: String},
    time: {type: String },
    urlPost: {type: String },
    urlPhoto: [{type: String }],
    user: {type: Schema.Types.ObjectId, ref: 'ScrapedUser'},
},{ timestamps: true });

const Links = mongoose.model('Links', links);
export default Links;