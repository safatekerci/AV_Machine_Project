//C:\\Program Files\\ESET\\ESET Smart Security\\ecls.exe C:\\Users\\Safa\\Desktop\\nothink-malware-archive-2014\\2014\\0a2ce0517f8cb1048f56941e39890f4f
var utf8 = require('utf8');
var spawn = require('child_process').spawn;
var shellParser = require('node-shell-parser');
//var Iconv  = require('iconv').Iconv;
var cp = spawn(process.env.comspec, ['/c', 'C:\\Program Files\\ESET\\ESET Smart Security\\ecls.exe', 'C:\\Users\\Safa\\Desktop\\nothink-malware-archive-2014\\2014\\1d35e2d8d7cfd77ceac6631dd6cbbc9c']);
var stdout = '';
var stderr = '';
var index = 0;
cp.stdout.on("data", function(buf) {
    //str = (data.toString());
    //myParse(str);
    //console.log('[STR] stdout "%s"', String(buf));
    stdout += buf;
    index =  stdout.indexOf('tehdit',0);
    //console.log((buf.toString()));
});


cp.on('close', function(code) {
    var msg = "";
    for(i=index+8; i<index+50; i++)
    {
        if(stdout[i] == '"')
            break;
        msg = msg + stdout[i];
    }
   console.log(msg);
});

cp.stderr.on("data", function(data) {
    console.error(data.toString());
});

// var myParse = function(str) {deneme
//     var newStr = (shellParser(str.toString()));
   
//     var n = newStr.indexOf('tehdit',6);
    
//     console.log(newStr);
//     // for(i=index;i<120;i++)
//     //     var result = result + str[i];

//     // console.log(utf8.encode(str.toString('utf8')));
// };