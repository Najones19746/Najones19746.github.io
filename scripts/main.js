/**
 * Created by Nick on 8/25/2015.
 */

Array.prototype.peek = function() {
    return this[this.length-1];
};





function move(e){

    if(!playerTurn)
        return;

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
            return;
            break;
    }
    window.player.initiative = window.actorQueue.pop().initiative - 100;
    window.player.move(xChange,yChange);
    //old stuff, being moved to actor.js
    //if(map[window.player.xPos+xChange][window.player.yPos+yChange].peek().type == "structure" && !checkFlag("pathable", map[window.player.xPos+xChange][window.player.yPos+yChange].peek()))
    //{
    //    vision();
    //    main();
    //    //console.log("well fuck");
    //    return 0;
    //}
    //map[window.player.xPos][window.player.yPos].pop();
    //window.player.xPos += xChange;
    //window.player.yPos += yChange;
    //map[window.player.xPos][window.player.yPos].push(window.player);
    //window.player.initiative = actorQueue.pop().initiative - 100;
    //if(window.player.initiative > 0)
    //{
    //    actorQueue.push(window.player, window.player.initiative);
    //}
    //document.getElementById("playerInit").innerHTML = String(window.player.initiative);
    //vision();
    //main();
}

function getObjectById(collection, value){
    for(var i = 0; i < collection.length; i++){
        if (collection[i].id == value)
            return collection[i];
    }
    return collection[0];
}

function checkFlag(flag, ob){
    for (i=0 ; i< ob.flags.length; i++){
        if (ob.flags[i] == flag)
            return true;
    }
    return false;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function main(){


    if (window.actorQueue.length == 0){
        for(var i = 0; i < actorList.length; i++){
            actorList[i].initiative = (actorList[i].baseInit + getRandomInt(0, 100));
            window.actorQueue.push(actorList[i], actorList.initiative);
        }
        main();
        return;
    }
    if (window.actorQueue.peek() == window.player)
    {
        playerTurn = true;
    }
    else{
        playerTurn = false;
        //console.log("enemy turn");
        var actingEntity = window.actorQueue.pop();
        actingEntity.initiative = window.actorQueue.pop().initiative - 100;
        actingEntity.moveTo(window.player);
    }
}

window.onload = init();