const express = require('express')
const { User } = require('./models')

// Creating an express app
const app = express() 

// using JSON parser
app.use(express.json())


app.get('/', (req, res) => {
    res.json({
        message: "Hello, World!"
    })
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