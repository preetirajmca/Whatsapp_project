const mongoose = require("mongoose");
const Chat =require("./models/chat.js");


main()
.then(() => {
    console.log ("connection-succesfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


let allChats = [
    {
        from: "preeti",
        to: "ram",
        msg: "send me exam sheet dear",
        created_at: new Date(),
    },
    {
        from: "sonu",
        to: "ramina",
        msg: "send me your no.",
        created_at: new Date(),
    },
    {
        from: "ravi",
        to: "hiro",
        msg: "come here",
        created_at: new Date(),
    },
    {
        from: "sunil",
        to: "manju",
        msg: "talk with me",
        created_at: new Date(),
    },
];
 Chat.insertMany (allChats);
 