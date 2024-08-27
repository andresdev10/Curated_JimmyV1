import mongoose, {Schema} from "mongoose";

const posts = new Schema({
    time: {type: String},
    linkRef: { type: Schema.Types.ObjectId, ref: 'Links' }
});

const Posts = mongoose.model('Posts', posts);
export default Posts;