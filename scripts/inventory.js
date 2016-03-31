/**
 * Created by Nick on 3/31/2016.
 */
function playerInventory(){
    this.active = false;
    this.inventoryDOM = window.document.getElementById("MainInventory");
    this.activatingDOM = window.document.getElementById("activate");
    this.droppingDOM = window.document.getElementById("drop");
    this.equippingDOM = window.document.getElementById("equip");
    this.activating = false;
    this.dropping = false;
    this.equipping = false;




    this.handleInput = function(e)
    {
        var keyCode = e.keyCode;
        var shiftBool = e.shiftKey;
        console.log(keyCode == 65 && this.active);
        if(keyCode == 73 && !this.active)
        {
            this.inventoryDOM.style.display = "block";
            this.active = true;
        }
        else if(keyCode == 73 && this.active)
        {
            this.inventoryDOM.style.display = "none";
            this.active = false;
            this.activating = false;
            this.equipping = false;
            this.dropping = false;
        }
        else if(keyCode == 65 && shiftBool && this.active)
        {
            this.activating = true;
            this.dropping = false;
            this.equipping = false;
            this.activatingDOM.style.color = "green";
            this.droppingDOM.style.color = "red";
            this.equippingDOM.style.color = "red";
        }
        else if(keyCode == 68 && shiftBool && this.active)
        {
            this.dropping = true;
            this.activating = false;
            this.equipping = false;
            this.activatingDOM.style.color = "red";
            this.droppingDOM.style.color = "green";
            this.equippingDOM.style.color = "red";
        }
        else if(keyCode == 69 && shiftBool && this.active)
        {
            this.equipping = true;
            this.activating = false;
            this.dropping = false;
            this.activatingDOM.style.color = "red";
            this.droppingDOM.style.color = "red";
            this.equippingDOM.style.color = "green";
        }

    };


}