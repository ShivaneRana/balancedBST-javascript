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

	removeD(arr){
		return [...new Set(arr)];
	}


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
}


const arr = [1,5,6,3,4,2,3,2,1,8,9,6];
const t1 = new bst(arr);
t1.prettyPrint(t1.root);