(function () {
    var html = document.documentElement;

    function onWindowResize() {
        html.style.fontSize = html.getBoundingClientRect().width / 16 + 'px';
    }
    window.addEventListener('resize', onWindowResize);
    onWindowResize();
})();
$(document).ready(function(){
    (function () {
        var num1 = 0;
        $(".buyBox").on("mouseenter",buyHander);
        $(".buyBox").on("mouseleave",buyHander);
        $(".buyList").on("mouseenter",buyHander);
        $(".buyList").on("mouseleave",buyHander);
        function  buyHander(e) {
            if(e.type === "mouseenter"){
                num1+=1;
                changeBuy()
            }else if(e.type === "mouseleave"){
                num1-=1;
                changeBuy();
            }
        }
        function changeBuy(){
            if(num1 === 0){
                $(".buyList").hide();
            }else{
                $(".buyList").show();
            }
        }
    })();

    $(".inputSearch input").on("focus",function () {
        $(".searchIcon").hide();
    })
    $(".li1,.li2,.li3").on("mouseenter",hideHander);
    $(".navShow").on("mouseleave",hideHander);
    $(".li1,.li2,.li3").on("mouseleave",hideHander);
    $(".navShow").on("mouseenter",hideHander);
    function  hideHander(e) {
        if(e.type==="mouseleave"){
            $(".navShow").hide()
        }else if(e.type === "mouseenter"){
            $(".navShow").css("display","flex");
        };
    }
})