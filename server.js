'use strict'
const express=require('express')
const app = express()
const { Server }= require('http')
const server = Server(app)
const socketio = require('socket.io')
const ss = require('socket.io-stream')
const io = socketio(server)
const sharp = require('sharp')


//server config
app.set('view engine', 'pug')
//middleware
app.use(express.static('public'))
app.get('/',(req,res)=>{
	res.render('index')
})


server.listen(3000,()=>{
	console.log('server listening')
})


//screenshot
const fs = require('fs')
var exec = require('child_process').exec;
const currentFile=0

const getScreenshot=()=>{
	return new Promise((resolve,reject)=>{
		exec(`screencapture ./images/screenshot${currentFile}.png -C`, function (err){
			if(err){
				console.log(err)
				reject()
						}
						resolve()
					})

				})
			}
const recordScreenShots=()=>{
	getScreenshot().then(()=>{
		let read = fs.createReadStream(`./images/screenshot${currentFile}.png`)
			read.pipe(resizeImage)
	})
	setTimeout(recordScreenShots,100)
}
//this resizes images to less than 10x their original size
const resizeImage = sharp().resize(640,400)
.toFile(`./images/resized${currentFile}.png`,(err,info)=>{

})

recordScreenShots()
io.on('connect',socket=>{
	console.log(`socket connected ${socket.id}`)
})

