import express from 'express'
import cors from 'cors'
import user from './user.js'
import tweets from './tweets.js'

const app = express();
app.use(cors());
app.use(express.json())

app.get("/tweets", (req,res)=>{
    const lastTen =  tweets.slice(-10);
    res.send(lastTen);
})

app.post("/sign-up", (req,res) =>{
    const signInData = req.body;
    user.push(signInData);
    res.send("OK")
})

app.post("/tweets", (req,res)=>{
    const tweetData = req.body;
    const userData = user.find(user => user.username === tweetData.username)
    tweetData.avatar =  userData.avatar
    tweets.push(tweetData);
    if (!userData){
        res.send("User not found")
        return 
    }
    res.send("OK")
})

app.listen(5000, ()=>{
    console.log("Server is running on: http://localhost:5000")
})



