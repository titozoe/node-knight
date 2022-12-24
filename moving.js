

function performMoves(board,commands) {

    var track = {};

    // old for loop... needed for being able to break
    for (let command of commands) {
        if (track.status && track.status != "SUCCESS"){break;}
        track = singleMove(command, board, track)
    } 

    return track;  

}

function singleMove(commandString, board, track){

    let tokens = commandString.split(" ");

    var cmd = tokens[0];
    var args = tokens[1];

    switch(cmd) {
        case "START":
            return startMove(args,board);
        case "ROTATE":
            return rotation(args,track);
        case "MOVE":
            return straightMove(args,track,board)
        default:
            return {status:"GENERIC_ERROR"};
        }  
}



function startMove(args, board){

    let tokens = args.split(',');

    let x = parseInt(tokens[0])
    , y = parseInt(tokens[1])
    , direction=tokens[2];

    let status = obstacleAt(x,y, board) ? "INVALID_START_POSITION" : "SUCCESS";

    let output = {status : status};

    if ("SUCCESS" == status){

        let position = {};
        position.x = x;
        position.y = y;
        position.direction = direction; 

        output.position = position;

    }

    return output;

}

function rotation(args,track){

    track.position.direction = args;
    return track;

}


function straightMove(args,track,board){

    let steps = parseInt(args); 

    while (steps > 0){

        var x = track.position.x
        , y=track.position.y;

        switch(track.position.direction){

            case "NORTH":
                if (outsideBoard(x,y+1,board)){
                    return {status:"OUT_OF_THE_BOARD"};
                } else if(!obstacleAt(x,y+1, board)){
                    track.position.y = y+1;
                }
                break;
            case "SOUTH":
                if (outsideBoard(x,y-1,board)){
                    return {status:"OUT_OF_THE_BOARD"};
                } else if(!obstacleAt(x,y-1, board)){
                    track.position.y = y-1;
                }
                break;
            case "EAST":
                if (outsideBoard(x+1,y,board)){
                    return {status:"OUT_OF_THE_BOARD"};
                } else if(!obstacleAt(x+1,y, board)){
                    track.position.x = x+1;
                }
                break;
            case "WEST":
                if (outsideBoard(x-1,y,board)){
                    return {status:"OUT_OF_THE_BOARD"};
                } else if(!obstacleAt(x-1,y, board)){
                    track.position.x = x-1;
                }
                break;
            default:
                return {status:"GENERIC_ERROR"};
        
        }

        steps--;

    }

    return track;

}

function outsideBoard(x,y, board){
    return x < 0 
    || x >= board.width
    || y < 0
    || y >= board.height;
}


function obstacleAt(x,y, board){
    return board.obstacles
    .find(point => point.x == x && point.y == y);
}

module.exports = {
    performMoves : performMoves
};