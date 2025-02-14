const mongoose=require('mongoose')

try{
    mongoose.connect("mongodb://127.0.0.1:27017/algoarena")
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