import mongoose,{Schema} from "mongoose";

const photos = new Schema({
    time: {type: String},
    linkRef: {type: Schema.Types.ObjectId , ref:'Links'}
});

const Photos = mongoose.model('Photos',photos);
export default Photos;