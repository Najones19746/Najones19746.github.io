/**
 * Created by killo on 3/30/2016.
 */
function look() {
    this.active = false;
    this.xPos = window.player.xPos;
    this.yPos = window.player.yPos;
    this.boxElement = window.document.getElementById("lookBox");
    this.title = this.boxElement.firstChild;
    this.description = this.boxElement.lastChild;
    this.move = function (toggle, xChange, yChange) {
        console.log("why am I not working");
        console.log(!this.active && toggle);
        if (!this.active && toggle) {
            console.log("how about here");
            this.active = true;
            this.boxElement.style.display = "block";
            this.boxElement.style.fontSize = "72px";
            this.xPos = window.player.xPos;
            this.yPos = window.player.yPos;
            window.map[this.xPos][this.yPos].lookFlag = true;
            this.title.textContent = window.map[this.xPos][this.yPos].peek().id;


        }
        else if(this.active && toggle){
            this.active = false;
            window.map[this.xPos][this.yPos].lookFlag = false;
            this.boxElement.style.display = "none";
            this.xPos = window.player.xPos;
            this.yPos = window.player.yPos;
        }
        else {
            window.map[this.xPos][this.yPos].lookFlag = false;
            this.xPos = this.xPos + xChange;
            this.yPos = this.yPos + yChange;
            window.map[this.xPos][this.yPos].lookFlag = true;
            this.title.textContent = window.map[this.xPos][this.yPos].peek().id;

        }

        vision();
    };

}