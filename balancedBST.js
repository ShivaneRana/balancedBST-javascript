class Node{
	constructor(data = null){
	this.data = data;
	this.left = null;
	this.right = null;
	}
}

class bst{
	constructor(arr){
		arr = this.sortArr(this.removeD(arr));
		this.root = this.buildTree(arr,0,arr.length-1);
	}

	buildTree(arr,start,end){
		if(start > end) return null;
		let mid = start + Math.floor((end - start)/2);
		const tree = new Node(arr[mid]);
		tree.left = this.buildTree(arr,start,mid-1);
		tree.right = this.buildTree(arr,mid+1,end);
		return tree;
	}

	//sort the arr
	sortArr(arr){
		for(let i = 0;i < arr.length;i++){
			for(let j = i + 1;j < arr.length;j++){
				if(arr[i] > arr[j]){
					const temp = arr[j];
					arr[j] = arr[i];
					arr[i] = temp;
				}
			}
		}
		return arr;
	}

	//remode duplicates
	removeD(arr){
		return [...new Set(arr)];
	}


	//print the BST
	prettyPrint(node, prefix = "", isLeft = true){
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
		}
		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
		if (node.left !== null) {
			this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
		}
	};

	//insert the value in correct position 
	insert(root,value){
		if(root === null){
			return new Node(value);
		}

		if(root.data === value){
			return root;
		}

		if(value > root.data){
			root.right = this.insert(root.right,value); 
		}else if(value < root.data){
			root.left = this.insert(root.left,value);
		}

		return root;
	}

	//find the node with given value
	find(root,value){
		if(root === null){
			return root;
		}

		if(root.data === value){
			return root;
		}

		if(root.data > value){
			return this.find(root.left,value);
		}else{
			return this.find(root.right,value);
		}
	}

	//inOrder
	inOrder(callback){
		if(typeof callback !== 'function'){
			throw new Error("callback is required");
		}

		const traverse = (node) => {
			if(node === null) return;

			traverse(node.left);
			callback(node.data);
			traverse(node.right);
		}

		console.log('');
		console.log("*".repeat(50));
		console.log("inOrder traversal ~");
		traverse(this.root);
	}

	//postOrder
	postOrder(callback){
		if(typeof callback !== 'function'){
			throw new Error("callback is required");
		}

		const traverse = (node) => {
			if(node === null) return;

			traverse(node.left);
			traverse(node.right);
			callback(node.data);
		}

		console.log('');
		console.log("*".repeat(50));
		console.log("postOrder traversal ~");
		traverse(this.root);
	}

	//preOrderd
	preOrder(callback){
		if(typeof callback !== 'function'){
			throw new Error("callback is required");
		}

		const traverse = (node) => {
			if(node === null) return;

			callback(node.data);
			traverse(node.left);
			traverse(node.right);
		}

		console.log('');
		console.log("*".repeat(50));
		console.log("preOrder traversal ~");
		traverse(this.root);
	}

	//iterative levelOrder
	iLevelOrder(callback){
		if(typeof callback !== "function"){
			throw new Error("callback is required");
		}

		let result = [];
		let queue = [this.root];
		while(queue.length > 0){
			let size = queue.length;
			
			for(let i = 0;i < size;i++){
				let node = queue.shift();
				result.push(node.data);

				if(node.left) queue.push(node.left);
				if(node.right) queue.push(node.right);
			}
		}

		console.log('');
		console.log("*".repeat(50));
		console.log("iterative levelOrder function~");
		callback(result);
	}

	//recursive levelOrder function
	rLevelOrder(callback){
		if(typeof callback !== "function"){
			throw new Error("callback is required");
		}

		let result = [];
		const traverse = (node) => {
			if(node.length === 0) return;

			let nextNode = [];
			for(let i of node){
				result.push(i.data);
				if(i.left) nextNode.push(i.left);
				if(i.right)	nextNode.push(i.right);
			}

			traverse(nextNode);
		}

		console.log('');
		console.log("*".repeat(50));
		console.log("recursive levelOrder function~");
		traverse([this.root]);
		callback(result)
	}

	//depth of a node is the number of edges between the root node and leaf node
	//depth of a root node is 0
	depth(node){

		const traverse = (root,value,currentDepth) => {
			if(root === null) return -1;
			if(root.data === value) return currentDepth;
			if(value > root.data){
				return traverse(root.right,value,currentDepth + 1);
			}

			if(value < root.data){
				return traverse(root.left,value,currentDepth + 1);
			}
		}
		
		return	traverse(this.root,node,0);
	}

	//height of a node is the number of edges in the longes path to a leaf node.
	//height of a leaf node is 0
	height(node,len = 0){
		if(node === null) return -1;
		let left = this.height(node.left, len + 1);
		let right = this.height(node.right,len + 1);
		return Math.max(left,right) + 1;
	}

	isBalanced(node){
		if(node === null) return null;
		const left = this.height(node.left);
		const right = this.height(node.right);
		return left - right === 1 || left - right === 0 ? true : false; 
	}
}


const arr = [1,5,6,3,4,2,3,2,1,8,6,90];
const t1 = new bst(arr);
t1.prettyPrint(t1.root);
console.log(t1.isBalanced(t1.root));