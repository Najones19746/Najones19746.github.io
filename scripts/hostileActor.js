/**
 * Created by Nick on 10/25/2015.
 */

function actor(symbol, color, hp, baseInit, xPos, yPos){
    this.type = "actor";
    this.symbol = symbol;
    this.color = color;
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
    this.id = window.idCounter;
    window.idCounter++;

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
            if(window.actorList[i].id == this.id)
            {
                console.log("splicing actor list");
                console.log(window.actorList.length);
                window.actorList.splice(i,1);
                console.log(window.actorList.length);
            }
        }
        //for(i=0; i< window.actorList.length; i++)
        //    console.log(actorList[i])
        window.actorQueue.removeItemByID(this.id);
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
            target.takeDamage(inflictedDamage);
        }
    };


    this.move = function (xChange, yChange) {
        if(window.map[this.xPos+xChange][this.yPos+yChange].peek().type == "structure" && !checkFlag("pathable", window.map[this.xPos+xChange][this.yPos+yChange].peek()))
        {
            vision();
            main();
            //console.log("well fuck");
            return 0;
        }
        if(window.map[this.xPos+xChange][this.yPos+yChange].peek().type == "actor")
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

        //#vector from this object to the target, and distance
        //dx = target_x - self.x
        //dy = target_y - self.y
        //distance = math.sqrt(dx ** 2 + dy ** 2)
        //
        //#normalize it to length 1 (preserving direction), then round it and
        //#convert to integer so the movement is restricted to the window.map grid
        //dx = int(round(dx / distance))
        //dy = int(round(dy / distance))
        //self.move(dx, dy)
        var dx = target.xPos - this.xPos;
        var dy = target.yPos - this.yPos;
        var distance = Math.sqrt(dx * dx + dy * dy)
        dx = Math.round(dx / distance);
        dy = Math.round(dy / distance);
        this.move(dx,dy);
    }
}