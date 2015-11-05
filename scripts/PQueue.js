/**
 * Created by Nick on 10/25/2015.
 */


function node(data, priority){
    this.data = data;
    this.priority = priority;
    this.next = null;
}

function priorityQueue(){

    this.head = null;
    this.length = 0;
    this.push = function(data, priority) {
        this.length += 1;
        if (this.head == null)
        {
            this.head = new node(data, priority);
            this.traverse();
        }
        else if(this.head.next == null)
        {

            if(this.head.priority > priority)
            {
                this.head.next = new node(data, priority);
                this.traverse();
            }
            else
            {
                var tempNode = this.head;
                this.head = new node(data, priority);
                this.head.next = tempNode;
                this.traverse();
            }
        }
        else
        {
            var tail = this.head;
            var lead = this.head.next;
            while (lead != null)
            {
                if(tail.priority < priority)
                {
                    var middleNode = new node(data, priority);
                    tail.next = middleNode;
                    middleNode.next = lead;
                    this.traverse();
                    return;
                }
                tail = lead;
                lead = lead.next;
            }
            tail.next = new node(data, priority);
            this.traverse();
        }

    };
    this.pop = function ()
    {

        if(this.head != null)
        {
            this.length -= 1;
            var tempNode = this.head;
            this.head = this.head.next;
            tempNode.next = null;
            return tempNode.data;
        }
        else
            return null;
    };
    this.peek = function(){
        if(this.head == null)
            return null;
        return this.head.data;
    };
    this.removeItemByID = function(id)
    {
        var tempNode = null;
        var tail = this.head;
        var lead = this.head;
        if (lead == null)
            return;
        if(lead.data.id == id)
        {
            console.log("FOUND AND REMOVED NODE BY ID");
            this.length -= 1;
            tempNode = this.head;
            this.head = lead.next;
            tempNode.next = null;
            return;
        }
        while(lead != null)
        {
            tail = lead;
            lead = lead.next;
            if(lead.data.id == id)
            {
                console.log("FOUND AND REMOVED NODE BY ID");
                this.length -= 1;
                tempNode = lead;
                tail.next = tempNode.next;
                tempNode = null; //possibly will cause an error
                return;
            }
        }
    };
    this.traverse = function()
    {
        var walk = this.head;
        console.log("walking queue");
        while(walk != null){
            console.log(walk.data.initiative + " " +walk.data.symbol);
            walk = walk.next;
        }
    };
}


///////////////////   Usage example    /////////////////////////////

//var queue = new PriorityQueue();
//
//queue.push({p:'two'}, 2);
//queue.push({p:'three'}, 3);
//queue.push({p:'five'}, 5);
//queue.push({p:'1st one'}, 1);
//queue.push({p:'zero'}, 0);
//queue.push({p:'nine'}, 9);
//queue.push({p:'2nd one'}, 1);
//
//console.log(queue.heap.toString()); // => 0,1,1,3,2,9,5
//
//console.log(queue.pop()); // => {p:'zero'}
//console.log(queue.pop()); // => {p:'1st one'}
//console.log(queue.heap.toString()); // => 1,2,9,3,5
//
//queue.push({p:'one-half'}, 0.5);
//console.log(queue.heap.toString()); // => 0.5,2,1,3,5,9