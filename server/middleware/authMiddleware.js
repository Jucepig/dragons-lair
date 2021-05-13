module.exports = {
  usersOnly: (req, res, next) => {
    if(!req.session.user) {
      return res.status(401).send("Please Log in")
    }
    next()
  },

  adminsOnly: (req, res, next) => {
    const { isAdmin } = req.session.user
    if(isAdmin === false) {
      return res.status(403).send('You are not an admin')
    }
    next()
  }
}