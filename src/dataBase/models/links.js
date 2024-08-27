import mongoose, {Schema} from "mongoose";

const links = new Schema({
    url: {type: String },
    time: {type: String },
    user: {type: Schema.Types.ObjectId, ref: 'ScrapedUser'},
});

const Links = mongoose.model('Links', links);
export default Links;