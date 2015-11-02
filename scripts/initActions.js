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

    window.player = new actor("@", "green", 1000, 500, 125, 125);
    window.playerLight = new LightSource(window.player, 20);
    map = [];
    visible = [viewWidth][viewHeight];

    var dirt =  getObjectById(window.groundObjects, "dirt");
    var wall = getObjectById(window.structureObjects, "wall");
    for (var i = 0; i < 250; i++) {
        map[i]= [];
        for (var j = 0; j < 250; j++) {
            map[i][j] = [];
            map[i][j].push(dirt);
            map[i][j].lit = false;
            map[i][j].unseen = true;
        }
    }

    map[window.player.xPos][window.player.yPos].push(window.player);
    actorList.push(window.player);
    //window.actorQueue.push(window.player,window.player.initiative);
    var enemy = new actor("~","red", 300, 200, 125, 120);
    actorList.push(enemy);
    //window.actorQueue.push(enemy, enemy.initiative);
    map[enemy.xPos][enemy.yPos].push(enemy);
    document.getElementById("playerInit").innerHTML = String(window.player.initiative);

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
            map[i][j].push(getObjectById(window.structureObjects, "debug_wall"));
            map[i][j].visible = false;
            map[i][j].lit = false;
            map[i][j].lastSymbol = null;
        }
    }
    for(i=0; i<actorList.length; i++)
        actorQueue.push(actorList[i], actorList[i].id);


    vision();
}