function dungeonGen(){
    fillMap();
    window.rooms = [];
    //room(leftX, topY, rightX, botY)
    var room1 = new room(115,130,130,115);
    var room2 = new room(115,175,130,145);
    var room3 = new room(145,130,160,115);
    var room4 = new room(70,90,90,70);
    room1.connectTo(room2);
    room1.connectTo(room3);
    room1.connectTo(room4);
    /*connectRooms(room1, room2);
    connectRooms(room1, room3);
    connectRooms(room1, room3);
    connectRooms(room1,room4);*/
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
    for(i = leftX; i<= rightX; i++){
        for(j = botY; j<= topY; j++)
        {
            window.map[i][j].pop();
        }
    }


    this.connectTo = function(connectingRoom)
    {
        if(this.centerX >= connectingRoom.leftX && this.centerX <= connectingRoom.rightX
            && connectingRoom.centerX >= this.leftX && connectingRoom.centerX <= this.rightX)
        {
            if(this.centerY > connectingRoom.centerY)
            {
                makeVertHallway(this.centerX, connectingRoom.topY, this.botY);
            }
            else
            {
                makeVertHallway(this.centerX, this.topY, connectingRoom.botY);
            }
        }
        else if(this.centerY >= connectingRoom.botY && this.centerY <= connectingRoom.topY
                && connectingRoom.centerY >= this.botY && connectingRoom.centerY <= this.topY)
        {
            if(this.centerX > connectingRoom.centerX)
            {
                makeHorizHallway(this.centerY, connectingRoom.rightX, this.leftX);
            }
            else
            {
                makeHorizHallway(this.centerY, this.rightX, connectingRoom.leftX);
            }
        }
        else
        {
            if(this.centerX < connectingRoom.centerX)
            {
                makeHorizHallway(this.centerY, this.rightX, connectingRoom.centerX);
            }
            else
            {
                makeHorizHallway(this.centerY, connectingRoom.centerX, this.rightX);
            }
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