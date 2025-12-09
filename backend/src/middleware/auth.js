const jwt = require('jsonwebtoken')

module.exports = function (roles = []) {
  return (req, res, next) => {
    try {
      const auth = req.headers.authorization || ''
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
      if (!token) return res.status(401).json({ message: 'No token provided' })
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      if (roles.length && !roles.includes(payload.role)) {
        return res.status(403).json({ message: 'Forbidden' })
      }
      req.user = payload
      next()
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  }
}

