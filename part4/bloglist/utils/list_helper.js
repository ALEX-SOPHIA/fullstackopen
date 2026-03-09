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


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}