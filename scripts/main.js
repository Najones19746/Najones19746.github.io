/**
 * Created by Owner on 8/25/2015.
 */

var map = null;
var visible = null;
var groundObjects;
var itemObjects;
var monsterObjects;
var structureObjects;
var player = {xPos:0, yPos: 0};
const viewWidth = 31;
const viewHeight = 31;
const mapWidth = 250;
const mapHeight = 250;


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

    map = [],[],[];
    visible = [viewWidth][viewHeight];
    player.xPos = mapWidth/2;
    player.yPos = mapHeight/2;

    for (var i = 0; i < 250; i++) {
        for (var j = 0; j < 250; j++) {
            map[j][i].push(groundObjects[1].symbol);
        }

    }


}
//function keyPressed{
//
//}

function vision(){
    for(i=0; i<viewWidth; i++){
        visible[i] = map[i].slice(player.xPos-(viewWidth/2));
        break;
    }
}