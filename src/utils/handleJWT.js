import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

class Token {
    async tokenSing (user) {
        try {
            const sign = jwt.sign({
                _id : user._id,
            },
            
                JWT_SECRET,
                 {
                    expiresIn: "24h",
                }
            
        )
        const exp = jwt.decode(sign, JWT_SECRET).exp
        return [sign, exp]
        } catch (error) {
            console.log("error decoding", error)
            throw error
        }
    }

    async verifyToken (tokenVerify) {
        try {
            return jwt.verify(tokenVerify, JWT_SECRET)
        } catch (error) {
            console.log("error verifying token", error)
            throw error
        }
    }
}

export default Token;