const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const newBlog = new Blog(request.body)
        const savedblog = await newBlog.save()
        response.status(201).json(savedblog)
    } catch(error) {
        next(error)
    }
    
})


module.exports = blogsRouter