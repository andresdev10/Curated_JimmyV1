import mongoose, {Schema} from "mongoose";

const posts = new Schema({ 
    date: {type: String},
    time: {type: String},
    content: {type: String},
    linkRef: { type: Schema.Types.ObjectId, ref: 'Links' },
    category: {type: String}
},{ timestamps: true });;

const Posts = mongoose.model('Posts', posts);
export default Posts;