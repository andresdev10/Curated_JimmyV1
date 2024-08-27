import mongoose, {Schema} from "mongoose";

const captions = new Schema({
    type: {type: String},
    time: {type: String},
    userRef: {type: Schema.Types.ObjectId, ref:'ScrapedUser'}
});
const Captions = mongoose.model('Captions', captions);
export default Captions;