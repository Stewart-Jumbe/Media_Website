'user strict';

//importing hapi framework
const Hapi = require('@hapi/hapi');

//Creating a server 
const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.start();
    console.log('Server is running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

