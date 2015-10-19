/**
 * Created by Nick on 8/30/2015.
 */
// credit to https://gist.github.com/ebonneville/4200578

// uses shadowcasting to calculate lighting at specified position
function LightSource(position, radius) {
    this.tiles = [];
    this.position = position;
    this.radius = radius;

    // multipliers for transforming coordinates into other octants.
    this.mult = [
        [1,  0,  0, -1, -1,  0,  0,  1],
        [0,  1, -1,  0,  0, -1,  1,  0],
        [0,  1,  1,  0,  0, -1, -1,  0],
        [1,  0,  0,  1, -1,  0,  0, -1]
    ];

    // calculates an octant. Called by the this.calculate when calculating lighting
    this.calculateOctant = function(cx, cy, row, start, end, radius, xx, xy, yx, yy, id) {
        map[cx][cy].lit = true;
        map[cx][cy].unseen = false;
        //map.data[cx][cy].draw(this.position, radius);
        var thing = {xPos: cx, yPos: cy};
        this.tiles.push(thing);
        var new_start = 0;

        if(start < end) return;

        var radius_squared = radius * radius;

        for(var i = row; i<radius+1; i++) {
            var dx = -i-1;
            var dy = -i;

            var blocked = false;

            while(dx <= 0) {

                dx += 1;

                var X = cx + dx * xx + dy * xy;
                var Y = cy + dx * yx + dy * yy;

                if(X < 250 && X >= 0 && Y < 250 && Y >=0) {

                    var l_slope = (dx-0.5)/(dy+0.5);
                    var r_slope = (dx+0.5)/(dy-0.5);

                    if(start < r_slope) {

                    } else if( end > l_slope) {
                        break;
                    } else {
                        if(dx*dx + dy*dy < radius_squared) {
                            map[X][Y].lit = true;
                            map[X][Y].unseen = false;
                            if(map[X][Y].peek().type != "player")
                                map[X][Y].lastSymbol = map[X][Y].peek().symbol;
                            //map.data[X][Y].draw(this.position, radius);
                            var thing = {xPos: X, yPos:Y};
                            this.tiles.push(thing);
                        }

                        if(blocked) {
                            if(map[X][Y].peek().type == "structure" && checkFlag("blocksSight", map[X][Y].peek()))
                            {
                                new_start = r_slope;

                            } else {
                                blocked = false;
                                start = new_start;
                            }
                        } else {
                            if(checkFlag("blocksSight", map[X][Y].peek()) || map[X][Y].peek().type == "structure" && i < radius) {
                                blocked = true;
                                this.calculateOctant(cx, cy, i+1, start, l_slope, radius, xx, xy, yx, yy, id+1);

                                new_start = r_slope;
                            }
                        }
                    }
                }
            }

            if(blocked) break;
        }
    };

    // sets flag lit to false on all tiles within radius of position specified
    this.clear = function () {
        for(var i = 0; i<this.tiles.length; i++) {
            map[this.tiles[i].xPos][this.tiles[i].yPos].lit = false;
            //this.tiles[i].draw();
        }

        this.tiles = [];
    };

    // sets flag lit to true on all tiles within radius of position specified
    this.calculate = function () {
        this.clear();

        for(var i = 0; i<8; i++) {
            this.calculateOctant(this.position.xPos, this.position.yPos, 1, 1.0, 0.0, this.radius,
                this.mult[0][i], this.mult[1][i], this.mult[2][i], this.mult[3][i], 0);
        }

        map[this.position.xPos][this.position.yPos].lit = true;
        console.log("x pos" + this.position.xPos + "y pos" + this.position.yPos);
        map[this.position.xPos][this.position.yPos].unseen = false;
            if( map[this.position.xPos][this.position.yPos].peek() != player )
                map[this.position.xPos][this.position.yPos].lastSymbol = map[this.position.xPos][this.position.yPos].peek().symbol;
        //map.tile(this.position).draw();
        this.tiles.push(this.position);
    };

    // update the position of the light source
    this.update = function(position) {
        this.position = position;
        this.clear();
        this.calculate();
    }
}