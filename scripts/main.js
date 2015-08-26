/**
 * Created by Owner on 8/25/2015.
 */


var map = null;
var visible = null;
var groundObjects;
var itemObjects;
var monsterObjects;
var structureObjects;


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
    visible = [];

    for (i = 0; i < 250; i++) {
        for (j = 0; j < 250; j++) {

        }

    }


}
//function keyPressed{
//
//}