class Node{
	constructor(data = null){
	this.data = data;
	this.left = null;
	this.right = null;
	}
}

class bst{
	constructor(arr){
		this.root = buildTree(this.sortArr(this.removeD(arr)),0,arr.length-1);
	}

	buildTree(arr,start,end){
		if(start > end) return null;
		let mid = start + Math.floor((end - start)/2);
		const tree = new Node(arr[mid]);
		tree.left = this.buildTree(arr,0,mid-1);
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
	}

		removeD(arr){
			arr = [...new Set(arr)];
		}


		prettyPrint(node, prefix = "", isLeft = true){
			if (node === null) {
				return;
			}
			if (node.right !== null) {
				prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
			}
			console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
			if (node.left !== null) {
				prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
			}
		};
}


