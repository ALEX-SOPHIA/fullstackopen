const _ = require('lodash')


const dummy = (blogs) => {
    return 1
}

const totalLikes = (array) => {
    const reducer = (total, blog) => {
        return total + (blog.likes || 0)
    }
    return array.reduce(reducer, 0)
}

const favoriteBlog = (array) => {
    if (array.length === 0) return null

    const reducer = (max, blog) => {
        return (blog.likes > max.likes) ? blog : max
    }
    return array.reduce(reducer)
}

const mostBlogs = (array) => {
    if(array.length === 0) return null

    const authorGroup = _.groupBy(array, 'author')
    const blogcounts = _.map(authorGroup, (value, key) => {

        return {
            author: key,
            blogs: value.length
        }
    })
    return _.maxBy(blogcounts, 'blogs')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}