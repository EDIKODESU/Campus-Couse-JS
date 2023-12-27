const express = require('express');
const mainRoutes = require('./Router/main-routes');
const http = require('http');
const session = require('express-session');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);
const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/images'));
app.use(
    session({
        secret: 'session secret',
        saveUninitialized: true
    })
);

app.use(mainRoutes);

app.use((req, res, next) => {
    res.status(404).send("404 Not Found");
});

server.listen(PORT, () => {
    console.log(`Server start on http://localhost:${PORT}`);
});

let num_room = 1;
let players = [];
let count_players = 1;
let rooms = [];
let game_over_room = [];
let about_gor = {id1: '', score_id1: '', id2: '', score_id2: ''};
let info_about_player = {id: '', room: '', name: ''};
let about_room = {id1: '', id2: ''};
io.on("connection", function (socket) {
    // socket.emit("find_game", "Find game!!");
    socket.emit('new_player', {id: socket.id});
    socket.on('new_game', function (data) {
        socket.join(`room-${num_room}`);
        info_about_player.id = data.id;
        info_about_player.room = num_room;
        info_about_player.name = data.name;
        players.push(info_about_player);
        if(about_room.id1 == '') {
            about_room.id1 = data.id;
            // rooms[num_room].push(about_room.id1);
        } else if (about_room.id2 == '') {
            about_room.id2 = data.id;
            rooms.push(about_room);
            console.log(rooms);
            socket.emit('first_step', {fs_id: about_room.id1})
            num_room++;
        }
        console.log(info_about_player);
        
        // num_room++;
    });
    socket.on('start_game', function(data) {
        console.log(data.id);
        var pers = {};
        let i1 = 0;
        for (let i = 0; i < players.length; i++) {
            if (players[i].id === data.id) {
                pers = players[i];
                i1 = i;
                break;
            }
        }
        pers = players[i1];
        console.log(pers);
        let ab_room = rooms[pers.room - 1];
        console.log(ab_room);
        if (data.id === ab_room.id1) {
            io.sockets.to(ab_room.id2).emit('start_game', data);
        }
        else {
            io.sockets.to(ab_room.id1).emit('start_game', data);
        }
    });
    socket.on('name', function (data) {
        console.log(data.id);
        var pers = {};
        let i1 = 0;
        for (let i = 0; i < players.length; i++) {
            if (players[i].id === data.id) {
                pers = players[i];
                i1 = i;
                break;
            }
        }
        pers = players[i1];
        console.log(pers);
        let ab_room = rooms[pers.room - 1];
        console.log(ab_room);
        if (data.id === ab_room.id1) {
            io.sockets.to(ab_room.id2).emit('name', data);
        }
        else {
            io.sockets.to(ab_room.id1).emit('name', data);
        }
    });
    socket.on('next_stroke', function (data) {
        // socket.emit('next_stroke_end', 'dfg');
        console.log(data.id);
        var pers = {};
        let i1 = 0;
        for (let i = 0; i < players.length; i++) {
            if (players[i].id === data.id) {
                pers = players[i];
                i1 = i;
                break;
            }
        }
        pers = players[i1];
        console.log(pers);
        let ab_room = rooms[pers.room - 1];
        console.log(ab_room);
        if (data.id === ab_room.id1) {
            io.sockets.to(ab_room.id2).emit('next_stroke_end', data);
        }
        else {
            io.sockets.to(ab_room.id1).emit('next_stroke_end', data);
        }
    });

    socket.on('execution', function (data) {
        console.log(data.id);
        var pers = {};
        let i1 = 0;
        for (let i = 0; i < players.length; i++) {
            if (players[i].id === data.id) {
                pers = players[i];
                i1 = i;
                break;
            }
        }
        pers = players[i1];
        console.log(pers);
        let ab_room = rooms[pers.room - 1];
        console.log(ab_room);
        if (data.id === ab_room.id1) {
            io.sockets.to(ab_room.id2).emit('execution', data);
        }
        else {
            io.sockets.to(ab_room.id1).emit('execution', data);
        }
    });

    socket.on('gain', function (data) {
        console.log(data.id);
        var pers = {};
        let i1 = 0;
        for (let i = 0; i < players.length; i++) {
            if (players[i].id === data.id) {
                pers = players[i];
                i1 = i;
                break;
            }
        }
        pers = players[i1];
        console.log(pers);
        let ab_room = rooms[pers.room - 1];
        console.log(ab_room);
        if (data.id === ab_room.id1) {
            io.sockets.to(ab_room.id2).emit('gain', data);
        }
        else {
            io.sockets.to(ab_room.id1).emit('gain', data);
        }
    });
    socket.on('resurrection', function (data) {
        console.log(data.id);
        var pers = {};
        let i1 = 0;
        for (let i = 0; i < players.length; i++) {
            if (players[i].id === data.id) {
                pers = players[i];
                i1 = i;
                break;
            }
        }
        pers = players[i1];
        console.log(pers);
        let ab_room = rooms[pers.room - 1];
        console.log(ab_room);
        if (data.id === ab_room.id1) {
            io.sockets.to(ab_room.id2).emit('resurrection', data);
        }
        else {
            io.sockets.to(ab_room.id1).emit('resurrection', data);
        }
    });

    socket.on('shield', function (data) {
        console.log(data.id);
        var pers = {};
        let i1 = 0;
        for (let i = 0; i < players.length; i++) {
            if (players[i].id === data.id) {
                pers = players[i];
                i1 = i;
                break;
            }
        }
        pers = players[i1];
        console.log(pers);
        let ab_room = rooms[pers.room - 1];
        console.log(ab_room);
        if (data.id === ab_room.id1) {
            io.sockets.to(ab_room.id2).emit('shield', data);
        }
        else {
            io.sockets.to(ab_room.id1).emit('shield', data);
        }
    });

    socket.on("game_over", function (data) {
        if (about_gor.id1 === '') {
            about_gor.id1 = data.id;
            about_gor.score_id1 = data.score;
        }
        else if (about_gor.id2 === '') {
            about_gor.id2 = data.id;
            about_gor.score_id2 = data.score;
        }
        else {
            if (about_gor.score_id1 > about_gor.score_id2) {
                io.sockets.to(about_gor.id1).emit("winner", "You win");
                io.sockets.to(about_gor.id2).emit("loser", "You lose");
            }
            else {
                io.sockets.to(about_gor.id2).emit("winner", "You win");
                io.sockets.to(about_gor.id1).emit("loser", "You lose");
            }
        }
    });
});

