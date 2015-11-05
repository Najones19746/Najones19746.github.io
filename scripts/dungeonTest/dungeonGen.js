function dungeonGen(){
    fillMap();
    //createRoom(topleftX, topleftY, botrightX, botrightY)
    var room1 = new createRoom(115,115,130,130);
    console.log(room1.botrightX);
    var room2 = new createRoom(115,145,130,175);
    var room3 = new createRoom(145,115,160,130);
    var room4 = new createRoom(90,90,100,100);
    //makeVertHallway(122, 130, 145);
    console.log(room1);
    connectRooms(room1, room2);
    connectRooms(room1, room3);
    connectRooms(room1, room3);
}

function fillMap()
{
    var i,j;
    var wall = getObjectById(window.structureObjects, "wall");
    for(i=1; i<248; i++)
    {
        for(j=1; j<248; j++)
        {
            window.map[i][j].push(wall);
        }
    }
}

function createRoom(topleftX, topleftY, botrightX, botrightY){
    this.topleftX = topleftX;
    this.topleftY = topleftY;
    this.botrightX = botrightX;
    this.botrightY = botrightY;
    var i,j;
    for(i = topleftX; i<= botrightX; i++){
        for(j = topleftY; j<= botrightY; j++)
        {
            window.map[i][j].pop();
        }
    }
    return this;
}


function connectRooms(room1, room2) {
    var room1x, room2x, room1y, room2y, leftx, rightx, topy, boty;
    room1x = Math.floor( (room1.botrightX + room1.topleftX) /2);
    room1y = Math.floor( (room1.topleftY + room1.botrightY) /2);
    room2x = Math.floor( (room2.botrightX + room2.topleftX) /2);
    room2y = Math.floor( (room2.topleftY + room2.botrightY) /2);

    console.log(room1x);
    if(room1x > room2.topleftX && room1x < room2.botrightY) // room1 is within the horizontal space of room 2
    {

        if(room1.topleftY < room2.botrightY) //  room1 is below room2
        {
            console.log("attempting horizontal space");
            console.log(room1);
            console.log(room2);
            makeVertHallway(room1x, room1.topleftY, room2.botrightY);
        }
        else //room1 is above room2
        {

            makeVertHallway(room1x, room2.topleftY +1, room1.botrightY -1);
        }
    }
    else if(room1y > room2.botrightY && room1y < room2.topleftY) // room1 is within the vertical space of room 2
    {
        if(room1.botrightX < room2.topleftX) //room1 is left of room2
        {
            makeHorizHallway(room1y,room1.botrightX+1, room2.topleftX-1);
        }
        else // room1 is right of room2
        {
            makeHorizHallway(room1y, room2.botrightX+1, room2.topleftX-1);
        }
    }
    else if(room2x > room1.topleftX && room2x < room1.botrightX) // room2 is within the horizontal space of room1
    {
        if(room2.topleftY < room1.botrightY) // room2 is below room1
        {
            makeVertHallway(room2x, room2.topleftY+1, room1.botrightY-1);
        }
        else //room2 is above room1
        {
            makeVertHallway(room2x, room1.topleftY+1, room2.botrightY-1);
        }
    }
    else if(room2y > room1.botrightY && room2y < room1.topleftY) //room2 is within vertical space of room1
    {
        if (room2.botrightX < room1.topleftX)//room2 is left of room1
        {
            makeHorizHallway(room2y, room2.botrightX+1, room1.topleftX-1);

        }
        else //room2 is left of room1
        {
            makeHorizHallway(room2y, room1.botrightX+1, room2.topleftX-1);
        }
    }
    else // rooms are diagonal to each other
    {
        console.log("Diagonal room connection");
        if(room1x < room2x) // room 1 is to the left
        {

            if (room1y < room2y) // room1 is below
            {
                makeHorizHallway(room1y,room1.botrightX,room2x);
                makeVertHallway(room2x, room1y, room2.botrightY)
            }
            else // room1 is above
            {
                makeHorizHallway(room1y,room1.botrightX,room2x);
                makeVertHallway(room2x, room2y, room1.botrightY);
            }
        }
        else //room1 is to the right
        {
            if (room1y < room2y) // room1 is below
            {
                makeHorizHallway(room2y,room2.botrightX,room1x);
                makeVertHallway(room2x, room1y, room2.botrightY)
            }
            else // room1 is above
            {
                makeHorizHallway(room2y,room2.botrightX,room1x);
                makeVertHallway(room2x, room2y, room1.botrightY);
            }
        }
    }
}

function makeHorizHallway(y, x1, x2)
{
    var i;
    for(i=x1; i<=x2; i++){
        while(window.map[i][y].peek().type == "structure")
            window.map[i][y].pop();
    }
}

function makeVertHallway(x, y1, y2){
    var i;
    console.log(y1);
    console.log(y2);
    for(i=y1; i<= y2; i++)
    {
        console.log(window.map[x][i].peek().type);
        while(window.map[x][i].peek().type == "structure")
        {
            window.map[x][i].pop();
        }
    }
}