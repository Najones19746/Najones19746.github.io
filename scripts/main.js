/**
 * Created by Owner on 8/25/2015.
 */



var map = null;
var visible = null;
var groundObjects;
var itemObjects;
var monsterObjects;
var structureObjects;
var player = {xPos:0, yPos: 0, symbol: "@", color: "green"};
var menuState = false;
const viewWidth = 51;
const viewHeight = 31;
const mapWidth = 250;
const mapHeight = 250;
const entityViewerName = "entities";

Array.prototype.peek = function() {
    return this[this.length-1];
};


document.addEventListener("keydown", function(e) {
    if (menuState == false)
        move(e);
});

function move(e){
    var keyValue = e.keyCode - 96;
    var xChange = 0;
    var yChange = 0;
    switch (keyValue) {
        case 1:

            xChange -= 1;
            yChange -= 1;
            break;
        case 2:
            yChange -= 1;
            break;
        case 3:
            xChange += 1;
            yChange -= 1;
            break;
        case 4:
            xChange -= 1;
            break;
        case 5:
            break;
        case 6:
            xChange += 1;
            break;
        case 7:
            xChange -= 1;
            yChange += 1;
            break;
        case 8:
            yChange += 1;
            break;
        case 9:
            xChange += 1;
            yChange += 1;
            break;
        default:
            break;
    }

if(map[player.xPos+xChange][player.yPos+yChange].peek().type == "structure" && !checkFlag("pathable", map[player.xPos+xChange][player.yPos+yChange].peek()))
    {
        vision();
        console.log("well fuck");
        return 0;
    }
        map[player.xPos][player.yPos].pop();
        player.xPos += xChange;
        player.yPos += yChange;
        map[player.xPos][player.yPos].push(player);
        vision();


}

function checkFlag(flag, ob){
    for (var prop in ob.flag){
        if (prop == flag)
            return true;
    }
    return false;
}


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
    for(i = 1; i < 249; i++){
        map[i][0].push(structureObjects[1]);
        map[i][249].push(structureObjects[1]);
        map[0][i].push(structureObjects[1]);
        map[249][i].push(structureObjects[1]);
    }

vision();
}




function vision(){
    var leftX, topY;

    if(player.xPos - Math.floor(viewWidth/2) < 0)
    leftX = 0;
    else if(player.xPos + Math.floor(viewWidth/2) > mapWidth)
    leftX = mapWidth - viewWidth;
    else
    leftX = player.xPos - Math.floor(viewWidth/2);


    if(player.yPos - Math.floor(viewHeight/2) < 0)
        topY = 0;
    else if(player.yPos + Math.floor(viewHeight/2) >= mapHeight)
        topY = mapHeight - viewHeight -1 ;
    else
        topY = player.yPos - Math.floor(viewHeight/2) -1;
    //if(player.xPos - Math.floor(viewWidth/2) < 0)
    //leftX = player.xPos - Math.floor(viewWidth/2);
    //else
    //leftX = 0;
    //if(player.yPos - Math.floor(viewHeight/2) > 0)
    //topY =  player.yPos - Math.floor(viewHeight/2);
    //else
    //topY = 0;
    var buffer = "";
    for(var y=topY+viewHeight; y>=topY;y--){
        for(var x=leftX; x<leftX+viewWidth; x++){
            buffer +="<div style=\"display:inline;color:" + map[x][y].peek().color + "\">" + map[x][y].peek().symbol +"</div>";
            }
        buffer += "<br>";
    }
    document.getElementById(entityViewerName).innerHTML = buffer;
}