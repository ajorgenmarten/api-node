import mongoose from 'mongoose'
import config from './config'

mongoose.connect(config.DB.URI)
mongoose.connection.once("open", () => {console.log("DATABASE IS CONNECTED...")})
mongoose.connection.on('error', error => {
    console.log(error)
    process.exit(0)
})