var DIRECTORYTOCOUNT = 'FILE LOC';
var acceptedFiles = new Array('.php','.js','.css');



var fs = require('fs');
var totalCount = 0;
var fileCount = 0;
var cont = false;
function getFiles(dir) {
 var goodFile=false;
 var files = fs.readdirSync(dir);
    for(var i in files){
        if (!files.hasOwnProperty(i)) continue;
        var name = dir+'/'+files[i];
        if (fs.statSync(name).isDirectory()){
            if(name.indexOf('.git')==-1) {
                getFiles(name);
            }
        }else{
            if(name.indexOf('.git')==-1) {
                for(var i=0; i<acceptedFiles.length;i++) {
                    if(name.indexOf(acceptedFiles[i])>-1) {
                        goodFile=true;
                    }
                }
                if(goodFile==true) {
                    fileCount+=1;
                    countFile(name);
                    goodFile=false;
                }
            }
        }
    } 
}
function countFile(fileLoc) {
    var i;
    var count = 0;
    fs.createReadStream(fileLoc)
      .on('data', function(chunk) {
        for (i=0; i < chunk.length; ++i)
          if (chunk[i] == 10) count++;
      })
      .on('end', function() {
        totalCount += count;
        console.log('\033[2J'+'Counting '+fileCount+' files. '+totalCount+' lines.');
      });
}

getFiles(DIRECTORYTOCOUNT);
