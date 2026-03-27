const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./blog_api_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('GET Test suite', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
    test('the unique identifier property of the blogs is named id', async () => {
        const response = await api.get('/api/blogs')
        assert(response.body.length > 0)
        response.body.forEach(blog => {
            assert.strictEqual(typeof blog.id, 'string')
            assert.strictEqual(blog._id, undefined)
        })
    })
})

describe('POST Test suite', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "Alex blablabla",
            author: "Alex",
            url: "https://alexblablablaba.com/",
            likes: 10,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogsInDb = await helper.blogsInDb()
        assert.strictEqual(blogsInDb.length, helper.initialBlogs.length +1)
        const titles = blogsInDb.map(blog => blog.title) 
        assert(titles.includes('Alex blablabla'))
        
    })
    test('A blog missing likes property has a default likes: 0', async () => {
        const newBlog = {
            title: "Sophia blablabla",
            author: "Sophia",
            url: "https://alexblablablaba.com/",
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const newId = response.body.id
        const blogsInDb = await helper.blogsInDb()
        const addedBlog = blogsInDb.find(b => b.id === newId)
        assert.strictEqual(addedBlog.likes, 0)
    })
})

after(async () => {
    await mongoose.connection.close()
})