// imageHandler.js
'use strict';
//Code responsible for saving files uploaded by users to a file system
/*
Image handler class takes path as a parameter to its constructor. The saveImage method takes image name and image data and saves the
image to the specified directory
*/

//importing required dependencies
const fs = require('fs');
const path = require('path');

class ImageHandler {
    
    constructor(fullPath){
        this.fullPath = fullPath;
        console.log('~~~~~~');
        console.log(`ImageHandler fullPath: ${this.fullPath}`);

    }

    //methods
    saveImage(imageName, imageData){
        console.log(typeof(this.fullPath));
        console.log('fullPath:', this.fullPath);
        console.log('imageName:', imageName);
        console.log('typeof imageName:',typeof(imageName));
        console.log(imageName === null)
        const imagePath = path.join(this.fullPath,imageName);
        // converting buffer to a string using imageData.toString()
        fs.writeFile(imagePath,imageData, (err) => {
            if(err){
                console.error ('Error saving image: ', err);
                throw err;
            }
            console.log(`Image ${imageName} saved successfully! `);
        });
    }

}

module.exports = ImageHandler;