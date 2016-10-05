var express = require("express");
var models = require("./../models/index");

module.exports = function (app) {
    const version = "/v1";

    // Get one record from `users` table by `id` and `email`
    // this does not have any API caching
    app.get(version + "/api/users/:id/:email", function (req, res) {
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

    app.put(version + "/api/users/:id/:email", function (req, res) {
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