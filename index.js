var http = require('http');        // 通过http模块访问百度的接口
var querystring = require('querystring');    // 处理请求参数的querystring模块
var fs = require('fs');      // fs模块，用来保存语音文件
var path = require('path');    // path模块，处理路径
let index = 1;
playVideo(15 * 1000);
function playVideo(timeout) {
console.log('我在说第' +  index++  + ' 遍;');
setTimeout(() => {
  var text = '小度小度,,,  ';
  // text += index % 2 === 0 ? '我从西二旗到五道口怎么走' : '我想看下附近的餐馆';
  text += '附近的餐馆有哪些？';
  // text += '我从西二旗到五道口怎么走';
  var postData = querystring.stringify({
    //"lan": "zh",    // zh表示中文
    //"ie": "UTF-8",  // 字符编码
    //"spd": 2,       // 表示朗读的语速，9代表最快，1是最慢（撩妹请用2，绕口令请用9）
    "text":  text,
    //"per": 1
    "speaker": 100,
    "speed": 2
  });

  var options = {
    "method": "GET",
    // "hostname": "tts.baidu.com",
    // "hostname": "st01-rdqa04-dev124-xuejuntao.epc:8199",
    "hostname": "xiaodu.baidu.com",
    // "path": "/text2audio?" + postData
    "path": "/speech/api/tts?" + postData
  };


  // 调用http模块的request方法请求百度接口
  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);   // 获取到的音频文件数据暂存到chunks里面
    });

    res.on("end", function () {
      // 这里用到了Buffer模块，大概意思就是把获取到的语音文件流存入到body里面，body是一个Buffer
      var body = Buffer.concat(chunks);
      // 生成的mp3文件存储的路径，文件名叫做iloveu.mp3
      var filePath = path.normalize('./iloveu.mp3');
      // fs模块写文件
      fs.writeFileSync(filePath, body);
     var player = require('play-sound')(opts = {})
     player.play('./iloveu.mp3', {}, function(err){
       if (err) throw err
       playVideo(timeout);
     });
    });
  });
  req.end();
  }, timeout);
}


