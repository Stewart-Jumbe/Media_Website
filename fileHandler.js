// fileHandler.js
'use strict'
// Code responsible for saving files uploaded by users to a file system
/*
File handler class takes path as a parameter to its constructor. The saveImage method takes image name and image data and saves the
files to the specified directory
*/

// importing required dependencies
const fs = require('fs')
const path = require('path')

class FileHandler {
  constructor (fullPath) {
    this.fullPath = fullPath
    console.log('~~~~~~')
    console.log(`FileHandler fullPath: ${this.fullPath}`)
  }

  // methods
  saveFile (fileName, fileData) {
    const filePath = path.join(this.fullPath, fileName)
    console.log(`full save file path is: ${filePath}`)
    // converting buffer to a string using imageData.toString()
    fs.writeFile(filePath, fileData, (err) => {
      if (err) {
        console.error('Error saving image: ', err)
        throw err
      }
      console.log(`Image ${fileName} saved successfully! `)
    })
  }
}

module.exports = FileHandler
