/**
 * Created by Nick on 8/25/2015.
 */





function move(e){

    if(!playerTurn)
        return;

    //ONLY PASS KEYPAD OR ARROWS
    var keyValue = e.keyCode;
    var xChange = 0;
    var yChange = 0;
    var lookToggle = false;
    var playerInventoryToggle = false;
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
        //l
        case 76:
            lookToggle = true;
            break;
        //i
        case 73:
            playerInventoryToggle = true;
            break;
        default:
            break;
    }
    if(window.playerInventory.active || playerInventoryToggle)
    {
        window.playerInventory.handleInput(e);
    }
    else if (window.look.active || lookToggle)
    {
        window.look.move(lookToggle,xChange, yChange);
    }
    else {
        window.player.move(xChange,yChange);
        window.player.initiative = window.actorQueue.pop().initiative - 100;
    }
}

function getObjectById(collection, value){
    for(var i = 0; i < collection.length; i++){
        if (collection[i].id == value)
            return collection[i];
    }
    return collection[0];
}

function checkFlag(flag, ob){
    //if(ob.type != "ground" && ob.type != "structure")
        //console.log(ob);
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

    document.getElementById("playerInit").innerHTML = String(window.player.initiative);
    document.getElementById("playerHP").innerHTML = String(window.player.hp);
    var percentHPLeft = Math.round(window.player.hp / window.player.maxhp * 100 );
    document.getElementById("greenHP").style.width = String(percentHPLeft) + "%";
    document.getElementById("redHP").style.width = String(100-percentHPLeft) +"%";


    if (window.actorQueue.length == 0){
        for(var i = 0; i < actorList.length; i++){
            console.log("re entered an actor to the actorQueue");
            actorList[i].initiative = (actorList[i].baseInit + getRandomInt(0, 100));
            window.actorQueue.push(actorList[i], actorList[i].initiative);
        }
        main();
        return;
    }
    if (window.actorQueue.peek() == window.player)
    {
        playerTurn = true;
    }
    else if(window.actorQueue.peek() != null){
        playerTurn = false;
        //console.log("enemy turn");
        var actingEntity = window.actorQueue.pop();
        actingEntity.initiative = actingEntity.initiative - 100;
        actingEntity.moveTo(window.player);
    }

}

window.onload = init();