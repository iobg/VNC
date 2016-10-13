'use strict'
const express=require('express')
const app = express()
const { Server }= require('http')
const server = Server(app)
const socketio = require('socket.io')
const ss = require('socket.io-stream')
const io = socketio(server)


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
let currentFrame = 0

const getScreenshot=(i)=>{
	return new Promise((resolve,reject)=>{
		exec(`screencapture screenshot${i}.png -C`, function (err){
			if(err){
				console.log(err)
				reject()
						}
						resolve()
					})

				})
			}
const recordScreenShots=()=>{
	getScreenshot(currentFrame).then(()=>{
		let read = fs.createReadStream(`screenshot${currentFrame}.png`)
			read.pipe(process.stdout)
	})
	setTimeout(recordScreenShots,32)
}
recordScreenShots()
io.on('connect',socket=>{
	console.log(`socket connected ${socket.id}`)
})

