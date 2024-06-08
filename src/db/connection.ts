import mongoose from 'mongoose'
import 'dotenv/config' 



/***************************************************************************************************/


const mongoURI = process.env.MONGODB_URI
if (!mongoURI) {
    throw new Error('lol! mongoDB URI is undefined')
}

const Connect = mongoose.connect(mongoURI)
    .then(() => {console.log('Welldone! DB connected.')})
    .catch((err) => console.error(err))

export default Connect