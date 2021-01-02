const {app, server, mongoose} = require('./../classwork/server') // runs app.js
const Article = require('./../article.model') // imports Article model
const request = require('supertest') // needed to make API requests

describe("When the article CRUD server is running", ()=>{
	// Add individual test cases
	it("should return 200 response if POST request receives proper article data", async ()=>{
		const res = await request(app).post('/article/new')
	 .send({title: 'test', content: 'test'})
		expect(res.status).toBe(200)
		expect(typeof res.body).toEqual('object')
 })
 it("should return 400 response if POST request data is missing the article title", async ()=>{
	const res = await request(app).post('/article/new')
 .send({content: 'test'})
	expect(res.status).toBe(400)
	expect(typeof res.body).toEqual('object')
})





	afterAll(async () => {
   await server.close();
   await mongoose.connection.db.dropDatabase()
   await mongoose.connection.close()
}) // once all tests are run stop server, empty DB, and close connection
})
