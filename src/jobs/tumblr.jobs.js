import ScrapedUser from '../dataBase/models/scrapedUser.js';
import Posts from '../dataBase/models/posts.js';
import Links from '../dataBase/models/links.js';
import Photos from '../dataBase/models/photos.js';
import tumblrScraping from '../functions/tumblr.js';

const taskTumblr = async (usernameTumblr, passwordTumblr, url) => {
    try {
        const data = await tumblrScraping(usernameTumblr, passwordTumblr, url);
        const resultData = [];

        for (const item of data) {
            const filterUser = {
                username: item.username,
                platform: item.platform,
                photo: item.photo,
            }

            let user = await ScrapedUser.findOne(filterUser);
            if (!user) {
                user = new ScrapedUser({
                    username: item.username,
                    platform: item.platform,
                    photo: item.photo,
                    followers: item.followers || '',
                    name: item.name || '', 
                    linkRef: item.linkRef || null, 
                    captionRef: item.captionRef || null 
                });
                await user.save()
                console.log("usuario creado")
            }

            const filterPosts = {
                date: item.date,
                time: item.time,
            }

            let postsDB = await Posts.findOne(filterPosts)
            
            if (!postsDB){
                let linkDB = await Links.create({
                    date: item.date,
                    time: item.time,
                    urlPost: item.postUrl || '', 
                    urlPhoto: item.LinkPhotPosts || [], 
                    user: user._id
                })
                console.log("links creados")
                postsDB = new Posts({
                    date: item.date,
                    time: item.time,
                    content: item.contentPost || '',
                    linkRef: linkDB._id,
                })
                await postsDB.save(); // Asegurarse de guardar el post
                console.log("Post creado");
                let photoDB = await Photos.create({
                    date: item.date,
                    time: item.time,
                    platform: item.platform,
                    linkRef: linkDB._id
                })
                console.log("Photos creadas");
            }
            resultData.push(item)
        }

        console.log("proceso terminado")
        return resultData;
    } catch (error) {
        console.log("error: ", error)
    }
}

export default taskTumblr;