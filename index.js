const express = require("express");
const app = express();
const path = require("path");
const Chat = require("./models/chat.js");
const method_override = require("method-override");
const ExpressError = require("./ExpressError");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}))
app.use(method_override("_method"));
// Error handling middleware



const mongoose = require("mongoose");
main().then(()=>{console.log("connection is succesful")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');

}

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})

// Update route
app.put("/chats/:id", async (req, res, next) => {
    try {
        let { id } = req.params;
        let { msg: newMsg } = req.body;
        let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true });
        console.log(updatedChat);
        res.redirect("/chats");
    } catch (err) {
        next(err);  // Pass the error to the error handling middleware
    }
});

// Edit route
app.get("/chats/:id/edit", async (req, res, next) => {
    try {
        let { id } = req.params;
        let chat = await Chat.findById(id);
        res.render("edit.ejs", { chat });
    } catch (err) {
        next(err);
    }
});

// Show route
app.get("/chats/:id", async (req, res, next) => {
    try {
        let { id } = req.params;
        let chat = await Chat.findById(id);
        if (!chat) {
            throw new ExpressError('Chat not found', 404);
        }
        res.render("edit.ejs", { chat });
    } catch (err) {
        next(err);
    }
});



// create route
app.post("/chats",async(req,res,next)=>{
    try{
    let {from , to , msg} = req.body;
    let newChat = new Chat({
        from : from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    await  newChat.save()
    

    res.redirect("/chats")
}
    catch(err){
        next(err);
    }
})


// Index route
app.get("/chats", async (req, res, next) => {
    try {
        let chats = await Chat.find();
        res.render("index.ejs", { chats });
    } catch (err) {
        next(err);
    }
});

// Destroy route
app.delete("/chats/:id", async (req, res, next) => {
    try {
        let { id } = req.params;
        let DeletedChat = await Chat.findByIdAndDelete(id);
        console.log(DeletedChat);
        res.redirect("/chats");
    } catch (err) {
        next(err);
    }
});








app.get("/",(req,res)=>{
    res.send("root working");
})



app.use((err,req,res,next)=>{
    let {status = 500 , message = "some error occured"} = err;
    res.status(status).send(message);
   
})  
app.listen(8080,()=>{
    console.log("server is listening on port 8080");
})