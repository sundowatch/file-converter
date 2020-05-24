const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const im2ico = require('@fiahfy/ico-convert');

function ext(fileName){
    return path.extname(fileName);
}

function imageConvert(input, output){
    sharp(input).toFile(output);
}

function con(val){
    console.log(val + " has been successfully saved!");
}

function convertFile(inputFile, outputFormat, outputDir="./output"){
    if(inputFile.indexOf('/') !== -1){
        var inputForExt = inputFile.split("/");
        inputForExt = inputForExt[inputForExt.length - 1];
    }
    else
        var inputForExt = inputFile;
        
    let fileExt = ext(inputForExt);
    fileExt = fileExt.replace(".","");
    let newFileName = inputForExt.replace(fileExt, outputFormat);
    let newFileSrc = outputDir + "/" + newFileName;
    if(outputDir != "./"){
        if(!fs.existsSync(outputDir)){
            fs.mkdirSync(outputDir);
        }
    }
    if(outputFormat == "jpg" || outputFormat == "png" || 
        outputFormat == "webp" || outputFormat == "tiff" || 
        outputFormat == "gif" || outputFormat == "svg"){

        imageConvert(inputFile, newFileSrc);
        con(newFileName);

    } else if(outputFormat == "ico"){

        const buf = fs.readFileSync(inputFile);
        im2ico.convert(buf).then((data) => {
            fs.writeFileSync(newFileSrc, data);
        });

    }
}



module.exports = convertFile;

