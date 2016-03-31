/**
 * Created by Nick on 10/25/2015.
 */

function actor(symbol, color, name , hp, baseInit, xPos, yPos){
    this.type = "actor";
    this.symbol = symbol;
    this.color = color;
    this.name = name;
    this.id = name;
    this.maxhp = hp;
    this.hp = hp;
    this.baseInit = baseInit;
    this.initiative = baseInit + getRandomInt(0,100);
    this.xPos = xPos;
    this.yPos = yPos;
    this.flags = [];
    this.items = [];
    this.items.push(getObjectById(window.itemObjects, "corpse"));
    this.weapon = getObjectById(window.itemObjects, "fists");
    this.gameId = window.gameIdCounter;
    window.gameIdCounter++;

    this.die = function(){
        console.log("window.map STACK LENGTH ON DEATH");
        console.log(window.map[this.xPos][this.yPos].length);
        window.map[this.xPos][this.yPos].pop();
        console.log(window.map[this.xPos][this.yPos].length);
        for(var i = 0; i < this.items.length; i++)
        {
            window.map[this.xPos][this.yPos].push(this.items[i]);
        }
        for(i= 0; i< window.actorList.length; i++)
        {
            if(window.actorList[i].gameId == this.gameId)
            {
                console.log("splicing actor list");
                console.log(window.actorList.length);
                window.actorList.splice(i,1);
                console.log(window.actorList.length);
            }
        }
        //for(i=0; i< window.actorList.length; i++)
        //    console.log(actorList[i])
        window.actorQueue.removeItemByID(this.gameId);
        //window.map[this.xPos][this.yPos].splice(1,0, this.items);
    };

    this.takeDamage = function(damage){
        this.hp -= damage;
        if (this.hp < 0){
            this.symbol = "NOT SUPPOSED TO BE HERE";
            this.color = "white";
            this.die();
        }
    };

    this.nextTo = function(target)
    {
      return (Math.abs(this.xPos - target.xPos) <= 1 || Math.abs(target.yPos - this.yPos) <= 1);
    };

    this.meleeAttack = function(target){
        if (this.nextTo(target)) {
            var inflictedDamage = getRandomInt(this.weapon.damage.low, this.weapon.damage.high);
            window.log.logMessage(this.name + " hit " + target.name + " with " + this.weapon.gameId + " for " + inflictedDamage + " damage");
            target.takeDamage(inflictedDamage);
        }
    };


    this.move = function (xChange, yChange) {
        console.log(xChange);
        console.log(yChange);
        console.log(window.map[this.xPos+xChange][this.yPos+yChange].peek());
        if(window.map[this.xPos+xChange][this.yPos+yChange].peek().type == "structure"
            && !checkFlag("pathable", window.map[this.xPos+xChange][this.yPos+yChange].peek()))
        {
            vision();
            main();
            //console.log("well fuck");
            return 0;
        }
        if(window.map[this.xPos+xChange][this.yPos+yChange].peek() != this &&
            window.map[this.xPos+xChange][this.yPos+yChange].peek().type == "actor")
        {
            this.meleeAttack(window.map[this.xPos+xChange][this.yPos+yChange].peek());
            if(this.initiative > 0)
            {
                //console.log(this.initiative);
                window.actorQueue.push(this, this.initiative);
            }
            vision();
            main();
            return 0;
        }
        window.map[this.xPos][this.yPos].pop();
        this.xPos += xChange;
        this.yPos += yChange;
        window.map[this.xPos][this.yPos].push(this);
        if(this.initiative > 0){

            window.actorQueue.push(this, this.initiative);
        }
        vision();
        main();
    };

    this.moveTo = function(target){

        var path = findPath(window.map[this.xPos][this.yPos], window.map[target.xPos][target.yPos]);
        console.log(path);
        var dx = path[0].xPos - this.xPos;
        var dy = path[0].yPos - this.yPos;
        var distance = Math.sqrt(dx * dx + dy * dy);
        //dx = Math.round(dx / distance);
        //dy = Math.round(dy / distance);

        if(window.map[this.xPos][this.yPos].lit == true)
            this.move(dx,dy);
        else
            this.move(0,0);

        //var dx = target.xPos - this.xPos;
        //var dy = target.yPos - this.yPos;
        //var distance = Math.sqrt(dx * dx + dy * dy);
        //dx = Math.round(dx / distance);
        //dy = Math.round(dy / distance);
        //if(window.map[this.xPos][this.yPos].lit == true)
        //    this.move(dx,dy);
        //else
        //    this.move(0,0);
        var dx = path[0].xPos - this.xPos;
        var dy = path[0].yPos - this.yPos;
    }
}