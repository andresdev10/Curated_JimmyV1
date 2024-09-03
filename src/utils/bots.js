import Bots from "../dataBase/models/bots/bots.js";


class Bot{
    async init(bots){
        try {
            for (const bot of bots) {
                const botsDb = await Bots.findOne({name: bot });
                if(!botsDb) await Bots.create({name: bot})
            }
            return;
        } catch (error) {
           console.log("error: ", error)
           throw error 
        }
    }
}

export default Bot;