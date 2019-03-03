//server.js
var app         = require('express')();
var http        = require('http').Server(app);
var io          = require('socket.io')(http);
var dl          = require('delivery');
var fs          = require('fs');
var formidable  = require('formidable');

var spawn       = require('child_process').spawn;
//var cp      = spawn(process.env.comspec, ['/c', 'C:\\Program Files\\ESET\\ESET Smart Security\\ecls.exe', 'C:\\Users\\Safa\\Desktop\\nothink-malware-archive-2014\\2014\\1cacc41bd5336b11330df2c435c8053a']);
var stdout  = '';
var stderr  = '';
var index   = 0;
var msg = "";
// supervisor tarafında bir socket açtık..
io.sockets.on('connection', function(socket){
    // web serverı  dinle...
    var delivery = dl.listen(socket);
    // alma işlemi başarılıysa...
    delivery.on('receive.success',function(file){
        msg = "";
        stdout = "";
        fs.writeFile('./receivefiles/' + file.name, file.buffer, function(err){
            if(err){
                console.log('AV_Machine(Eset) => Dosya kaydedilemedi !!! : ' + err);
                io.sockets.emit ('scanResult', "scanError");
            }
            else{
                console.log('AV_Machine(Eset) => ' + file.name + " dosyası başarıyla kaydedildi...");
                
                var command = spawn(process.env.comspec, ['/c', 'C:\\Program Files\\ESET\\ESET Security\\ecls.exe', './receivefiles/' + file.name]);

                command.stdout.on("data", function(buf) {
                    
                    stdout += buf;
                    index =  stdout.indexOf('tehdit',0);

                }); 

                command.on('close', function(code) {
                    
                    for(i=index+8; i<index+50; i++)
                    {
                        if(stdout[i] == '"')
                            break;
                        msg = msg + stdout[i];
                    }

                    //console.log("message => ",msg);
                    //console.log("index   => ",index);

                    if(index != -1 ){
                        io.sockets.emit ('scanResult',  msg);
                        console.log("AV_Machine(Eset) => scanResult : ", msg);
                    }
                    else{
                        io.sockets.emit ('scanResult', "OK");
                        console.log("AV_Machine(Eset) => scanResult : OK");
                    } 
                    fs.unlink('./receivefiles/' + file.name,function(err){
                        console.log("AV_Machine(Eset) => " + file.name + ' dosyası silindi.');
                    });    
                });
            };
        });

        
    });	
});

// portu dinle...
http.listen(5001, function () {
  console.log('AV_Machine(Eset) => 5001. port dinleniyor..');
});

