import {Server as SocketIOServer} from "socket.io";
import  { instrument } from '@socket.io/admin-ui'; 

const setupSocket = (server) => {
    const io = new SocketIOServer(server,{
        cors: {
            origin: [`http://localhost:5173`, 'https://admin.socket.io'],
            methods: ["GET","POST"],    
            credentials: true,
        },
    });

    const userSocketMap = new Map;

    io.on('connection', socket => {
        const userId = socket.handshake.query.username; // Access the userId sent as a query parameter
        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User with ID ${userId} connected with socket id: ${socket.id}`);
        } else {
            console.log("User ID not provided during connection");
        } 
        socket.on('code-update', (data) => {
            socket.broadcast.emit('update-code', data)
        })

    })

    // This is code for something called SocketIO Admin Dashboard, couldn't get it working
    // instrument(io, {
    //     auth: false,
    //   });

}



export default setupSocket;