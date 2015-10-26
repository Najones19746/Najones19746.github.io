/**
 * Created by Nick on 8/25/2015.
 */
//Constants
const viewWidth = 81;
const viewHeight = 41;
const mapWidth = 250;
const mapHeight = 250;
const entityViewerName = "entities";

//Global variables that aren't constant
var map = null;
var visible = null;
var groundObjects;
var itemObjects;
var monsterObjects;
var structureObjects;
//The old way
window.player = null; //gets constructed in init
//var player = {xPos:125, yPos: 125, symbol: "@", color: "green", hp:1000 , type:"player", baseInit:500};
var menuState = false;
var actorQueue = new PriorityQueue();
var actorList = [];
var playerTurn = true;