






/////////////////////////////////////////////////////////////////
//////// DEFINITTIONS OF FUNCTIONS THAT ARE CALLED BELOW ////////
/////////////////////////////////////////////////////////////////


//JOHANN : The function below will get called when we define a vertex. Or as I like to call them nodes or dots or
// whatever in a node diagram.

// add vertex to the graph
addVertex(v)
{
    // initialize the adjacent list with a
    // null array
    this.AdjList.set(v, []);
}

//This just adds a line between the two nodes it is given. nothing fancy.

addEdge(node1, node2)
{
    // get the list for vertex v and put the
    // vertex w denoting edge betweeen v and w
    this.AdjList.get(node1).push(node2);

    // Since graph is undirected,
    // add an edge from w to v also
    this.AdjList.get(node2).push(node1);
}



// JOHANN : Im not 100% sure what this function does
printGraph()
{
    // get all the vertices
    var get_keys = this.AdjList.keys();

    // iterate over the vertices
    for (var i of get_keys)
{
        // great the corresponding adjacency list
        // for the vertex
        var get_values = this.AdjList.get(i);
        var conc = "";

        // iterate over the adjacency list
        // concatenate the values into a string
        for (var j of get_values)
            conc += j + " ";

        // print the vertex and its adjacency list
        console.log(i + " -> " + conc);
    }
}