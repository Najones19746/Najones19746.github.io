/**
 * Created by Nick on 7/5/2017.
 */

function resetMap(){
    window.map = [];
    visible = [viewWidth][viewHeight];

    var dirt = getObjectById(window.groundObjects, "dirt");
    var wall = getObjectById(window.structureObjects, "wall");
    for (var i = 0; i < 250; i++) {
        window.map[i] = [];
        for (var j = 0; j < 250; j++) {
            window.map[i][j] = [];
            window.map[i][j].push(dirt);
            window.map[i][j].lit = false;
            window.map[i][j].lookFlag = false;
            window.map[i][j].unseen = true;
            window.map[i][j].lastSymbol = null;
            window.map[i][j].cameFrom = null;
            window.map[i][j].gScore = Infinity;
            window.map[i][j].fScore = Infinity;
            window.map[i][j].neighbors = [];
            window.map[i][j].xPos = i;
            window.map[i][j].yPos = j;
        }
    }

    for(i=0; i< mapWidth;i++){
        for(j=0; j<mapHeight; j++)
        {
            var k = 0;
            //left
            if (i - 1 >= 0) {
                window.map[i][j].neighbors[k] = window.map[i - 1][j];
                window.map[i][j].neighbors[k].xPos = i-1;
                window.map[i][j].neighbors[k].yPos = j;
                k++;
            }
            //up-left
            if (i - 1 >= 0 && j + 1 < mapHeight) {
                window.map[i][j].neighbors[k] = window.map[i - 1][j + 1];
                window.map[i][j].neighbors[k].xPos = i-1;
                window.map[i][j].neighbors[k].yPos = j+1;
                k++;
            }
            //up
            if (j + 1 < mapHeight) {
                window.map[i][j].neighbors[k] = window.map[i][j + 1];
                window.map[i][j].neighbors[k].xPos = i;
                window.map[i][j].neighbors[k].yPos = j+1;
                k++;
            }
            //up right
            if (i + 1 < mapWidth && j + 1 < mapHeight) {
                window.map[i][j].neighbors[k] = window.map[i + 1][j + 1];
                window.map[i][j].neighbors[k].xPos = i+1;
                window.map[i][j].neighbors[k].yPos = j+1;
                k++;
            }
            //right
            if (i + 1 < mapWidth) {
                window.map[i][j].neighbors[k] = window.map[i + 1][j];
                window.map[i][j].neighbors[k].xPos = i+1;
                window.map[i][j].neighbors[k].yPos = j;
                k++;
            }
            //right down
            if (i + 1 < mapWidth && j - 1 >= 0) {
                window.map[i][j].neighbors[k] = window.map[i + 1][j - 1];
                window.map[i][j].neighbors[k].xPos = i+1;
                window.map[i][j].neighbors[k].yPos = j-1;
                k++;
            }
            //down
            if (j - 1 >= 0) {
                window.map[i][j].neighbors[k] = window.map[i][j - 1];
                window.map[i][j].neighbors[k].xPos = i;
                window.map[i][j].neighbors[k].yPos = j-1;
                k++;
            }
            //down left
            if (i - 1 >= 0 && j - 1 >= 0) {
                window.map[i][j].neighbors[k] = window.map[i - 1][j - 1];
                window.map[i][j].neighbors[k].xPos = i-1;
                window.map[i][j].neighbors[k].yPos = j-1;
                k++;
            }
            //done?

        }
    }

    window.map[0][0].push(wall);
    window.map[0][249].push(wall);
    window.map[249][0].push(wall);
    window.map[249][249].push(wall);
    //window.map[130][130].push(wall);
    for (i = 1; i < 249; i++) {
        window.map[i][0].push(wall);
        window.map[i][249].push(wall);
        window.map[0][i].push(wall);
        window.map[249][i].push(wall);
    }
}

function testAstarDungeon(roomCount) {
    resetMap();
    window.rooms = [];
    var room1 = new room(115,130,130,115);
    dungeonGen(roomCount);
    var startX = randomBetween(1,mapWidth-1);
    var startY = randomBetween(1, mapHeight-1);
    while (window.map[startX][startY].peek().type == "structure"
        && !checkFlag("pathable", window.map[startX][startY].peek()))
    {
        startX = randomBetween(1,mapWidth-1);
        startY = randomBetween(1, mapHeight-1);
    }

    var endX =randomBetween(1, mapWidth-1);
    var endY = randomBetween(1,mapHeight-1);
    var startObject = {"xPos" : startX, "yPos": startY};
    var endObject = {"xPos": endX, "yPos": endY};
    while (window.map[endX][endY].peek().type == "structure"
    && !checkFlag("pathable", window.map[endX][endY].peek()) && heuristic(startObject, endObject) > 10 )
    {
        endX = randomBetween(1,mapWidth-1);
        endY = randomBetween(1, mapHeight-1);
        endObject = {"xPos": endX, "yPos": endY};
    }

    //return findPath(window.map[startX][startY], window.map[endX][endY]);
        return {"start": startObject, "end": endObject};
}

function initTestAStar(){
    var i;
    for(i=0; i< 3000 ; i++)
    {
        var pathInitObject = testAstarDungeon(20);
        var t0 = performance.now();
        var path = findPath(  window.map[pathInitObject.start.xPos][pathInitObject.start.yPos] , window.map[pathInitObject.end.xPos][pathInitObject.end.yPos]  );
        var t1 = performance.now();




        if (path == -1)
            i--;
        else
        {
            console.log("TIME");
            console.log((t1 - t0) + "ms.");
            console.log("LENGTH");
            console.log(path.length);
            console.log("HEURISTIC");
            console.log(heuristic(path[0],path[path.length -1 ]));


        }
    }
}