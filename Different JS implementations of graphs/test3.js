// this one is from code pen - it doesnt work yet, I am not too sure why



//ES5 VERSION

function Graph() {
    this.vertices = [];
    this.adjacentList = new Map();
    this.numberOfEdges = 0;
}

Graph.prototype = {
    /*
    other code goes here
    */

    breathFirstSearch: function(startingVertex) {
        var color = [],
            distances = [],
            preceding = [],
            queue = new Queue(),
            isEmptyQueue = true,
            //create an array of object
            setVertexColorsAndEdges = function() {
                for(var i = 0; i < this.vertices.length; i++) {
                    color[this.vertices[i]] = 'white';
                    distances[this.vertices[i]] = -1;
                    //we initialize all preceding distance to null with the exception
                    //of the current start vertex.
                    if(this.vertices[i] === startingVertex) {
                        distances[this.vertices[i]] = 0;
                        preceding[this.vertices[i]] = startingVertex;
                    } else {
                        preceding[this.vertices[i]] = null;
                    }
                }
            };

        //set colors and distances on all vertices
        setVertexColorsAndEdges();
        //enqueue vertex onto queue
        queue.enqueue(startingVertex);
        //continously check the queue and performs the following operations
        while(!queue.isEmpty()) {
            //get vertex in the front of queue
            var queueFrontVertex = queue.dequeue();
            //set the color to grey since is now visited
            color[queueFrontVertex] = 'grey';
            //get its adjacency list
            var frontVertexAdjLst = this.getAdjacencyListVertex(queueFrontVertex);
            frontVertexAdjLst.forEach(function(adjVertex){
                if(color[adjVertex] === 'white') {
                    //if color is white change to grey because we have now discovered it
                    color[adjVertex] = 'grey';
                    //since we initialized distances with -1, at the top we need to reset that
                    //to 1 and start counting properly. else we increase by 1
                    if(distances[queueFrontVertex] === -1) {
                        distances[queueFrontVertex] = 1;
                    } else {
                        //increment the edge distance count
                        distances[adjVertex] = distances[queueFrontVertex] + 1;
                    }
                    //record the path that lead from one vertex to another vertex. The preceding node
                    preceding[adjVertex] = queueFrontVertex;
                    //next add this to the queue
                    queue.enqueue(adjVertex);
                }
            });
            color[queueFrontVertex] = 'black';
            //console.log(queueFrontVertex + ' was visited');
        }
        //Output Shortest distance based on number of hops
        for (var i in distances) {
            //console.log('Shortest Distance from ' + startingVertex + ' to ' + i + ' is in ' + distances[i] + ' step(s)');
        }

        return {
            distances : distances,
            preceding : preceding
        };
    },

    vertexExist: function(v) {
        return this.vertices.indexOf(v) >= 0;
    },

    shortestPathToAll: function(source, bfs) {
        //check to see if vertex exists
        if(!this.vertexExist(source)) {
            return console.log('Starting Vertex not found');
        }

        //since we already know how to output shortest path from source to destination
        //lets reuse our shortest path method
        for(var i = 0; i < this.vertices.length; i++) {
            var currentVertex = this.vertices[i];
            this.shortest_path(bfs, source, currentVertex);
        }
    },

    shortest_path: function(bfs, source, destination) {
        //get the distance table array values
        var distances = bfs.distances,
            precedingNode = bfs.preceding,
            finalString,
            //use a stack to store the backtracking path
            path = new Stack();

        //the first to be added to the stack is a destination. however if source and destination
        //are the same, then there is no need to add the destination. If you dont see this, you will
        //see K-K or M-M in your output if K or M is your source. If source and destination are the same
        //simply just present K or M
        if(!(source === destination)) {
            path.push(destination);
        }

        //find the last preceding node in order to get to the source
        var previousVertex = precedingNode[destination];
        //console.log(previousVertext);

        //Perform backtracking
        while (previousVertex !== null && previousVertex !== source) {
            path.push(previousVertex);
            previousVertex = precedingNode[previousVertex];
        }

        if(previousVertex === null) {
            console.log('There is not path from ' + source + ' to ' + destination);
        } else { // the previous is equal to the source.
            //add the source
            path.push(source);
        }
        //print final results
        finalString = path.pop();
        while(!path.isEmpty()) {
            finalString += ' - ' + path.pop();
        }
        console.log(finalString);
    }

    /*
    other code
    */
};

//create graph
var graph = new Graph();
//create an array of vertices to add to graph
var vertices = ['K','T','J','M','N','F'];
//iterate vertices and add each vertex to the graph
vertices.map(function(vertex){
    graph.addVertex(vertex);
});

//create edge connections
graph.addEdge('K', 'T');
graph.addEdge('K', 'M');
graph.addEdge('K', 'J');
graph.addEdge('T', 'M');
graph.addEdge('J', 'M');
graph.addEdge('J', 'F');
graph.addEdge('M', 'N');
graph.addEdge('M', 'F');

//graph.toString();
//graph.breathFirstSearch('K');

var startVertex = vertices[0];
var bfs = graph.breathFirstSearch(startVertex);
graph.shortestPathToAll(startVertex, bfs);
var shortestPathFromTo = graph.shortestPathFromTo('T', 'F');
console.log("Path String: ", shortestPathFromTo);
//ES2015 VERSION

class Graph {
    constructor() {
        this.vertices = [];
        this.adjacentList = new Map();
        this.numberOfEdges = 0;
    }

    /*
    other code here
    */

    breathFirstSearch(startingVertex) {
        let color = [],
            distances = [],
            preceding = [],
            queue = new Queue(),
            isEmptyQueue = true,
            //create an array of object
            setVertexColorsAndEdges = () => {
                for(let i = 0; i < this.vertices.length; i++) {
                    color[this.vertices[i]] = 'white';
                    distances[this.vertices[i]] = -1;
                    if(this.vertices[i] === startingVertex) {
                        distances[this.vertices[i]] = 0;
                        preceding[this.vertices[i]] = startingVertex;
                    } else {
                        preceding[this.vertices[i]] = null;
                    }
                }
                return color;
            };
        //set colors and distances on all vertices
        setVertexColorsAndEdges();
        //enqueue vertex onto queue
        queue.enqueue(startingVertex);
        //continously check the queue and performs the following operations
        while(!queue.isEmpty()) {
            //get vertex in the front of queue
            let queueFrontVertex = queue.dequeue();
            //set the color to grey since is now visited
            color[queueFrontVertex] = 'grey';
            //get its adjacency list
            let frontVertexAdjLst = this.getAdjacencyListVertex(queueFrontVertex);
            frontVertexAdjLst.forEach(function(adjVertex){
                if(color[adjVertex] === 'white') {
                    //if color is white change to grey because we have now discovered it
                    color[adjVertex] = 'grey';
                    if(distances[queueFrontVertex] === -1) {
                        distances[queueFrontVertex] = 1;
                    } else {
                        //increment the edge distance count
                        distances[adjVertex] = distances[queueFrontVertex] + 1;
                    }
                    //record the path that lead from one vertex to another vertex
                    preceding[adjVertex] = queueFrontVertex;
                    //next add this to the queue
                    queue.enqueue(adjVertex);
                }
            });
            color[queueFrontVertex] = 'black';
            //console.log(queueFrontVertex + ' was visited');
        }
        //Output Shortest distance based on number of hops
        for (var i in distances) {
            //console.log('Shortest Distance from ' + startingVertex + ' to ' + i + ' is in ' + distances[i] + ' step(s)');
        }

        return {
            distances,
            preceding
        };
    }

    vertexExist(v) {
        return this.vertices.indexOf(v) >= 0;
    }

    shortestPathToAll(source, bfs) {
        //check to see if vertex exists
        if(!this.vertexExist(source)) {
            return console.log('Starting Vertex not found');
        }
        //since we already know how to output shortest path from source to destination
        //lets reuse our shortest path method
        for(var i = 0; i < this.vertices.length; i++) {
            var currentVertex = this.vertices[i];
            this.shortest_path(bfs, source, currentVertex);
        }
    }

    shortest_path(bfs, source, destination) {
        //get the distance table array values
        let distances = bfs.distances,
            precedingNode = bfs.preceding,
            finalString,
            //use a stack to store the backtracking path
            path = new Stack();

        if(!(source === destination)) {
            path.push(destination);
        }

        //find the last preceding node in order to get to the source
        let previousVertex = precedingNode[destination];
        //console.log(previousVertext);

        //Perform backtracking
        while (previousVertex !== null && previousVertex !== source) {
            path.push(previousVertex);
            previousVertex = precedingNode[previousVertex];
        }

        if(previousVertex === null) {
            console.log('There is not path from ' + source + ' to ' + destination);
        } else { // the previous is equal to the source.
            //add the source
            path.push(source);
        }
        //print final results
        finalString = path.pop();
        while(!path.isEmpty()) {
            finalString += ' - ' + path.pop();
        }
        console.log(finalString);
    }

    /*
    other code here
    */
}

//create graph
var graph = new Graph();
//create an array of vertices to add to graph
var vertices = ['K','T','J','M','N','F'];
//iterate vertices and add each vertex to the graph
vertices.map(function(vertex){
    graph.addVertex(vertex);
});

//create edge connections
graph.addEdge('K', 'T');
graph.addEdge('K', 'M');
graph.addEdge('K', 'J');
graph.addEdge('T', 'M');
graph.addEdge('J', 'M');
graph.addEdge('J', 'F');
graph.addEdge('M', 'N');
graph.addEdge('M', 'F');

//graph.toString();
//graph.breathFirstSearch('K');

var startVertex = vertices[0];
var bfs = graph.breathFirstSearch(startVertex);
graph.shortestPathToAll(startVertex, bfs);
var shortestPathFromTo = graph.shortestPathFromTo('T', 'F');
console.log("Path String: ", shortestPathFromTo);