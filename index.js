'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');
const util = require('util');
const fs = require('fs');
const connect = require( 'connect' );
const connectRoute = require('connect-route');
const serveStatic = require('serve-static');
const http = require( 'http' );
// const React = require('react');
// const ReactDOMServer = require('react-dom/server');


const app = connect();

// gzip/deflate outgoing responses
const compression = require('compression');
app.use( compression() );
app.use(serveStatic(path.join(__dirname, 'public')));


// parse urlencoded request bodies into req.body
const bodyParser = require( 'body-parser' );
app.use(bodyParser.json());
app.use( bodyParser.urlencoded( {
    extended: false
} ) );

// respond to all requests
app.use( function( req, res, next ) {
    next();
} );

app.use(connectRoute(router => {

    /* GET / */
    router.get('/', (req, res, next) => {
        fs.readFile(path.resolve(__dirname, 'views/index.html'), 'utf8', (err, data) => {
            if(err) {
                return;
            }
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        })
    });

    /* GET /sdk.js */
    router.get('/sdk.js', (req, res, next) => {
        fs.readFile(path.resolve(__dirname, 'public/js/sdk.js'), 'utf8', (err, data) => {
            if(err) {
                return;
            }
            res.setHeader('Content-Type', 'application/javascript');
            res.end(data);
        })
    });
}))



//create node.js http server and listen on port
http.createServer( app ).listen( 3000 );
