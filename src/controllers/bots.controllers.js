import Bots from "../dataBase/models/bots/bots.js";
import Url from "./urls.controllers.js";

const urls = new Url();

class Bot {
    async sendInfo(req, res) {
        try {
            const redSocial = await Bots.find().select('name')
            // const category = await urls.sendCategory();
            res.status(200).send(redSocial)
        } catch (error) {
            console.log("error", error);
            res.status(404).send({ message: 'Error Al mandar la informacion' ,error: error });
        }
    }
}

export default Bot;