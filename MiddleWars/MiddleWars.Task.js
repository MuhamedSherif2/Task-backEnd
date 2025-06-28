const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try {
        const fullToken = req.headers.authorization
        const token = fullToken?.split(' ')[1]
        if(!token) res.status(403).send('Access Denied')
        const realToken = jwt.verify(token , 'secretKey')
        req.user = realToken
        next()
    } catch (error) {
        console.log('Tasks MiddleWares error :' , error)
        res.status(401).send('Invalid Token')
        next()
    }
}