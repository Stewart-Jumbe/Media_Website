'user strict';

//importing hapi framework
const Hapi = require('@hapi/hapi');

//importing path
const Path = require ('path')

//Creating a server 
const start = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes:{
            files:{
                relativeTo:
                Path.join(__dirname,'public')
            }
        }
    });

    // registering hapi/inert plugin
await server.register(require('@hapi/inert'));


//serving index.html file
server.route({
    method: 'GET',
    path: '/index',
    handler: (request, h) => {
        
        return h.file('index.html');
    
    }   
});


server.route({
    method: 'GET',
    path: '/hello',
    handler: (request, h) => {
        return ' Hello World';
    },
    options: {
        files:null // overides the server option for this route
    }
});

    await server.start();
    console.log(Path.join(__dirname,'public'))
    console.log('Server is running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

start();

