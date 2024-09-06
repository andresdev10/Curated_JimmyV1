import mongoose, {Schema} from "mongoose";

const texto = new Schema({
    data: {type: String},
    time: {type: String},
    captionRef: {type: Schema.Types.ObjectId, ref:'Captions'},
},{ timestamps: true });

const Texto = mongoose.model('Texto', texto);
export default Texto;