/**
 * Created by Owner on 8/25/2015.
 */


//Global variables
var map = null;
var visible = null;
var groundObjects;
var itemObjects;
var monsterObjects;
var structureObjects;
var player = {xPos:0, yPos: 0, symbol: "@", color: "green"};
var menuState = false;


Array.prototype.peek = function() {
    return this[this.length-1];
};


document.addEventListener("keydown", function(e) {

    //If not in menu, move (only state as of now)
    if (menuState == false)
        move(e);
});

function move(e){

    //ONLY PASS KEYPAD OR ARROWS
    var keyValue = e.keyCode;

    var xChange = 0;
    var yChange = 0;
    switch (keyValue) {
        case 97:
            xChange -= 1;
            yChange -= 1;
            break;
        case 40:
        case 98:
            yChange -= 1;
            break;
        case 99:
            xChange += 1;
            yChange -= 1;
            break;
        case 37:
        case 100:
            xChange -= 1;
            break;
        case 101:
            break;
        case 39:
        case 102:
            xChange += 1;
            break;
        case 103:
            xChange -= 1;
            yChange += 1;
            break;
        case 38:
        case 104:
            yChange += 1;
            break;
        case 105:
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

function getObjectById(collection, value){
    for(var i = 0; i < collection.length; i++){
        if (collection[i].id == value)
            return collection[i];
    }
    return collection[0];
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
    var dirt =  getObjectById(groundObjects, "dirt");
    var wall = getObjectById(structureObjects, "wall");
    for (var i = 0; i < 250; i++) {
        map[i]= new Array();
        for (var j = 0; j < 250; j++) {
            map[i][j] = new Array();
            map[i][j].push(dirt);
        }
    }
    map[player.xPos][player.yPos].push(player);
    map[0][0].push(wall);
    map[0][249].push(wall);
    map[249][0].push(wall);
    map[249][249].push(wall);
    //map[130][130].push(wall);
    for(i = 1; i < 249; i++){
        map[i][0].push(wall);
        map[i][249].push(wall);
        map[0][i].push(wall);
        map[249][i].push(wall);
    }
    for(i=10; i < 240; i+=10){
        for(j=10; j < 240; j+=10){
            map[i][j].push(getObjectById(structureObjects, "debug_wall"));
            map[i][j].visible = false;
            map[i][j].lit = false;
        }
    }

vision();
}




function vision(){
    var leftX, botY;

    if(player.xPos - Math.floor(viewWidth/2) < 0)
    leftX = 0;
    else if(player.xPos + Math.floor(viewWidth/2) >= mapWidth)
    leftX = mapWidth - viewWidth;
    else
    leftX = player.xPos - Math.floor(viewWidth/2);


    if(player.yPos - Math.floor(viewHeight/2) <= 0)
        botY = 0;
    else if(player.yPos + Math.floor(viewHeight/2) >= mapHeight)
        botY = mapHeight - viewHeight -1 ;
    else
        botY = player.yPos - Math.floor(viewHeight/2) -1;
    var buffer = "";
    var prevColor = "";
    for(var y=botY+viewHeight; y>=botY;y--){
        for(var x=leftX; x<leftX+viewWidth; x++){
            if(map[x][y].peek().color == prevColor){
                buffer += map[x][y].peek().symbol;
            }
            else{
                if (prevColor != ""){
                    buffer += "</div>";
                }
                buffer +=  "<div style=\"display:inline;color:" + map[x][y].peek().color + "\">" + map[x][y].peek().symbol;
                prevColor = map[x][y].peek().color;
            }
        }
        buffer += "<br>";
    }
    document.getElementById(entityViewerName).innerHTML = buffer;
}