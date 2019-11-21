var width, height
window.onload=myInit();
let activeColor='red';
let yAxis=false;
var ctx
function myInit(){
    document.getElementById("imageFile").addEventListener("change",handleFiles);
}
function handleFiles(){
    
    var theGoods=document.getElementById("imageFile").files[0];
    var img=new Image();
    var reader=new FileReader();

    reader.addEventListener("load",function(){
        img.src=reader.result;
    })

    img.onload = function(){ 
        calcAndGraph(img)
    }

    if(theGoods) {
        reader.readAsDataURL(theGoods);
    }
}

function calcAndGraph(img){
    let rD=[], gD=[] ,bD=[];
    let cvs=document.getElementById("mycanvas");
	ctx=cvs.getContext("2d");
    width=cvs.width;
    height=cvs.height;
	console.log("image w,h",width,height)
    ctx.drawImage(img,0,0);
	
	//invertImageDiagonally({x:0,y:0,width:width,height:height})
	//flipHorizontally({x:0,y:0,width:width,height:height})
    

}
function invertImageDiagonally(rect){
	const iD=ctx.getImageData(rect.x,rect.y,rect.width,rect.height).data;
	
	var imagedata = ctx.createImageData(rect.width, rect.height);
	var i,j=iD.length-4
	for(i=0;i<iD.length;i+=4){
		imagedata.data[j] = iD[i];
		imagedata.data[j+1] = iD[i+1];
		imagedata.data[j+2] = iD[i+2];
		imagedata.data[j+3] = iD[i+3];
		j-=4
	}
	ctx.putImageData(imagedata, rect.x,210);
}
function flipHorizontally(rect){
	console.log("w,h",rect.width,rect.height,rect.width*rect.height*4)
	const iD=ctx.getImageData(rect.x,rect.y,rect.width,rect.height).data;  
	var imagedata = ctx.createImageData(rect.width, rect.height);
	var i,j=0,t=0
	for(i=0;i<iD.length;i+=4){
		imagedata.data[i] = iD[((rect.width-j)*4)-4+t];
		imagedata.data[i+1] = iD[((rect.width-j)*4)-4+1+t];
		imagedata.data[i+2] = iD[((rect.width-j)*4)-4+2+t];
		imagedata.data[i+3] = iD[((rect.width-j)*4)-4+3+t];
		j++
		if(j>=rect.width) {
			j=0
			t+=rect.width*4
		}
	}
	console.log("img",imagedata.data)
	ctx.putImageData(imagedata, rect.x,210+200);
}

function flipVertically(rect){
	console.log("w,h",rect.width,rect.height,rect.width*rect.height*4)
	const iD=ctx.getImageData(rect.x,rect.y,rect.width,rect.height).data;  
	var imagedata = ctx.createImageData(rect.height, rect.width);
	var i,j=0,t=0
	for(i=0;i<iD.length;i+=4){
		imagedata.data[i] = iD[((rect.width-j)*4)-4+t];
		imagedata.data[i+1] = iD[((rect.width-j)*4)-4+1+t];
		imagedata.data[i+2] = iD[((rect.width-j)*4)-4+2+t];
		imagedata.data[i+3] = iD[((rect.width-j)*4)-4+3+t];
		j++
		if(j>=rect.width) {
			j=0
			t+=rect.width*4
		}
	}
	console.log("img",imagedata.data)
	ctx.putImageData(imagedata, rect.x,210);
}
