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
var player = {xPos:125, yPos: 125, symbol: "@", color: "green", type:"player"};
var playerLight = new LightSource(player, 20);
var menuState = false;
