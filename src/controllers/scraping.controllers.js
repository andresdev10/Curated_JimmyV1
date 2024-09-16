import Urls from "../dataBase/models/urls.js";
import taskTwitter from "../jobs/twitter.jobs.js";
import taskTumblr from "../jobs/tumblr.jobs.js";
import dotenv from 'dotenv';


dotenv.config();
const username = process.env.USER_TWITTER;
const password = process.env.PASSWORD_TWITTER;

const usernameTumblr = process.env.USER_TUMBLR;
const passwordTumblr = process.env.PASSWORD_TUMBLR;

class Scraping {
    async scraping(req, res){
        try {
            const  { platform, category } = req.query;
            const urls = await Urls.find({ platform: platform.toLowerCase(), category: category})
            let data = []
            for ( const url of urls){
                switch(url.platform.toLowerCase()){
                    case 'twitter':
                        const respTwitter = await taskTwitter(username,password,url.url)
                        data.push(respTwitter);
                        break;
                    case 'tumblr':
                        const respTumblr = await taskTumblr(usernameTumblr,passwordTumblr,url.url)
                        data.push(respTumblr);
                        break;    
                }
            }
            res.status(200).send({ data: data })
        } catch (error) {
            console.log("error: ", error)
            res.status(404).send({ message: "Error al Scrapear", error: error })
        }
    }
}

export default Scraping;