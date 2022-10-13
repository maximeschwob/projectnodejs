const jwt = require('jsonwebtoken');


function auth(req,res,next) {
    const fullToken = req.headers.authorization;
    const token = fullToken === undefined ? false : fullToken.split(' ')[1]

    if(!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN)
        req.user = decoded
        res.locals.user = req.user
        next()
    } catch (error) {
        res.status(401).send('Oops Error ❌: Your jwtKey token is unauthorized')
    }
}

module.exports = auth