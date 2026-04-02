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
    test('Status code 400 for posting a new blog without title or url: ', async () => {
        const blogWoTitle = {
            author: "Alex",
            url: "https://alexblablablaba.com/",
        }
        const blogWoUrl = {
            title: "Alex Sophia blablabla",
            author: "Alex Sophia",
        }
        await api
            .post('/api/blogs')
            .send(blogWoTitle)
            .expect(400)

        await api
            .post('/api/blogs')
            .send(blogWoUrl)
            .expect(400)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with statuscode 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
        const blogsAtEnd = await helper.blogsInDb()
        const ids = blogsAtEnd.map(b=>b.id)
        assert(!ids.includes(blogToDelete.id))
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length-1)
    })
})

describe('updating of a blog', () => {
    test('succeeds with statuscode 200 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const newBlog = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: 100
        }
        const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200)
        const newId = response.body.id
        const blogsAtEnd = await helper.blogsInDb()
        const updatedBlog = blogsAtEnd.find(b => b.id === newId)
        assert.strictEqual(updatedBlog.likes, newBlog.likes )
    })
})

after(async () => {
    await mongoose.connection.close()
})