import mongoose, { Schema } from 'mongoose'; // Importación corregida


const scrapedUserSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    platform: { type: String, required: true }, // Por ejemplo, "Twitter", "Instagram"
    linkRef: { type: Schema.Types.ObjectId, required: true, ref: 'Links' },
    captionRef: { type: Schema.Types.ObjectId, required: true, ref: 'Captions' },
    photo: { type: String },
    followers: { type: Number },
});

const ScrapedUser = mongoose.model('ScrapedUser', scrapedUserSchema);
export default ScrapedUser;
