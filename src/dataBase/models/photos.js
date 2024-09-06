import mongoose,{Schema} from "mongoose";

const photos = new Schema({
    date: {type: String},
    time: {type: String},
    platform: {type: String},
    linkRef: {type: Schema.Types.ObjectId , ref:'Links'},
},{ timestamps: true });

const Photos = mongoose.model('Photos',photos);
export default Photos;