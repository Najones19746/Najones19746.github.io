function dungeonGen(){
    fillMap();
    window.rooms = [];
    //room(leftX, topY, rightX, botY)
    var room1 = new room(115,130,130,115);
    window.rooms.push(room1);
    //var room2 = new room(115,175,130,145);
    //var room3 = new room(145,130,160,115);
    //var room4 = new room(70,90,90,70);
    //window.rooms.push(room1);
    //window.rooms.push(room2);
    //window.rooms.push(room3);
    //window.rooms.push(room4);
    //room1.connectTo(room2);
    //room1.connectTo(room3);
    //room1.connectTo(room4);
    roomGen(10);
    /*connectRooms(room1, room2);
    connectRooms(room1, room3);
    connectRooms(room1, room3);
    connectRooms(room1,room4);*/
}

function roomGen(numRooms)
{
    var i;
    var nextRoom, randRoom;
    var leftX, rightX, botY, topY;
    for(i=0; i < numRooms; i++)
    {
        console.log("starting attempt at creating room");
        leftX = randomBetween(10,200);
        rightX = randomBetween(leftX, leftX+20);
        botY = randomBetween(10,200);
        topY = randomBetween(botY, botY+20);

        nextRoom = new room(leftX,topY,rightX,botY);
        while (nextRoom == false)
        {
            console.log("attempting again");
            leftX = randomBetween(10,200);
            rightX = randomBetween(leftX, leftX+10);
            botY = randomBetween(10,200);
            topY = randomBetween(botY, botY+10);
            nextRoom = new room(leftX,topY,rightX,botY);
        }
        randRoom = rooms[ randomBetween(0,window.rooms.length - 1) ];

        randRoom.connectTo(nextRoom);
        //window.rooms.push(nextRoom);
    }


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

function room(leftX, topY, rightX, botY){
    this.leftX = leftX;
    this.topY = topY;
    this.rightX = rightX;
    this.botY = botY;
    this.centerX = Math.floor((this.leftX + this.rightX)/2);
    this.centerY = Math.floor((this.topY + this.botY)/2);
    var i,j;
    for(i=0; i<window.rooms.length; i++)
    {
        if(window.rooms[i].intersecting(this))
            return false;
    }


    for(i = leftX; i<= rightX; i++){
        for(j = botY; j<= topY; j++)
        {
            while(window.map[i][j].peek().type == "structure")
                window.map[i][j].pop();
        }
    }


    this.intersecting = function(room2)
    {
        return(this.leftX <= room2.rightX &&this.rightX >= room2.leftX && //need to confirm that this works.
        this.botY <= room2.topY && this.topY >= room2.botY)
    };

    this.connectTo = function(connectingRoom)
    {
        console.log("connecting");
        //If the center of this room is between the left and right bounds of the connecting room
        //AND the center of the connecting room is within the left and right bounds of this room
        if(this.centerX >= connectingRoom.leftX && this.centerX <= connectingRoom.rightX
            && connectingRoom.centerX >= this.leftX && connectingRoom.centerX <= this.rightX)
        {
            //If the center of this y is higher than the center of connecting rooms y
            if(this.centerY > connectingRoom.centerY)
            {
                makeVertHallway(this.centerX, connectingRoom.topY, this.botY);
            }
            else
            {
                makeVertHallway(this.centerX, this.topY, connectingRoom.botY);
            }
        }
        //If this and connecting room line up vertically...
        else if(this.centerY >= connectingRoom.botY && this.centerY <= connectingRoom.topY
                && connectingRoom.centerY >= this.botY && connectingRoom.centerY <= this.topY)
        {
            //If this is more right that connecting room
            if(this.centerX > connectingRoom.centerX)
            {
                makeHorizHallway(this.centerY, connectingRoom.rightX, this.leftX);
            }
            else
            {
                makeHorizHallway(this.centerY, this.rightX, connectingRoom.leftX);
            }
        }
        //The rooms do not line up vertically
        else
        {
            //If this center is left of the connecting room center
            console.log("diagonal");
            if(this.centerX < connectingRoom.centerX)
            {
                makeHorizHallway(this.centerY, this.rightX, connectingRoom.centerX);
            }
            else
            {
                makeHorizHallway(this.centerY, connectingRoom.centerX, this.rightX);
            }
            //If this is lower than connecting room center
            if(this.centerY < connectingRoom.centerY)
            {
                makeVertHallway(connectingRoom.centerX, this.topY, connectingRoom.centerY);
            }
            else
            {
                makeVertHallway(connectingRoom.centerX, connectingRoom.topY, this.centerY);
            }
        }

    };
    window.rooms.push(this);
    return this;
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
    for(i=y1; i<= y2; i++)
    {
        while(window.map[x][i].peek().type == "structure")
        {
            window.map[x][i].pop();
        }
    }
}