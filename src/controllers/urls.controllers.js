import Urls from "../dataBase/models/urls.js";

class Url{
    async createUrl(req, res){
        try {
            const { urls } = req.body;
            if (urls.length == 0) return res.status(404).send({ message: 'No hay datos (url) para almacenar' });
            let urlSave;
            for (const url of urls){
                urlSave =  new Urls({
                    platform: url.platform,
                    url: url.url,
                    category: url.category
                })
                await urlSave.save();
            }
            return res.status(201).send({ message: 'URLs creadas exitosamente' });
        } catch (error) {
            console.log("error", error);
            res.status(404).send({ message: "Error al crear url", error: error });
        }

    }

    async sendCategory(req, res){
        try {
            const { platform } = req.query
           const catagory = await Urls.distinct('category', { platform: new RegExp(`^${platform}$`, 'i') })
           res.status(200).send(catagory)
        } catch (error) {
            console.log("error", error);
            res.status(404).send({ message: "Error al buscar las categorias", error: error });
        }
    }
} 

export default Url;