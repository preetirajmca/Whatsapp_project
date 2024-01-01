const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat =require("./models/chat.js");
const { error } = require("console");
const methodOverride = require("method-override"); 

app.set("views", path.join(__dirname, "views"));
app.set ("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded ({ extended: true }));
app.use(methodOverride ("_method"));


main()
.then(() => {
    console.log ("connection-succesfull");
})
.catch(err => console.log(err));

async function main() {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  }
  
// index route

 app.get("/chats", async (req, res) => {
     let chats = await Chat.find()
 console.log(chats);
res.render("index.ejs", {chats});
});


// New Route
app.get("/chats/new", (req, res) => {
res.render("new.ejs");
});

// create route
app.post("/chats", (req, res) => {
    let {from, to , msg} =req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newChat
    .save()
    .then((res )=> {
        console.log("chat was saved")
    })
    .catch((err) => {
        console.log(err);
    });

    res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit", async (req, res) =>{
    let { id } = req.params;
  let chat = await Chat.findById(id);
    res.render("edit.ejs" , { chat });
});

// Update route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg} = req.body;
    console.log(newMsg);
    let UpdatedChat = await Chat.findByIdAndUpdate(
        id,
         {msg: newMsg},
         { runValidators: true, new: true }
          );   
          console.log(UpdatedChat);
          res.redirect("/chats");
});

// Destroy Route 
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});



app.get("/", (req, res) => {
    res.send("root is working");
});

app.listen(8080, () => {
    console.log("server is listening on port 8080");
});