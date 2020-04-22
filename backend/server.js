// import express from 'express'
// import morgan from 'morgan'
// import bodyParser from 'body-parser'
// import cookieParser from 'cookie-parser'
// import cors from 'cors'
// import mongoose from 'mongoose'

require('dotenv').config();
const express= require('express')
const morgan=require('morgan')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const mongoose= require('mongoose')



//get the routes
// import blogRoutes from './routes/blog'
// import authRoutes from './routes/auth'
// import userRoutes from './routes/user'
// import categoryRoutes from './routes/category'
// import tagRoutes from './routes/tag'
// import formRoutes from './routes/form'
const blogRoutes=require('./routes/blog')
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')
const categoryRoutes=require('./routes/category')
const tagRoutes=require('./routes/tag')
const formRoutes=require('./routes/form')





//app
const app= express()

//db
let cloudDB = process.env.MONGO_URI;
let currentDB = cloudDB ? process.env.MONGO_URI : process.env.LOCAL_DB

mongoose.connect(currentDB, {useNewUrlParser:true, useCreateIndex:true, useFindAndModify:false,useUnifiedTopology: true })
.then(()=>console.log('db connected'))
.catch((err) => console.log(err))


//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())
app.use(cookieParser())

//cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//routes middleware prefix with api
app.use('/api', blogRoutes)
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', tagRoutes)
app.use('/api', formRoutes)


//port
const port = process.env.PORT || 8000
app.use('/',(req,res)=>{
    res.send("Default")
})
app.listen(port,()=>{
    console.log(`Hello server on port ${port}`)
})