/**
 * Created by killo on 3/29/2016.
 */
function messageLog() {
    this.logArea = window.document.getElementById("messageLog");


    this.logMessage = function (string)
    {
        var appendMe = document.createElement("li");
        appendMe.appendChild(document.createTextNode(string));
        this.logArea.appendChild(appendMe);
    }
}
