const {Router} = require('express')

const app = Router()
const fs = require('fs')

//routes
app.get('/',(req,res)=>{
	res.render('index')
})
app.post('/',(req,res)=>{
	console.log(req.body)
	if(req.body.password===password){
		res.render('connection')
	}
	else res.render('index',{msg:"Incorrect password entered"})

})
module.exports=app
