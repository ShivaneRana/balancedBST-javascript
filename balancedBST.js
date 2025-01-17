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

		console.log("*".repeat(50));
		console.log("preOrder traversal ~");
		traverse(this.root);
	}
}


const arr = [1,5,6,3,4,2,3,2,1,8,6];
const t1 = new bst(arr);
t1.prettyPrint(t1.root);
const print = (value) => console.log(value);