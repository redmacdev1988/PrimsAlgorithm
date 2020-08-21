  class Node {
    constructor(val, priority) {
      this.value = val;
      this.priority = priority;
      this.next = null;
    }

    print() {
        console.log(`${this.value} (${this.priority})`);
    }
  }
  

  let createLinkedListInstance = (function LinkedList() {

    let head = null;
    let tail = null;
    let iterator = null;

    return new class LinkedList {
    
        add = function(value, priority) {
            if (!head && !tail) {
                head = new Node(value, priority, null);
                tail = head;
                iterator = head;
            } else {
                tail.next = new Node(value, priority, null);
                tail = tail.next;
            }
        }
        
        print = () => {
            console.log(`--- printing Linked List ---`);
            for (let tmp = head; tmp != null; tmp = tmp.next) { 
                console.log(tmp);
            }
        }
    
        next = () => {
            if (iterator) {
                let tmp = iterator;
                iterator = iterator.next;
                return tmp;
            } else {
                return null;
            }
        }
    
        hasNext = () => { return iterator ? true : false; }
        resetIterator = () => { iterator = head; }
    }
});


  class PriorityQueue {
  
    constructor() {
      this.heap = []; // array, with first null element
    }
  
    isEmpty() {
        return this.heap.length == 0;
    }

    print(index) {
      console.log("----- PRINTING HEAP --------")
      for (let v = 0; v < this.heap.length; v++) {
        console.log(`${this.heap[v].value.nodeValue}, ${this.heap[v].value.previousNodeValue}, ${this.heap[v].priority} | `);
      }
      console.log("\n--------- finished printing heap -----------");
    }
  
    // worse case, number of levels, translates to O(log n)
  
    insert (value, priority) {
        const newNode = new Node(value, priority);
        this.heap.push(newNode);
        let currentNodeIdx = this.heap.length-1;
        let currentNodeParentIdx = Math.ceil( (currentNodeIdx-2) / 2);
        while(this.heap[currentNodeParentIdx] &&
          newNode.priority < this.heap[currentNodeParentIdx].priority) {
            const parent = this.heap[currentNodeParentIdx];
            this.heap[currentNodeParentIdx] = newNode;
            this.heap[currentNodeIdx] = parent;
            currentNodeIdx = currentNodeParentIdx;
            currentNodeParentIdx = Math.ceil((currentNodeIdx-2)/2);
        }
    } // insert
  
    getLeftChildIndex(currentIndex) {return 2 * currentIndex + 1;}
    getRightChildIndex(currentIndex) {return 2 * currentIndex + 2;}
    getLeftChild(currentIndex) {return this.heap[this.getLeftChildIndex(currentIndex)];}
    setLeftChild(currentIndex, newNode) {this.heap[this.getLeftChildIndex(currentIndex)] = newNode;}
    getRightChild(currentIndex) {return this.heap[this.getRightChildIndex(currentIndex)];}
    setRightChild(currentIndex, newNode) { this.heap[this.getRightChildIndex(currentIndex)] = newNode;}
    getCurrentNode(currentIndex) { return this.heap[currentIndex]; }
    setCurrentNode(currentIndex, newNode) {this.heap[currentIndex] = newNode;}
  
    exchangeCurrentAndLeftChild(currentIndex, left) {
      let temp = this.getCurrentNode(currentIndex);
      this.setCurrentNode(currentIndex, left);
      this.setLeftChild(currentIndex, temp);
    }
  
    exchangeCurrentAndRightChild(currentIndex, right) {
      let temp = this.getCurrentNode(currentIndex);
      this.setCurrentNode(currentIndex, right);
      this.setRightChild(currentIndex, temp);
    }
  
    topToBottomHeapify(currentIndex) {
      let current = this.getCurrentNode(currentIndex);
      if (!current) {return null;} else {
        //console.log(`processing index ${currentIndex} for value: ${this.heap[currentIndex].value}`);
      }
      let left = this.getLeftChild(currentIndex);
      let right = this.getRightChild(currentIndex);
  
      if (left && !right && left.priority < current.priority) {
        this.exchangeCurrentAndLeftChild(currentIndex, left);
  
      } else if (!left && right && right.priority < current.priority) {
        this.exchangeCurrentAndRightChild(currentIndex, right);
  
      } else if (left && right && (left.priority < current.priority || right.priority < current.priority)) {
        console.log(`both left and right exists: ${left.priority}, ${right.priority}, and one of them is larger than parent`);
        if (left.priority < right.priority) {
          this.exchangeCurrentAndLeftChild(currentIndex, left);
        } else {
          this.exchangeCurrentAndRightChild(currentIndex, right);
        }
      }
      this.topToBottomHeapify(2*currentIndex+1);
      this.topToBottomHeapify(2*currentIndex+2);
    }
  
    remove() {
        
      let toProcess = this.heap[0];
      if (toProcess) {
        this.heap[0] = this.heap[this.heap.length-1];
        this.heap.pop();
        this.topToBottomHeapify(0);
        return toProcess;
      } else {
          console.log('now empty');
          return null;
      }
    }
  
  }
  
  export { Node };
  export { PriorityQueue };
  export { createLinkedListInstance };
