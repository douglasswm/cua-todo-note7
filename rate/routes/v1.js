var express = require("express");
var models = require("./../models/index");
var RateLimit = require('express-rate-limit');

// version 1 route
module.exports = function (app) {
    const version = "/v1";


    var getUserLimiterV1 = new RateLimit({
        windowMs: 60*60*120,    // 7 minutes window
        delayAfter: 1,          // begin slowing down responses after the first request
        delayMs: 3*1000,        // slow down subsequent responses by 3 seconds per request
        max: 5,                 // start blocking after 5 requests
        message: "Too many users retrieval from this IP, please try again after an hour"
    });

    app.get(version + "/api/users/:id/:email", getUserLimiterV1, function (req, res) {
        console.log("version 1");
        models.users.findOne({where: {id: req.params.id , email: req.params.email}})
            .then(function(result) {
                console.log(result);
                returnResults(result, res);
            }).catch(function (err) {
            console.error(err);
            res.status(500).send(err);
        });
    });

    function returnResults(results, res) {
        console.log(results);
        res.status(200).send(results);
    }
};