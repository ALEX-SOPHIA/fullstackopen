const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware.js')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    const body = request.body
    const user = request.user
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if(!blog){return response.status(404).json({error: 'blog not found'})}
    if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        await User.findByIdAndUpdate(
            user._id,
            {$pull: {blogs:request.params.id}}
        )
        response.status(204).end()
    } else {response.status(403).json({error: 'you have no authorization to delete this blog'})}

})

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const blogToUpdate = await Blog.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true, runValidators: true, context: 'query' }
        )
        response.status(200).json(blogToUpdate)
    } catch (error) { next(error) }
})


module.exports = blogsRouter