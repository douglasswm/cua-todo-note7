var express = require("express");
var models = require("./../models/index");

var bunyan = require('bunyan');

var log = bunyan.createLogger({
    name: 'v2api',
    streams: [
        {
            level: 'info',
            stream: process.stdout            // log INFO and above to stdout
        },
        {
            level: 'debug',
            path: 'logs/v2api-error.log'  // log ERROR and above to a file
        }
    ]
});

module.exports = function (app) {
    const version = "/v2";

    // Find record by `id` and `email`, if not found create a record
    app.get(version + "/api/users/:id/:email", function (req, res) {
        log.debug("version 2");     // logging with the new logger

        // Leave the `id` blank so the auto-increment will work on the MySQL side
        models.users.findOrCreate({
            where: {id: req.params.id ,email: req.params.email},
            defaults: {id: '', email: req.params.email, encrypted_password: '123456'}
        })
            .spread(function (user, created) {
                log.debug(user);
                returnResults(user, res);
            }).error(function (error) {
            console.error(error);
            res.status(500).send(err);
        });

    });

    function returnResults(results, res) {
        res.status(200).send(results);
    }
};