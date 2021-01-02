const http = require('http')
const express = require('express')
const Article = require('./article.model')
const app = express()
const server = http.Server(app)
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

let dbURL = 'mongodb://localhost:27017/' + 
(process.env.NODE_ENV === 'test'? 'testDB' : 'realDB')
dbURL = process.env.NODE_ENV === 'prod' ? process.env.db : dbURL
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', function(err){
 console.log(err)
})
app.post('/article/new', function(request, response){
	var newArticle = new Article(request.body)
	newArticle.save(function(err, data){
	  if(err)
		return response.status(400).json({error: 'Could not save article'})
	  return response.status(200).json({message:'Article created successfully'})
	})
   })
   


server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0',
	() => {
		console.log('Server running')
	}
)
module.exports = {app, server, mongoose}
