const { LLData } = require("./LLData");

exports.LList = class{
    constructor(){
        this.head = null;
        this.tail = null;
    }

    getFirst(){
        return this.head;
    }

    getLast(){
        return this.tail;
    }
    
    add(value){
        const newNode = new LLData(value);
        if(!this.head || !this.tail){
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        this.tail.next = newNode;
        this.tail = newNode;
        return this;
    }

    addFromArray(arrayOfData){
        arrayOfData.forEach(arrayOfData => this.add(arrayOfData));
    }

    remove(value) {
        if (!this.head) return null;

        let currnetNode = this.head;

        if (this.head.data === value) {
            this.head = this.head.next;
            return true;
        }
        while (currnetNode.next) {
            if (currnetNode.next.data === value) {
                if (currnetNode.next === this.tail)
                    this.tail = currnetNode;
                currnetNode.next = currnetNode.next.next;
                return true;
            } else currnetNode = currnetNode.next;
        }
        return false;
    }

    removeAll(value) {
        if (!this.head) return null;

        let currentNode = this.head;

        if (currentNode !== null) {
            if (this.head.data === value) this.head = this.head.next;
            while (currentNode.next) {
                if (currentNode.next.data === value) currentNode.next = currentNode.next.next;
                else currentNode = currentNode.next;
            }
        }
        if (this.tail.data === value) this.tail = currentNode;
    }

    contains(value) {
        if (!this.head) return null;
        if (value === undefined) return null;

        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.data === value) return true;
            currentNode = currentNode.next;
        }
        return false;
    } 
 
    clear(){
        this.tail = null;
        this.head = null;
    }

    count() {
        if (!this.head) return null;

        let count = 0;
        let currentNode = this.head;
        while (currentNode) {
            currentNode = currentNode.next;
            count++;
        } 
        return count;
    }

    toString(){
        const nodes = [];
        let currentNode = this.head;
        while(currentNode){
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }
        return arr.join(', ');
    }

    getIterator() {
        return this[Symbol.iterator]();
    }

    filter(callback) {
        let newList = Object.assign(Object.create(this), JSON.parse(JSON.stringify(this)));
        let currentNode = newList.head;
        while (currentNode) {
            if (!callback(currentNode.data)) newList.remove(currentNode.data);
            currentNode = currentNode.next;
        }
        return newList;
    }

    [Symbol.iterator]() {
        let currnetNode = this.head;
        return {
            next() {
                let value, done = true;
                if (currnetNode !== null) {
                    value = currnetNode.data;
                    done = false;
                    currnetNode = currnetNode.next;
                }
                return {
                    value: value, done: done
                }
            }
        }
    }
}

