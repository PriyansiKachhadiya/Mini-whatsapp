const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(()=>{console.log("connection is succesful")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');

}

Chat.insertMany([{
    from:"neha",
    to:"priya",
    msg:"send me your exam sheets",
    created_at: new Date()
},{
    from: "rahul",
    to: "rohan",
    msg: "Let's meet at 5 PM",
    created_at: new Date()
},
{
    from: "sonia",
    to: "amit",
    msg: "Can you send the project files?",
    created_at: new Date()
},
{
    from: "vikas",
    to: "sanjay",
    msg: "Happy Birthday! Let's celebrate!",
    created_at: new Date()
},
{
    from: "nisha",
    to: "riya",
    msg: "Did you receive the package?",
    created_at: new Date()
},
{
    from: "arjun",
    to: "divya",
    msg: "Check your email for the details",
    created_at: new Date()
}

])

