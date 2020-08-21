
import {PriorityQueue, createLinkedListInstance} from './PriorityQueue';

let PrimAlgo = (function() {

    let _edges = {};
    let _results = [];

    return new class prim {
        constructor() {}
        addEdge = (fromValue, toValue, priority) => {
            let list = _edges[fromValue];
            if (!list) {
                _edges[fromValue] = createLinkedListInstance();
                _edges[fromValue].add({name: toValue, from: fromValue}, priority);
            } else { // neighbors exist
                _edges[fromValue].add({name: toValue, from: fromValue}, priority);
            }
        }

        insertAdjacentEdges(nodeValue, minPriorityQueue, edgesArr) {
            let linkedListOfEdges = edgesArr[nodeValue];
            while (linkedListOfEdges && linkedListOfEdges.hasNext()) {
                let edge = linkedListOfEdges.next();
                minPriorityQueue.insert({
                    nodeValue: edge.value.name,
                    previousNodeValue: edge.value.from
                }, 
                edge.priority);
            } 
        }

        getUnexploredMinFromPriorityQueue(minPriorityQueue, exploredDictionary, cbProcessMinEdge) {
            while (!minPriorityQueue.isEmpty()) {
                let currentMinEdge = minPriorityQueue.remove();
                let nodeValue = currentMinEdge.value.nodeValue;
                while(exploredDictionary.has(nodeValue)) {
                    currentMinEdge = (!minPriorityQueue.isEmpty()) ? minPriorityQueue.remove() : null;
                    nodeValue = currentMinEdge ? currentMinEdge.value.nodeValue : null;
                }
                if (minPriorityQueue.isEmpty() && !currentMinEdge) return null;
                cbProcessMinEdge(currentMinEdge);
            }
        }

        primAlgorithm(startnode) {
            let edgeQueue = new PriorityQueue();
            let explored = new Set([startnode]);
            this.insertAdjacentEdges(startnode, edgeQueue, _edges);
            this.getUnexploredMinFromPriorityQueue(edgeQueue, explored, minEdge => {
                let nextNodeValue = minEdge.value.nodeValue;
                let prevNodeValue = minEdge.value.previousNodeValue;
                _results.push(`${prevNodeValue} to ${nextNodeValue} with priority of ${minEdge.priority}`);
                this.insertAdjacentEdges(nextNodeValue, edgeQueue, _edges);
                explored.add(nextNodeValue);
            });
            console.log(_results);
            return _results;
        }

        printAdjacencyList = () => {
            for (var key in _edges) {
                if (Object.prototype.hasOwnProperty.call(_edges, key)) {
                    console.log('printing for key: ' + key);
                    _edges[key].print();
                }
            }
        }

    };
});

let  g = new PrimAlgo();

// good
g.addEdge("a", "b", 1);
g.addEdge("a", "c", 5);

g.addEdge("b", "a", 1);
g.addEdge("b", "c", 4);
g.addEdge("b", "d", 8);
g.addEdge("b", "e", 7);

g.addEdge("c", "a", 5);
g.addEdge("c", "b", 4);
g.addEdge("c", "d", 6);
g.addEdge("c", "f", 2);

g.addEdge("d", "b", 8);
g.addEdge("d", "c", 6);
g.addEdge("d", "e", 11);
g.addEdge("d", "f", 9);

g.addEdge("e", "b", 7);
g.addEdge("e", "d", 11);
g.addEdge("e", "f", 3);
g.addEdge("e", "g", 10);

g.addEdge("f", "c", 2);
g.addEdge("f", "d", 9);
g.addEdge("f", "e", 3);
g.addEdge("f", "g", 12);

g.addEdge("g", "e", 10);
g.addEdge("g", "f", 12);

g.primAlgorithm("a");

/*
g.addEdge("a", "b", 2);
g.addEdge("a", "c", 3);

g.addEdge("b", "a", 2);
g.addEdge("b", "c", 5);
g.addEdge("b", "d", 3);
g.addEdge("b", "e", 4);

g.addEdge("c", "a", 3);
g.addEdge("c", "b", 5);
g.addEdge("c", "e", 4);

g.addEdge("d", "b", 3);
g.addEdge("d", "e", 2);
g.addEdge("d", "f", 3);

g.addEdge("e", "b", 4);
g.addEdge("e", "c", 4);
g.addEdge("e", "d", 2);
g.addEdge("e", "f", 5);

g.addEdge("f", "d", 3);
g.addEdge("f", "e", 5);
*/

// good
// g.addNode("1");
// g.addNode("2");
// g.addNode("3");
// g.addNode("4");
// g.addNode("5");
// g.addNode("6");
// g.addNode("7");

// g.addEdge("1", "2", 29);
// g.addEdge("1", "6", 10);

// g.addEdge("2", "1", 28);
// g.addEdge("2", "3", 16);
// g.addEdge("2", "7", 14);

// g.addEdge("3", "2", 16);
// g.addEdge("3", "4", 12);

// g.addEdge("4", "7", 18);
// g.addEdge("4", "5", 22);
// g.addEdge("4", "3", 12);

// g.addEdge("5", "4", 22);
// g.addEdge("5", "7", 24);
// g.addEdge("5", "6", 25);

// g.addEdge("6", "1", 10);
// g.addEdge("6", "5", 25);

// g.addEdge("7", "2", 14);
// g.addEdge("7", "5", 24);
// g.addEdge("7", "4", 18);

//g.printAdjacencyList();



