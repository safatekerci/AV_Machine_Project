//server.js
var app         = require('express')();
var http        = require('http').Server(app);
var io          = require('socket.io')(http);
var dl          = require('delivery');
var fs          = require('fs');
var formidable  = require('formidable');

// av_machine tarafında bir socket açtık..
io.sockets.on('connection', function(socket){
  // supervisor'ı dinle...
  var delivery = dl.listen(socket);
  // alma işlemi başarılıysa...
  delivery.on('receive.success',function(file){
    // alınan dosyayı belirtilen yere kaydet..
    console.log("dosya geldii");
    //console.log(data);
    
    fs.writeFile('./receivefiles/' + file.name, file.buffer, function(err){
      if(err){
        console.log('!!! Supervisor -> Dosya kaydedilemedi : ' + err);
      }else{
        console.log('Supervisor => ' + file.name + " dosyası başarıyla kaydedildi...");
        
        // Web_Server'dan gelen dosyayı AV-Machine' e göndermek için..
        
      };
    });
    
  });	
});
// portu dinle...
http.listen(8080, function () {
  console.log('8080. port dinleniyor..');
});