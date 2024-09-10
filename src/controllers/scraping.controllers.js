import Urls from "../dataBase/models/urls.js";
import taskTwitter from "../jobs/twitter.jobs.js";
import dotenv from 'dotenv';


dotenv.config();
const username = process.env.USER_TWITTER;
const password = process.env.PASSWORD_TWITTER

class Scraping {
    async scraping(req, res){
        try {
            const  { platform, category } = req.query;
            const urls = await Urls.find({ platform: platform.toLowerCase(), category: category})
            let data = []
            for ( const url of urls){
               const resp = await taskTwitter(username,password,url.url)
                data.push(resp);
            }
            res.status(200).send({ data: data })
        } catch (error) {
            console.log("error: ", error)
            res.status(404).send({ message: "Error al Scrapear", error: error })
        }
    }
}

export default Scraping;