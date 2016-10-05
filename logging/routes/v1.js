var express = require("express");
var models = require("./../models/index");

var bunyan = require('bunyan');     // JSON logging API

var log = bunyan.createLogger({
    name: 'v1api',
    streams: [
        {
            level: 'info',
            stream: process.stdout            // log INFO and above to `stdout`
        },
        {
            level: 'debug',
            path: 'logs/v1api-error.log'  // log ERROR and above to a file
        }
    ]
});

module.exports = function (app) {
    const version = "/v1";

    app.get(version + "/api/users/:id/:email", function (req, res) {
        // Log to logger instead of console
        // note that it corresponds to the streams that were instantiated
        log.debug("version 1");

        // Find a user by `id` and `email`
        models.users.findOne({where: {id: req.params.id , email: req.params.email}})
            .then(function(result) {
                log.debug(result);
                returnResults(result, res);
            }).catch(function (err) {
            console.error(err);
            res.status(500).send(err);
        });
    });

    // Return the result when status code is 200
    function returnResults(results, res) {
         res.status(200).send(results);
    }

};