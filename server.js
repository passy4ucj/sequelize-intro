const express = require('express')
const { User, Post } = require('./models')

// Creating an express app
const app = express() 

// using JSON parser
app.use(express.json())


app.get('/', (req, res) => {
    res.json({
        message: "Hello, World!"
    })
})

app.get('/post/:postId', async (req, res) => {
    const {postId} = req.params

    try {
        const post = await Post.findOne({where: {id: postId}, include: "creator_of_post"})
        res.json({
            post
        })
    } catch (error) {
        console.log(error)
        res.json({
            error: 'Server error'
        })
    }
})

app.post('/post/create', async (req, res) => {
    const { creator, title, body } = req.body
    try {
        const newPost = await Post.create(req.body)
        res.json({
            message: 'Post Created'
        })
    } catch (error) {
        res.json({
            error: 'Server error'
        })
    }
})

app.post('/user/create', async(req, res) => {
    const { username } = req.body
    try {
        const isExist = await User.findAll({ where: {username} })
        if(isExist.length > 0) return res.json({error: 'User already exists'})
        const newUser = await User.create({username})
        res.json({
            message: `${newUser.username} created`
        })
    } catch (error) {
        res.json({
            error: 'Server Error'
        })
    }
})




const PORT = process.env.PORT || 5000
app.listen(PORT, (req, res) => {
    console.log(`Server running on PORT ${PORT}`)
})