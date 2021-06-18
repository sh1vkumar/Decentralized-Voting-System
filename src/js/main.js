// const inputs = document.querySelectorAll(".input");


// function addcl(){
// 	let parent = this.parentNode.parentNode;
// 	parent.classList.add("focus");
// }

// function remcl(){
// 	let parent = this.parentNode.parentNode;
// 	if(this.value == ""){
// 		parent.classList.remove("focus");
// 	}
// }


// inputs.forEach(input => {
// 	input.addEventListener("focus", addcl);
// 	input.addEventListener("blur", remcl);
// });

var details = [
    {
        AccountAddress : "0x1DC7F522889E993dDCC8138e492c67030Ca615b9",
        PrivateKey : "1f401e8360e9ecebd11b1155342962b59c43a63dacfdc411759e274467409071"
    },
    {
        AccountAddress : "0xdF8E7bc3fa213Be34ee46FEC8722aD591C9CB6AD",
        PrivateKey : "a7605fef4b72b6f548b29b24b82d12854b3ea697f1dbf812297de99d66d896fd"
    },
    {
        AccountAddress : "0xaB5C9D8D29583956A06e56833F2aA2040e7Aa45d",
        PrivateKey : "4ba0373102dbde67a056274037c83b563fb56eab8cb79dcc289d7cd1ca9205e5"
    },
    {
        AccountAddress : "0x70F94927874AAb8D6e48fdF0A6c219BfB20c4a8A",
        PrivateKey : "26bb424560705acf59239c9f25f0071ab3e1edf93e6e769a2d91a88062e6514d"
    },
    {
        AccountAddress : "0xc313D9986010360a0cF4320A3d6934eA9BB8FBF6",
        PrivateKey : "1024652fe337f0237be35c0100513a43624f7e5719b6959bbb6a509685ebf554"
    },
    {
        AccountAddress : "abcd",
        PrivateKey : "1234"
    }
]

function Check(){
    var addr = document.getElementById("AccAddr").value;
    var PK = document.getElementById("PrivateKey").value;
    var flag=0;
    for(var i=0;i<details.length;i++){
        if(addr == details[i].AccountAddress && PK == details[i].PrivateKey)flag++;
    }
    if(flag==1){
        window.location.assign("main.html");
    }
    else{
        document.getElementById("warnText").innerHTML = "Credentials are wrong!!"
    }
}