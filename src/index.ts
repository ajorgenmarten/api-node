import { request, response } from 'express'
import app from './app'
try {
    app.listen(app.get('PORT'), () => { console.log('SERVER INIT...') })
} catch (error) {
    response.json({success:false, message:"Error ocurrido"})
}