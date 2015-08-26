/**
 * Created by Owner on 8/25/2015.
 */



var map = null;
var visible = null;
var groundObjects;
var itemObjects;
var monsterObjects;
var structureObjects;
var player = {xPos:0, yPos: 0, symbol: "@"};
const viewWidth = 51;
const viewHeight = 31;
const mapWidth = 250;
const mapHeight = 250;
const entityViewerName = "entities";

Array.prototype.last = function() {
    return this[this.length-1];
}


document.addEventListener("keydown", function(e) {
    var keyValue = e.keyCode - 96;
    map[player.xPos][player.yPos].pop();

    switch (keyValue) {
        case 1:

            player.xPos -= 1;
            player.yPos -= 1;
            break;
        case 2:
            player.yPos -= 1;
            break;
        case 3:
            player.xPos += 1;
            player.yPos -= 1;
            break;
        case 4:
            player.xPos -= 1;
            break;
        case 5:
            break;
        case 6:
            player.xPos += 1;
            break;
        case 7:
            player.xPos -= 1;
            player.yPos += 1;
            break;
        case 8:
            player.yPos += 1;
            break;
        case 9:
            player.xPos += 1;
            player.yPos += 1;
            break;
        default:
            break;
    }
    map[player.xPos][player.yPos].push(player);
    vision();
});


function init() {


    $.ajaxSetup({
        async: false
    });

    $.getJSON("json/ground.json", function (json) {
        groundObjects = json;
    });

    $.getJSON("json/items.json", function (json) {
        itemObjects = json;
    });
    $.getJSON("json/monsters.json", function (json) {
        monsterObjects = json;
    });
    $.getJSON("json/structures.json", function (json) {
        structureObjects = json;
    });

    map = [];
    visible = [viewWidth][viewHeight];
    player.xPos = mapWidth/2;
    player.yPos = mapHeight/2;

    for (var i = 0; i < 250; i++) {
        map[i]= new Array();
        for (var j = 0; j < 250; j++) {
            map[i][j] = new Array();
            map[i][j].push(groundObjects[1]);
        }
    }
    map[player.xPos][player.yPos].push(player);
    map[0][0].push(structureObjects[1]);
    map[0][249].push(structureObjects[1]);
    map[249][0].push(structureObjects[1]);
    map[249][249].push(structureObjects[1]);
    map[130][130].push(structureObjects[1]);
    for(i = 1; i < 250; i++){
        map[i][1].push(structureObjects[1]);
        map[i][248].push(structureObjects[1]);
        map[1][i].push(structureObjects[1]);
        map[248][i].push(structureObjects[1]);
    }

vision();
}




function vision(){
    var leftX = player.xPos - Math.floor(viewWidth/2);
    var topY =  player.yPos - Math.floor(viewHeight/2);
    var buffer = "";
    for(y=topY+viewHeight; y>topY;y--){
        for(x=leftX; x<leftX+viewWidth; x++){
            buffer += map[x][y].last().symbol;
            }
        buffer += "<br>";
    }
    document.getElementById(entityViewerName).innerHTML = buffer;
}