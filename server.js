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
let currentFile=0

const getScreenshot=()=>{
	return new Promise((resolve,reject)=>{
		exec(`screencapture ./images/screenshot.png -C`, function (err){
			if(err){
				console.log(err)
				reject()
						}
						resolve()
					})

				})
			}
let read;
const recordScreenShots=()=>{
	getScreenshot().then(()=>{
		read=fs.createReadStream(`./images/screenshot.png`)
		.pipe(sharp().resize(640,400)
			.toBuffer(()=>{
				fs.unlink(`./images/screenshot.png`,()=>{
					recordScreenShots()
				})
			})).pipe(process.stdout)
	})

}
recordScreenShots()
io.on('connect',socket=>{
	console.log(`socket connected ${socket.id}`)
})

