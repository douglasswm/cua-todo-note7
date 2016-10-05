var path = require("path");
var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require('cookie-parser');

const  PORT = "port";
var VERSIONS = {'Version 1': '/v1', 'Version 2': '/v2'};

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Initialize session
app.use(session({
    secret: "nus-stackup",
    resave: false,
    saveUninitialized: true
}));

// Return the support versions for the REST API
app.get('/', function(req, res) {
    res.json(VERSIONS);
})

// Iterate through the routes directory and import
for (var k in VERSIONS) {
    console.info("k", k);
    require('./routes' + VERSIONS[k] + ".js")(app);
}

app.use(express.static(__dirname + "/public"));
app.use("/bower_components", express.static(__dirname + "/bower_components"));

app.set(PORT, process.argv[2] || process.env.APP_PORT || 3000);

app.listen(app.get(PORT) , function(){
    console.info("App Server started on " + app.get(PORT));
});