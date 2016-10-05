var express = require("express");
var models = require("./../models/index");
var apicache  = require('apicache');
var cache     = apicache.middleware;

module.exports = function (app) {
    const version = "/v2";

    // Get one record from `users` table by `id` and `email`
    // this implements API caching
    app.get(version + "/api/users/:id/:email", cache('1 hour'), function (req, res) {
        console.log("version 2");
        // Leave the `id` blank so the auto-increment will work on the MySQL side
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
        res.status(200).send(results);
    }

};