import mongoose from 'mongoose'
import {config} from '../config/config.js'

const connectionStatus = mongoose.connect(config.CONNECTION_URL).then((data)=>{
    console.log('connection successfully')
}).catch((error)=>{
    console.log('error', error)
})

export default connectionStatus;