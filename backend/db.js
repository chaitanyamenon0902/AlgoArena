const mongoose=require('mongoose')

try{
  // change the mongoDB connection string to use the database, or you could you mine too
    mongoose.connect("mongodb+srv://vyn_20:EeST3xhUh6vC2r38@algoarena.qpada.mongodb.net/?retryWrites=true&w=majority&appName=AlgoArena")
    console.log("connected to database");
}catch(e){
    console.log("Some Error while connecting to Database")
}

const userSchema = mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true },
  email: { 
    type: String, 
    required: true, 
    unique: true },
  password: { 
    type: String, 
    required: true },
  createdAt: { type: Date, 
    default: Date.now },
});

const RoomSchema = mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User=mongoose.model('User',userSchema);
const Room = mongoose.model('Room', RoomSchema);
module.exports={
    User,
    Room
}