// index.js
'use strict'

// Importing hapi framework
const Hapi = require('@hapi/hapi')

// Importing path
const Path = require('path')

// Importing fileHandler class able to handle vides and photos
const FileHandler = require('./fileHandler')

// Instantiating imageHandler
const fileHandler = new FileHandler(Path.join(__dirname, 'files'))

// Creating a server
const start = async () => {
  const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0', // '0.0.0.0', // Changed from 'localhost to make the sever accessible on local network
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  })

  // Registering hapi/inert plugin
  await server.register(require('@hapi/inert'))

  // GET req serving index.html file
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.file('index.html')
    }
  })

  // POST request saving uploaded pictures
  server.route({
    method: 'POST',
    path: '/upload',
    options: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 2147483648 // Increase max payload size to 2GB

      }
    },
    handler: async (request, h) => {
      const data = request.payload
      const name = data.name
      const comment = data.comment
      const file = data.file

      // Log relevant information
      console.log(`Name: ${name}`)
      console.log(`Comment: ${comment}`)
      console.log('File:', file)

      // Check if file data is present
      if (file) {
        console.log('filename: ', file.hapi.filename)

        // Ensure that file data is directly accessible
        // collecting chuncks of data into buffer
        const chunks = []
        for await (const chunk of file) {
          chunks.push(chunk)
        }
        const buffer = Buffer.concat(chunks)
        await fileHandler.saveFile(file.hapi.filename, buffer)
        return h.response('Image uploaded successfully!')
      } else {
        return h.response('No image data received. Please ensure you are uploading a valid image file.').code(400)
      }
    }
  })

  // GET req serving "Hello World"
  server.route({
    method: 'GET',
    path: '/hello',
    handler: (request, h) => {
      return ' Hello World'
    },
    options: {
      files: null // Overrides the server option for this route
    }
  })

  await server.start()
  console.log(Path.join(__dirname, 'public'))
  console.log('Server is running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

start()
