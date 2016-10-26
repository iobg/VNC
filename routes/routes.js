const {Router} = require('express')

const app = Router()
const fs = require('fs')


//routes
app.get('/',(req,res)=>{
	res.render('index')
})
app.post('/',(req,res)=>{
	const {password} = require('../hostingServer/server')
	if(req.body.password===password){
		res.render('connection')
	}
	else res.render('index',{msg:"Incorrect password entered"})

})
module.exports=app
