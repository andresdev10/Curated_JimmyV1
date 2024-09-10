import express from 'express';
import User from '../controllers/user.controllers.js';

import taskTwitter from '../jobs/twitter.jobs.js';
import Url from '../controllers/urls.controllers.js';
import Scraping from '../controllers/scraping.controllers.js';
import Bot from '../controllers/bots.controllers.js';

const user = new User();
const url = new Url();
const scraping = new Scraping();
const bot = new Bot();

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: "Bienvenidos!!! :)"
    });
});

// USERS
router.post('/createUser', user.createUser.bind(user));
router.post('/login', user.loginUser.bind(user));

// ruta prueba bots

router.get('/prueba', taskTwitter)

// Rutas para el manejo de los bots

router.get('/sendInfo', bot.sendInfo)

// rutas para crear urls

router.get('/sendCategory', url.sendCategory)
router.post('/createUrl', url.createUrl)

// Rutas para Scraper

router.get('/sendData', scraping.scraping)

export default router;
