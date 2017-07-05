/*
 def heuristic(a, b):
 # Manhattan distance on a square grid
 return abs(a.x - b.x) + abs(a.y - b.y)

 */

function heuristic(a, b) {

    return (Math.abs(a.xPos - b.xPos) + Math.abs(a.yPos - b.yPos));
}

function reconstructPath(cameFrom, goal, used) {
    // console.log("yaay");
    // console.log(goal);
    var path = [];
    var current = goal;
    while (current != cameFrom)
    {
        path.push(current);
        current = current.cameFrom;
    }

    path.reverse();
    for(var i = 0; i< used.length; i++)
    {
        used[i].cameFrom = null;
        used[i].gScore = Infinity;
        used[i].hScore = Infinity;
        used[i].fScore = Infinity;
    }
    return path;

}

function findPath(start, end) {


    var used = [];

    start.gScore = 0;
    start.hScore = heuristic(start,end);
    //console.log(start.hScore);
    start.fScore = start.hScore;

    var openSet = new priorityQueue();
    start.cameFrom = null;

    openSet.push(window.map[start.xPos][start.yPos], (-1 * window.map[start.xPos][start.yPos].fScore));
    //used.push(start);

    var current = null;
    var tenativeGScore = null;

    while (openSet.length > 0) {
        current = openSet.pop();

        if (current.xPos == end.xPos && current.yPos == end.yPos)
        //need to do reconstructPath
            return reconstructPath(start, end,used);
        used.push(current);
        var i;

        for (i = 0; i < window.map[current.xPos][current.yPos].neighbors.length; i++)
        {
            /*if(current.neighbors[i].xPos == window.player.xPos && current.neighbors[i].yPos == window.player.yPos)
                console.log("GOT EMM");
            else
                console.log("nope..");*/
            tenativeGScore = current.gScore + 1;
            if (tenativeGScore < current.neighbors[i].gScore)
            {
                if(current.neighbors[i].peek().type == "structure"){
                    //console.log("pathfinding blocked");
                    continue;
                }


                current.neighbors[i].cameFrom = current;
                current.neighbors[i].gScore = tenativeGScore;
                current.neighbors[i].hScore = heuristic(current.neighbors[i], end);
                current.neighbors[i].fScore = current.neighbors[i].gScore + current.neighbors[i].hScore;
                openSet.push(current.neighbors[i], (-1 * current.neighbors[i].fScore ));
                used.push(current.neighbors[i]);
                if (current.neighbors[i].xPos == end.xPos && current.neighbors[i].yPos == end.yPos)
                    return reconstructPath(start, end,used);

            }

        }

    }

    return -1;
}