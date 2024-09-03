import UserModel from '../dataBase/models/user.js';
import HandlePassword from '../utils/handlePassword.js';
import Token from '../utils/handleJWT.js'

// const handlePassword = new HandlePassword();
// const token = new Token();

class User {

    constructor() {
        this.handlePassword = new HandlePassword();
        this.token = new Token();
    }

    async findUser(userName, email) {
        try {
            const query = { userName: userName };
            if (email) {
                query.email = email;
            }
            const user = await UserModel.findOne(query);
            return user;
        } catch (error) {
            console.log("error: ", error);
            throw error;
        }
    }
    

    async createUser(req, res){
        try {
            const { userName, password, email } = req.body;
            const user = await this.findUser(userName, email);
            if (user) return res.status(404).json({ message: "Este Usuario ya Existe"})
            const encryptedPassword = await handlePassword.encrypt(password);
            const newUser = new UserModel({
                userName: userName,
                password: encryptedPassword,
                email: email
            });

            await newUser.save();
            return res.status(201).json({ message: "Usuario creado exitosamente" });
        } catch (error) {
            console.log("error: ", error)
            return res.status(404).json({ message: "Error Al Crear Usuario", error})
        }
    }

    async loginUser(req, res){
        try {
            const { userName, password, email } = req.body;
            const user = await this.findUser(userName, email);
            if (!user) return res.status(403).json({ message: "Usuario No Existe", error: true });
            const hashPassword = user.get("password");
            const check = await this.handlePassword.compare(password, hashPassword);
            if (!check) return res.status(403).json({ message: "Contraseña Invalida", error: true });
            const sign = await this.token.tokenSing(user)
            const token = {
            code: sign[0],
            expire: sign[1],
            };

            res.cookie('jwt', token.code, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development', 
                expires: new Date(token.expire * 1000) 
            });
            
            res.status(200).json({ message: "Inicio de Session Exitoso", token, user});
        } catch (error) {
            console.log("error: ", error)
            res.status(404).json({ message: "Error Al Iniciar Session", error: true });
        }
    }

}

export default User;