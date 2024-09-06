import mongoose, { Schema } from 'mongoose'; // Importación corregida


const scrapedUserSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: false },
    platform: { type: String, required: true }, // Por ejemplo, "Twitter", "Instagram"
    linkRef: { type: Schema.Types.ObjectId, required: false, ref: 'Links' },
    captionRef: { type: Schema.Types.ObjectId, required: false, ref: 'Captions' },
    photo: { type: String },
    followers: { type: String },
}, { timestamps: true });

const ScrapedUser = mongoose.model('ScrapedUser', scrapedUserSchema);
export default ScrapedUser;
