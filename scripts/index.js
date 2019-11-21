window.onload=myInit();
function myInit(){

    myDisplay()
}
function myDisplay(){
    var cvs=document.getElementById("mycanvas")
    var ctx=cvs.getContext("2d");
    
    var rect={
        x:0,
        y:0,
        w:200,
        h:200
    }

    cvs.addEventListener('click',function(e){
        var mousePos=getMousePos(cvs,e)
        if(InsideMousePos(mousePos,rect)){
            console.log("clicked inside")
        }else{
            console.log("clicked outside")
        }
    })

    const path=new Path2D();
    path.rect(0,0,200,200)
    path.rect(25,75,32,32)
    path.closePath()

    ctx.fillStyle="#fff"
    ctx.fill(path)
    ctx.lineWidth=2
    ctx.strokeStyle="#000"
    ctx.stroke(path)
}
function InsideMousePos(pos,rect){
    return pos.x>rect.x && pos.x<rect.x+rect.w && pos.y>rect.y && pos.y<rect.y+rect.h;
}
function getMousePos(cvs,e){
    var rect=cvs.getBoundingClientRect();
    return{
        x:e.clientX-rect.left,
        y:e.clientY-rect.top
    }

}
