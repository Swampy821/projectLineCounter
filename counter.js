var DIRECTORYTOCOUNT = process.argv[2];
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
   var file = fs.readFileSync(fileLoc,'utf8');
   file = file.split('\n');
   totalCount+=file.length;
}
getFiles(DIRECTORYTOCOUNT);
console.log('Total Lines: ' + totalCount);
