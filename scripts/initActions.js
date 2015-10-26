/**
 * Created by Nick on 10/22/2015.
 */
document.addEventListener("keydown", function(e) {

    //If not in menu, move (only state as of now)
    if (menuState == false)
        move(e);

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

    var dirt =  getObjectById(groundObjects, "dirt");
    var wall = getObjectById(structureObjects, "wall");
    for (var i = 0; i < 250; i++) {
        map[i]= [];
        for (var j = 0; j < 250; j++) {
            map[i][j] = [];
            map[i][j].push(dirt);
            map[i][j].lit = false;
            map[i][j].unseen = true;
        }
    }

    map[player.xPos][player.yPos].push(player);
    actorList.push(player);
    actorQueue.push(player,player.initiative);
    document.getElementById("playerInit").innerHTML = String(player.initiative);

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
            map[i][j].lastSymbol = null;
        }
    }

    vision();
}

