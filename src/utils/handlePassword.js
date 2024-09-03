import bcrypt from 'bcrypt';

class bcrypts {
    async encrypt(password){
        try {
            return await bcrypt.hash(password,10)
        } catch (error) {
            console.log("error: ",error)
            throw error
        }
    }

    async compare(password , passwordDB){
        try {
            return await bcrypt.compare(password,passwordDB);
        } catch (error) {
            console.log("error: ",error)
            throw error
        }
    }
}

export default bcrypts;