'use strict';
// Variables and Constant
const express	= require('express');
const notify	= require('gulp-notify');
const http 		= require('http');
const app 		= express();
const server 	= http.createServer(app);
const path 		= require('path');
const bodyParser= require('body-parser');
const morgan 	= require('morgan');
const port      = 8000;

// view engine setup
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'html');
app.set('port',port);
app.set(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'dist')));	
app.listen(app.get('port'));

module.exports = app;