const router = require('express').Router()
const passport = require('passport')

const CLIENT_URI = 'http://localhost:3000'

router.get('/login/failed', (req, res)=>{
	res.status(401).json({ message: "login failed"})
})

router.get('/login/success', (req, res)=>{
	if(req.user){
		res.status(200).json(req.user)
	}
})

router.get('/logout', (req, res)=>{
	req.logout()
	res.redirect(CLIENT_URI)
})

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', {
	successRedirect: CLIENT_URI,
  failureRedirect: "/login/failed",	
}))

router.get('/github',
  passport.authenticate('github', { scope: [ 'profile' ] }));

router.get('/github/callback', 
  passport.authenticate('github',{
	successRedirect: CLIENT_URI,
  failureRedirect: "/login/failed",	
}));

module.exports = router