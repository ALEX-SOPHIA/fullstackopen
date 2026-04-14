const bcrypt = require('bcrypt')
const User = require('../models/user')
const { test, beforeEach, describe, after } = require('node:test')
const assert = require('node:assert')
const helper = require('./blog_api_helper')
const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')

const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('fails with status 400 if username is duplicate', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with status 400 if username is missing', async () => {
        const usersAtStart = await helper.usersInDb()
        const missingUsernameUser = {
            name: 'nousername',
            password: '1234'
        }
        const result = await api
            .post('/api/users')
            .send(missingUsernameUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('`username` is required'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with status 400 if username is shorter than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()
        const belowMinLengthUser = {
            username: 'Al',
            name: '2-characters',
            password: '1234'
        }
        const result = await api
            .post('/api/users')
            .send(belowMinLengthUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('shorter than the minimum allowed length (3).'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with status 400 if password is missing', async () => {
        const usersAtStart = await helper.usersInDb()
        const missingPasswordUser = {
            username: 'AlexwithoutPassowrd',
            name: 'Alex'
        }
        const result = await api
            .post('/api/users')
            .send(missingPasswordUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('password must have at least 3 characters'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with status 400 if password is shorter than the minimum allowed length', async () => {
        const usersAtStart = await helper.usersInDb()
        const PwBelowMinLengthUser = {
            username: 'Alexwithshorterpassword',
            name: 'Alex',
            password: '12'
        }
        const result = await api
            .post('/api/users')
            .send(PwBelowMinLengthUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('password must have at least 3 characters'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})