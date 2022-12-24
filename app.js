const { performMoves } = require('./moving.js');

const axios = require('axios').default;


let BOARD_API = process.env.BOARD_API;
let COMMANDS_API = process.env.COMMANDS_API;

Promise.all([axios.get(BOARD_API),axios.get(COMMANDS_API)])
.then(arr => {
    let board = arr[0].data, commands = arr[1].data.commands;
    //console.log(commands);
    let track = performMoves(board,commands);
    console.log(JSON.stringify(track, null, 2));
} );


