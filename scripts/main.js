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


    if(map[player.xPos+xChange][player.yPos+yChange].peek().type == "structure" && !checkFlag("pathable", map[player.xPos+xChange][player.yPos+yChange].peek()))
    {
        vision();
        main();
        //console.log("well fuck");
        return 0;
    }
        map[player.xPos][player.yPos].pop();
        player.xPos += xChange;
        player.yPos += yChange;
        map[player.xPos][player.yPos].push(player);
        player.initiative = actorQueue.pop().initiative - 100;
        if(player.initiative > 0)
        {
            actorQueue.push(player, player.initiative);
        }
        document.getElementById("playerInit").innerHTML = String(player.initiative);
        vision();
        main();
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


    if (actorQueue.length() == 1){
        for(var i = 0; i < actorList.length; i++){
            actorList[i].initiative = (actorList[i].baseInit + getRandomInt(0, 100));
            actorQueue.push(actorList[i], actorList.initiative);
        }
    }
    if (actorQueue.peek() == player)
    {
        playerTurn = true;
    }
    else{
        playerTurn = false;

    }
}