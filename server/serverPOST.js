//加载node按照时自带http.js文件，这个文件返回了一个对象,对象下有一个createServer的方法
var http=require("http");
// var strs=require("querystring");
//创建node服务，并且返回
//req客户端向服务器请求的对象
//res服务端向客户端发送的对象
var server=http.createServer(function (req,res) {
    //侦听当数据发送过来时,这里的参数d是一个二进制数据流，是由客户端send(内容)发过来的数据
    var data="";
    req.on("data",function (d) {
        data+=d;
    });
    req.on("end",function () {
        var obj=JSON.parse(data);
        //这是服务器客户端发送的消息，这里是写入发送的消息头，
        //200 表示当前通信成功
        //"Content-Type":"text/plane" 设置当前发送内容文本自由化
        //"Access-Control-Allow-Origin":"*"添加跨域的白名单是所有网站
        res.writeHead(200,{"Content-Type":"text/plane","Access-Control-Allow-Origin":"*"});
        //写入向客户端发送的消息
        res.write(JSON.stringify(obj));
        //结束发送
        res.end();
    })
});
//侦听设置，设置当前的服务的端口是3003，当前服务开启的ip是10.9.164.92
server.listen(3004,"10.9.42.223",function () {
    console.log("启动服务，开始侦听");
});