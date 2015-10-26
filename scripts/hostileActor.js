/**
 * Created by Nick on 10/25/2015.
 */

function actor(symbol, color, hp, baseInit, xPos, yPos){
    this.type = "actor";
    this.symbol = symbol;
    this.color = color;
    this.hp = hp;
    this.baseInit = baseInit;
    this.initiative = baseInit + getRandomInt(0,100);
    this.xPos = xPos;
    this.yPos = yPos;
    this.flags = [];
    this.weapon = getObjectById(window.itemObjects, "fists");

    this.takeDamage = function(damage){
        this.hp -= damage;
        if (this.hp < 0){
            this.symbol = "%";
            this.color = "white";
        }
    };

    this.nextTo = function(target)
    {
      return (Math.abs(this.xPos - target.xPos) < 1 || Math.abs(target.yPos - this.yPos) < 1);
    };

    this.meleeAttack = function(target){
        if (this.nextTo(target)) {
            var inflictedDamage = getRandomInt(this.weapon.damage.low, this.weapon.damage.high);
            target.takeDamage(inflictedDamage);
        }
    };


    this.move = function (xChange, yChange) {
        if(map[this.xPos+xChange][this.yPos+yChange].peek().type == "structure" && !checkFlag("pathable", map[this.xPos+xChange][this.yPos+yChange].peek()))
        {
            vision();
            main();
            //console.log("well fuck");
            return 0;
        }
        if(map[this.xPos+xChange][this.yPos+yChange].peek().type == "actor")
        {
            this.meleeAttack(map[this.xPos+xChange][this.yPos+yChange].peek());
            if(this.initiative > 0)
            {
                //console.log(this.initiative);
                window.actorQueue.push(this, this.initiative);
            }
            vision();
            main();
            return 0;
        }
        map[this.xPos][this.yPos].pop();
        this.xPos += xChange;
        this.yPos += yChange;
        map[this.xPos][this.yPos].push(this);
        document.getElementById("playerInit").innerHTML = String(window.player.initiative);
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
        //#convert to integer so the movement is restricted to the map grid
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