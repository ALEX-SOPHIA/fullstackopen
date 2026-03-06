const dummy = (blogs) => {
    return 1
}

const totalLikes = (array) => {
    const reducer = (total, blog) => {
        return total + (blog.likes || 0)
    }
    return array.reduce(reducer, 0)
}

module.exports = {
    dummy,
    totalLikes
}