var express = require("express");
var models = require("./../models/index");

module.exports = function (app) {
    const version = "/v2";

    // ###############
    // Next steps here
    // ###############

    function returnResults(results, res) {
        console.log(results);
        res.status(200).send(results);
    }

    /**
      * Documentation goes here
     @api {get} /api/users Get All users
     @apiSampleRequest http://localhost:3000/v1/api/users
     @apiVersion 2.0.0
     @apiName GetAllUser
     @apiGroup User

     @apiDescription Retrieve alll user record.

     @apiExample Example usage:
     curl -i -X GET 'http://localhost:3000/v2/api/users'

     @apiSuccess {Number}   id    The Users-ID.
     @apiSuccess {Date}     remember_created_at   Registration Date.
     @apiSuccess {String}   name    Fullname of the User.
     @apiSuccess {Number}   sign_in_count Sign in count.
     @apiSuccess {Number}   phone    Users phone.
     @apiSuccess {String}   avatar_image_uid  Avatar-Image.

     @apiError NoAccessRight Only authenticated Admins can access the data.
     @apiError UserNotFound   The <code>id</code> of the User was not found.

     @apiErrorExample Response (example):
         HTTP/1.1 401 Not Authenticated
         {
      "error": "NoAccessRight"
    }
      */
    app.get(version + "/api/users", function (req, res) {
        models.users.findAll()
            .then(function(result) {
                console.log(result);
                returnResults(result, res);
            }).catch(function (err) {
            console.error(err);
            res.status(500).send(err);
        });
    });

    /**
      * Documentation goes here
     @api {post} /api/users Create New user
     @apiSampleRequest http://localhost:3000/v1/api/users
     @apiVersion 2.0.0
     @apiName CreateUser
     @apiGroup User

     @apiDescription Insert new user

     @apiExample Example usage:
     curl -i -X POST 'http://localhost:3000/v2/api/users'

     @apiParam {String} email Email address of the user.
     @apiParam {String} name Fullname of the user.

     @apiSuccess {String}   message    Message.



     @apiError NoAccessRight Only authenticated Admins can access the data.
     @apiError UserNotCreated   The <name>name</name> of the User cannot be created.

     @apiErrorExample Response (example):
         HTTP/1.1 401 Not Authenticated
         {
      "error": "NoAccessRight"
    }
      */
    app.post(version + "/api/users", function (req, res) {
        var usersdata = req.body;
        console.log(usersdata);
        // var userValue = JSON.parse(usersdata);
        var userValue = usersdata;

        models.users
            .findOrCreate({where: {email: userValue.email}, defaults:
            {email: userValue.email,
                name: userValue.name}})
            .spread(function(user, created) {
                console.log(user.get({
                    plain: true
                }))
                console.log(created)
                res.json({ message: 'New user created !' });
            })
    });

    /**
      * Documentation goes here
     @api {put} /api/users Update Existing user
     @apiSampleRequest http://localhost:3000/v1/api/users
     @apiVersion 2.0.0
     @apiName UpdateUser
     @apiGroup User

     @apiDescription Update existing user

     @apiExample Example usage:
     curl -i -X PUT 'http://localhost:3000/v2/api/users'

     @apiParam {Number} id User-Id.
     @apiParam {String} name Fullname of the user.

     @apiSuccess {String}   message    Message.



     @apiError NoAccessRight Only authenticated Admins can access the data.
     @apiError UserNotCreated   The <name>name</name> of the User cannot be created.

     @apiErrorExample Response (example):
         HTTP/1.1 401 Not Authenticated
         {
      "error": "NoAccessRight"
    }
      */
    app.put(version + "/api/users", function (req, res) {
        var usersdata = req.body;
        // var userValue = JSON.parse(usersdata);
        var userValue=usersdata;
        models.users.findOne( {where: {id: userValue.id}})
            .then(function(result) {
                console.log(result);
                if (result) {
                    result.updateAttributes({
                        name: userValue.name
                    })


                }
                returnResults(result, res);

            }).catch(function (err) {
            console.error(err);
            res.json({ message: 'User is not updated!' });

            res.status(500).send(err);
        });
    });

    /**
      * Documentation goes here
     @api {delete} /api/users Delete  user
     @apiSampleRequest http://localhost:3000/v1/api/users/:id
     @apiVersion 2.0.0
     @apiName DeleteUser
     @apiGroup User

     @apiDescription Delete user

     @apiExample Example usage:
     curl -i -X DELETE 'http://localhost:3000/v2/api/users/:id'

     @apiParam {Number} id Users unique ID.

     @apiSuccess {String}   message    Message.



     @apiError NoAccessRight Only authenticated Admins can access the data.
     @apiError UserNotCreated   The <name>name</name> of the User cannot be created.

     @apiErrorExample Response (example):
         HTTP/1.1 401 Not Authenticated
         {
      "error": "NoAccessRight"
    }
      */
    app.delete(version + "/api/users/:id", function (req, res) {
        models.users.destroy(
            { where: { id: req.params.id }}
        ).then(function(result) {
            console.log(result);
            //returnResults(result, res);
            res.json({ message: 'User has been deleted successfully!' });
        }).catch(function (err) {
            console.error(err);
            res.status(500).send(err);
        });
    });

    /**
      * Documentation goes here
     @api {get} /api/users/:id/:email Get user detailed
     @apiSampleRequest http://localhost:3000/v1/api/users/:id/:email
     @apiVersion 2.0.0
     @apiName GetUserDetailed
     @apiGroup User

     @apiDescription Get User Detailed

     @apiExample Example usage:
     curl -i -X GET 'http://localhost:3000/v2/api/users/:id/:email'

     @apiParam {Number} id Users unique ID.
     @apiParam {String} email User Email.

     @apiSuccess {String}   message    Message.



     @apiError NoAccessRight Only authenticated Admins can access the data.
     @apiError UserNotCreated   The <name>name</name> of the User cannot be created.

     @apiErrorExample Response (example):
         HTTP/1.1 401 Not Authenticated
         {
      "error": "NoAccessRight"
    }
      */

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
};