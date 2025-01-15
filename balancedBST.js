class node{
	contructor(data = null){
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

class tree{
	constructor(arr){
		this.root = this.buildTree(arr);
	}

	buildTree(arr){
		const newarr = this.removeDuplicate(arr);
		newarr = this.sort(newarr);
		this.balancedBST(arr,0,arr.length-1);
	}

	balancedBST(arr,start,end){
		if(end > start) return null;
		const mid = start + Math.floor(( end - start)/2);
		const tree = new node(arr[mid]);
		tree.left = this.balancedBST(arr,0,mid-1);
		tree.right = this.balancedBST(arr,mid+1,end);
		return tree;
	}

	removeDuplicate(arr){
		for(let i = 0;i < arr.length-1;i++){
			for(let j = arr.length-1;j > i;){
				if(arr[j] === arr[i]){
					arr.splice(j,1);
				}
				j--;
			}
		}
	} 
	
	sort(arr){
		for(let i = 0;i < arr.length;i++){
			for(let j = 0;j < arr.length;j++){
				if(arr[i] > arr[j]){
					const temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
	}
}


