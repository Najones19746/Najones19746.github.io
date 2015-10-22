/**
 * Created by Nick on 8/25/2015.
 */

Array.prototype.peek = function() {
    return this[this.length-1];
};

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
        //console.log("well fuck");
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
    for (i=0 ; i< ob.flags.length; i++){
        if (ob.flags[i] == flag)
            return true;
    }
    return false;
}


