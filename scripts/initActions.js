/**
 * Created by Nick on 10/22/2015.
 */

document.addEventListener("keydown", function (e) {

    //If not in menu, move (only state as of now)
    if (menuState == false)
        move(e);

});

Array.prototype.peek = function () {
    return this[this.length - 1];
};

//randomBetween is an inclusive both ways function
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);

}

function godVision() {
    var i, j;
    for (i = 0; i < 250; i++) {
        for (j = 0; j < 250; j++) {
            window.map[i][j].lastSymbol = window.map[i][j].peek().symbol;
            window.map[i][j].unseen = false;
        }
    }
}

function init() {

    $.ajaxSetup({
        async: false
    });
    $.getJSON("json/ground.json", function (json) {
        window.groundObjects = json;
    });

    $.getJSON("json/items.json", function (json) {
        window.itemObjects = json;
    });

    $.getJSON("json/monsters.json", function (json) {
        window.monsterObjects = json;
    });
    $.getJSON("json/structures.json", function (json) {
        window.structureObjects = json;
    });
    window.log = new messageLog();
    window.player = new actor("@", "green", "You" , 1000, 500, 125, 125);
    window.playerLight = new LightSource(window.player, 20);
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

    dungeonGen();


    window.map[window.player.xPos][window.player.yPos].push(window.player);
    actorList.push(window.player);
    //window.actorQueue.push(window.player,window.player.initiative);
    var enemy = new actor("~", "red", "Hostile human" , 300, 350, 125, 120);
    enemy.weapon = getObjectById(window.itemObjects, "sword");
    actorList.push(enemy);
    //window.actorQueue.push(enemy, enemy.initiative);
    window.map[enemy.xPos][enemy.yPos].push(enemy);
    document.getElementById("playerInit").innerHTML = String(window.player.initiative);
    document.getElementById("playerHP").innerHTML = String(window.player.hp);

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
    /*for(i=10; i < 240; i+=10){
     for(j=10; j < 240; j+=10){
     window.map[i][j].push(getObjectById(window.structureObjects, "debug_wall"));
     window.map[i][j].visible = false;
     window.map[i][j].lit = false;
     window.map[i][j].lastSymbol = null;
     }
     }*/
    for (i = 0; i < actorList.length; i++)
        actorQueue.push(actorList[i], actorList[i].initiative);


    vision();
}