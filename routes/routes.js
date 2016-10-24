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
app.get('/stream.m3u8',(req,res)=>{
	fs.createReadStream('videostream/stream.m3u8').pipe(res)
})
app.get('/:streamSegment',(req,res)=>{
		let read=fs.createReadStream(`videostream/${req.params.streamSegment}`)
		read.on('error',(err)=>{
			console.log(err)
		})
		read.pipe(res)
	
})

module.exports=app
