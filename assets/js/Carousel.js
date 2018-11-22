var Carousel=(function () {
    var liStyle={
        width: "20px",
        height: "20px",
        borderRadius:"20px",
        backgroundColor:"rgba(255,255,255,0)",
        border: "1px solid #FFF",
        float: "left",
        lineHeight: "20px",
        textAlign: "center",
        marginLeft: "20px",
        color:"white"
    };
    var ulStyle={
        margin:0,
        padding:0,
        listStyle: "none",
        position: "absolute",
        bottom: "20px"
    };
    var imgConStyle={
        position: "absolute",
        left:"0px",
    };
    var maskDivStyle={

        overflow: "hidden",
        position:"relative" ,
        margin: "auto",
        backgroundColor: "antiquewhite"
    };

    function Carousel(parent,list,bnList) {
        this.source=list;
        this.initCarousel(parent,bnList);
    }
    Carousel.prototype={
        imageList:[],
        carousel:null,
        _width:0,
        _height:0,
        _source:null,
        position:0,
        direction:"",
        bool:false,
        autoBool:false,
        time:0,
        timeDelay:270,
        preDot:null,
        set source(value){
            if(!value)return;
            this._source=value;
            this.width=0;
            this.height=0;
            this.direction="";
            this.position=0;
            this.imageList.length=0;
            this.loadImg(value);
        },
        get source(){
            return this._source;
        },
        set width(value){
            this._width=value;
            if(value === "100%"){
                this.carousel.style.width = "100%";
                this.carousel.firstElementChild.style.width="200%";
                for(var i=0;i<this.carousel.firstElementChild.children.length;i++){
                    this.carousel.firstElementChild.children[i].style.width= "100%";
                }
                return ;
            }
            if(value>0){
                this.carousel.style.width=value;
                for(var i=0;i<this.carousel.firstElementChild.children.length;i++){
                    this.carousel.firstElementChild.children[i].style.width=value + "px";
                }
            }
        },
        get width(){
            return this._width
        },
        set height(value){
            this._height=value;
            if(value === "100%"){
                this.carousel.style.height = "100%";
                for(var i=0;i<this.carousel.firstElementChild.children.length;i++){
                    this.carousel.firstElementChild.children[i].style.height= "100%";
                }
                return ;
            }
            if(value>0){
                this.carousel.firstElementChild.style.height=this.carousel.style.height=value + "px";
                for(var i=0;i<this.carousel.firstElementChild.children.length;i++){
                    this.carousel.firstElementChild.children[i].style.height=value +"px";
                }
                this.resetBnPosition();
            }
        },
        get height(){
            return this._height
        },
        loadImg:function (list) {
            var img=new Image();
            img.self=this;
            img.num=0;
            img.list=list;
            img.imgList=[];
            img.addEventListener("load",this.loadHandler);
            img.src=list[img.num];
        },
        loadHandler:function (e) {
            this.imgList.push(this.cloneNode(false));
            this.num++;
            if(this.num>this.list.length-1){
                this.removeEventListener("load",this.loadHandler);
                this.self.finishLoad(this.imgList);
                return;
            }
            this.src=this.list[this.num];
        },
        finishLoad:function (list) {
            var imgCon=this.carousel.firstElementChild;
            var ul=this.carousel.lastElementChild;
            this.imageList=list;
            this.clearCon(imgCon);
            this.clearCon(ul);
            imgCon.appendChild(this.imageList[0]);
            if(this.width===0){
                this.carousel.style.width=this.imageList[0].width+"px";
                this._width=this.imageList[0].width;
            }else{
                this.carousel.style.width="100%";
                for(var j=0;j<imgCon.children.length;j++){
                    imgCon.children[j].style.width="50%";
                }
            }
            if(this.height===0){
                imgCon.style.height=this.carousel.style.height=this.imageList[0].height+"px";
                this._height=this.imageList[0].height;
            }else{
                imgCon.style.height=this.carousel.style.height="100%";
                for(var s=0;s<imgCon.children.length;s++){
                    imgCon.children[s].style.height="100%";
                }
            }
            for(var i=0;i<this.imageList.length;i++){
                var li=document.createElement("li");
                Object.assign(li.style,liStyle);
                ul.appendChild(li);
            }
            ul.addEventListener("click",this.ulClickHandler);
            ul.style.left= "4.8rem";
            this.changeDot();
           // this.resetBnPosition();
        },
        clearCon:function (con) {
            var len=con.children.length;
            for(var i=0;i<len;i++){
                con.firstElementChild.remove();
            }
        },
        initCarousel:function (parent,bnList) {
            if(!this.carousel){
                this.carousel=document.createElement("div");
                this.carousel.self=this;
                this.carousel.addEventListener("mouseenter",this.carouselMouseHandler);
                this.carousel.addEventListener("mouseleave",this.carouselMouseHandler);
                Object.assign(this.carousel.style,maskDivStyle);
                var imgCon=document.createElement("div");
                Object.assign(imgCon.style,imgConStyle);
                this.carousel.appendChild(imgCon);
                if(bnList){
                    for(var i=0;i<bnList.length;i++){
                        var img=new Image();
                        img.self=this;
                        img.addEventListener("load",this.bnLoadHandler);
                        img.src=bnList[i];
                        img.addEventListener("click",this.bnClickHandler);
                        var bnStyle={
                            position: "absolute",
                            display:"none"
                        };
                        if(i===0){
                            bnStyle.left="10px";
                        }else{
                            bnStyle.right="10px";
                        }
                        Object.assign(img.style,bnStyle);
                        this.carousel.appendChild(img);
                }


                }
                var ul=document.createElement("ul");
                ul.self=this;
                Object.assign(ul.style,ulStyle);
                this.carousel.appendChild(ul);
                parent.appendChild(this.carousel);
            }
            return this.carousel;
        },
        bnLoadHandler:function (e) {
            this.self.resetBnPosition();
        },
        resetBnPosition:function () {
            this.carousel.children[1].style.top=this.carousel.children[2].style.top=(this.height-this.carousel.children[1].offsetHeight)/2+"px";
        },
        bnClickHandler:function (e) {
            if(this.self.bool) return;

            if(this.offsetLeft===10){
                this.self.direction="right";
                this.self.position--;
                if(this.self.position<0) this.self.position=this.self.imageList.length-1;
            }else{
                this.self.direction="left";
                this.self.position++;
                if(this.self.position===this.self.imageList.length) this.self.position=0;
            }
            this.self.createNextImg();
        },
        ulClickHandler:function (e) {
            if(!e.target instanceof HTMLLIElement) return;
            var arr=Array.from(this.children);
            var index=arr.indexOf(e.target);
            if(index===this.self.position) return;
            this.self.direction=index>this.self.position ? "left" : "right";
            this.self.position=index;
            this.self.createNextImg();
        },
        createNextImg:function () {
            var imgCon= this.carousel.firstElementChild;
            imgCon.style.width="200%";
            if(this.direction==="left"){
                imgCon.appendChild(this.imageList[this.position]);
                imgCon.style.left="0px";
            }else if(this.direction==="right"){
                imgCon.insertBefore(this.imageList[this.position],imgCon.firstElementChild);
                imgCon.style.left=-this.carousel.offsetWidth+"px";
            }
            if(this.width!==0){
                this.imageList[this.position].style.width="50%";
            }
            if(this.height!==0){
                this.imageList[this.position].style.height="100%";
            }
            this.changeDot();
            this.bool=true;
        },
        update:function () {
            this.carouselPlay();
            this.autoPlayImg();
        },
        carouselPlay:function () {
            if(!this.bool) return;
            var imgCon= this.carousel.firstElementChild;
            if(this.direction==="left"){
                imgCon.style.left=imgCon.offsetLeft-20+"px";
                if(imgCon.offsetLeft<-this.carousel.offsetWidth){
                    imgCon.style.left=-this.carousel.offsetWidth+"px";
                    this.bool=false;
                    this.direction="";
                    imgCon.firstElementChild.remove();
                    imgCon.style.left="0px";
                }
            }else if(this.direction==="right"){
                imgCon.style.left=imgCon.offsetLeft+20+"px";
                if(imgCon.offsetLeft>=0){
                    imgCon.style.left="0px";
                    this.bool=false;
                    this.direction="";
                    imgCon.lastElementChild.remove();
                }
            }
        },
        autoPlayImg:function () {
            if(!this.autoBool) return;
            this.time--;
            if(this.time>0)return;
            this.time=this.timeDelay;
            this.direction="left";
            this.position++;
            if(this.position===this.imageList.length) this.position=0;
            this.createNextImg();
        },
        carouselMouseHandler:function (e) {
            if(e.type==="mouseenter"){
                this.self.autoBool=false;

            }else if(e.type==="mouseleave"){
                this.self.autoBool=true;
                this.self.time=this.self.timeDelay;
            }
        },
        changeDot:function () {
            if(this.preDot){
                this.preDot.style.backgroundColor="rgba(255,255,255,0)";
            }
            this.preDot=this.carousel.lastElementChild.children[this.position];
            this.preDot.style.backgroundColor="rgba(255,255,255,1)";
        }
    };
    Carousel.prototype.constructor=Carousel;
    return Carousel;
})();