import express from 'express';
import User from '../controllers/user.controllers.js';

const user = new User();

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: "Bienvenidos!!! :)"
    });
});

// USERS
router.post('/createUser', user.createUser.bind(user));
router.post('/login', user.loginUser.bind(user));

export default router;
