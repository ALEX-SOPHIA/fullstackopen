const {test,describe} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const emptyBlog = []
const oneBlog = [{
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }]
const listBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

describe('dummy', () => {
    test('dummy returns one', () => {
        const result = listHelper.dummy(emptyBlog)
        assert.strictEqual(result, 1)
    })
    
})

describe('total likes', () => {

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(emptyBlog)
        assert.strictEqual(result, 0)
    })
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(oneBlog)
        assert.strictEqual(result,5)
    })
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listBlogs)
        assert.strictEqual(result, 36)
    })
})

describe('favorite like', () => {
  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog(emptyBlog)
    assert.deepStrictEqual(result, null)
  })
  test('of one blog is itself', () => {
    const result = listHelper.favoriteBlog(oneBlog)
    assert.deepStrictEqual(result, oneBlog[0])
  })
  test('of many blogs is a blog with most likes', () => {
    const result = listHelper.favoriteBlog(listBlogs)
    const expected = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }
    assert.deepStrictEqual(result, expected)
  })
})

describe('most blogs', () => {
  test('of normal blog list returns the author with the highest number of blogs', () => {
    const expected = {
      author: "Robert C. Martin",
      blogs: 3
    }
    const result = listHelper.mostBlogs(listBlogs)
    assert.deepStrictEqual(result, expected)
  })
  test('of empty blog list returns null', () => {
    const result = listHelper.mostBlogs(emptyBlog)
    assert.deepStrictEqual(result, null)
  })
})

describe('most likes', () => {
  test('of normal blog list returns the author with the largest amount of likes', () => {
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    const result = listHelper.mostLikes(listBlogs)
    assert.deepStrictEqual(result, expected)
  })
  test('of empty list returns null', () => {
    const result = listHelper.mostLikes(emptyBlog)
    assert.deepStrictEqual(result, null)
  })
})