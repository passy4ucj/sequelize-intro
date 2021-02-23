const express = require('express')

// Creating an express app
const app = express() 

// using JSON parser
app.use(express.json())


app.get('/', (req, res) => {
    res.json({
        message: "Hello, World!"
    })
})




const PORT = process.env.PORT || 5000
app.listen(PORT, (req, res) => {
    console.log(`Server running on PORT ${PORT}`)
})