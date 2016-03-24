/*
def heuristic(a, b):
# Manhattan distance on a square grid
return abs(a.x - b.x) + abs(a.y - b.y)

*/

function heuristic(a,b){

    return (Math.abs(a.xPos - b.xPos) + Math.abs(a.yPos - b.yPos));
}

function reconstructPath(cameFrom, goal)
{
    return "TODO";
}

function findPath(start, end)
{
    var closedSet = [];
    var openSet = new priorityQueue();
    var used = [];

    var cameFrom = null;

    window.map[start.xPos][start.yPos].gScore = 0;
    var tempHeuristic = heuristic(start,end);
    window.map[start.xPos][start.yPos].fScore = tempHeuristic;
    used.push(start, tempHeuristic);
    var current = null;
    var tenativeGScore = null;
    while(openSet.length > 0)
    {
        current = openSet.pop();
        if (current.xPos == end.xPos && current.yPos == end.yPos)
            //need to do reconstructPath
            return reconstructPath(cameFrom, end);
        closedSet.push(current);
        var i;

        for(i=0; i <window.map[current.xPos][current.yPos]; i++)
        {
            if(closedSet.indexOf(current.neighbors[i]) > -1)
                continue;
            // TODO START HERE
            //tentative_gScore := gScore[current] + dist_between(current, neighbor)
            tenativeGScore = current.gScore + 1;
            if (current.neighbors[i].gScore == Infinity)
            {

            }
            if (openSet.indexOf(current.neighbors[i]) < 0)
            {
                openSet.push(current.neighbors[i])
            }

            else if (tenativeGScore >= current.neighbors[i].gScore)
            {
                continue
            }
            //cameFrom[neighbor] := current
            //gScore[neighbor] := tentative_gScore
            //fScore[neighbor] := gScore[neighbor] + heuristic_cost_estimate(neighbor, goal)

        }

    }


}