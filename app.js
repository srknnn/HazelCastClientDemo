'use strict';

var http = require('http');
const querystring = require('querystring');
var HazelcastClient = require('hazelcast-client').Client;
var Config = require('hazelcast-client').Config;

function hazelCastRequest(key, reqType, mapName, cb) {
    var map;
    hazelcastClient.getMap(mapName).then(function (mp) {
        map = mp;
        if (reqType == "post") {
            insertPerson(map, key, cb);
        }
        if (reqType == "get") {
            readPerson(map, key, cb);
        }
    }).catch(function (error) {
        console.log("clientErrorDeneme", error);
    });
}

function insertPerson(map, key, cb) {
    var person = {}
    if (key == "key2") {
        person = {
            key: key,
            firstName: "serkan",
            lastName: "Soydam",
            age: 42
        };
    }
    if (key == "key3") {
        person = {
            key: key,
            firstName: "serkan3",
            lastName: "Soydam3",
            age: 42
        };
    }
    if (key == "key4") {
        person = {
            key: key,
            firstName: "serkan4",
            lastName: "Soydam4",
            age: 42
        };
    }

    map.put(key, person).then(function (previousValue) {
        printValue("Previous value: ", previousValue);
        cb('OK');
    }).catch(function (error) {
        console.log("error1", error);
    });
};

function readPerson(map, key, cb) {
    map.get(key).then(function (value) {
        printValue("Value for key=1: ", value);
        cb(value.key);
    }).catch(function (error) {
        console.log("error2", error);
    });
};

function printValue(text, value) {
    console.log(text + JSON.stringify(value));
};

var hazelcastClient;

var server = http.createServer((function (req, response) {
    if (req.url.indexOf("favicon") > 0) {
        response.end("Hello");
        return;
    }

    response.writeHead(200,
        { "Content-Type": "text/plain" });

    var deneme = req.url.split("?");

    var key = querystring.parse(deneme[1]).key;
    var reqType = querystring.parse(deneme[2]).reqType;
    var mapName = querystring.parse(deneme[3]).mapName;

    hazelCastRequest(key, reqType, mapName, (result) => response.end(result));
}));

var config = new Config.ClientConfig();
// config.networkConfig.addresses = [{host: '127.0.0.1', port: '5701'}];
config.networkConfig.addresses.push('127.0.0.1:5701');

HazelcastClient.newHazelcastClient(config)
    .then((client) => {
        hazelcastClient = client;
        server.listen(7001);
        console.log('Server started listening on 7001');
    });










// var http = require('http');
// const querystring = require('querystring');
// const { Console } = require('console');
// var server = http.createServer((function (req, response) {

// 	if(req.url.indexOf("favicon") > 0){
// 		response.end("Hello");
// 		return;
// 	}

// 	response.writeHead(200,
// 		{ "Content-Type": "text/plain" });


// 	var deneme = req.url.split("?");

// 	var key = querystring.parse(deneme[1]).key;
// 	var reqType = querystring.parse(deneme[2]).reqType;
// 	var mapName = querystring.parse(deneme[3]).mapName;
// 	var printedValue="";

// 	// console.log(req);

// 	var HazelcastClient = require('hazelcast-client').Client;
// 	var Config = require('hazelcast-client').Config;

// 	var config = new Config.ClientConfig();
// 	// config.networkConfig.addresses = [{host: '127.0.0.1', port: '5701'}];
// 	config.networkConfig.addresses.push('127.0.0.1:5701');

// 	var map = {};


// 	var hazelCastRequest = function (key) {
// 		HazelcastClient
// 			.newHazelcastClient(config)
// 			.then((hazelcastClient) => {
// 				map = hazelcastClient.getMap(mapName).then(function (mp) {
// 					map = mp;
// 					if(reqType=="post"){
// 						 insertPerson(map, key);
// 					}
// 					if(reqType=="get"){
// 						readPerson(map, key);
// 					}
// 				});
//                 // hazelcastClient.shutdown();
// 			}).catch( function (error){
// 				console.log("clientErrorDeneme", error);
// 			});
// 	};

// 	hazelCastRequest(key);


// 	var printValue = function (text, value) {
// 		console.log(text + JSON.stringify(value));
// 	};

// 	var insertPerson = function (map, key) {
// 		var person = {}
// 		if (key == "key1") {
// 			person = {
// 				key: key,
// 				firstName: "Joe",
// 				lastName: "Doe",
// 				age: 42
// 			};
// 		}
// 		if (key == "key2") {
// 			person = {
// 				key: key,
// 				firstName: "serkan",
// 				lastName: "Soydam",
// 				age: 42
// 			};
// 		}
// 		if (key == "key3") {
// 			person = {
// 				key: key,
// 				firstName: "serkan3",
// 				lastName: "Soydam3",
// 				age: 42
// 			};
// 		}
// 		if (key == "key4") {
// 			person = {
// 				key: key,
// 				firstName: "serkan4",
// 				lastName: "Soydam4",
// 				age: 42
// 			};
// 		}

// 		map.put(key, person).then(function (previousValue) {
// 			printValue("Previous value: ", previousValue);
// 		}).catch( function (error){
// 			console.log("error1", error);
// 		});
// 	};

// 	var readPerson = function (map, key) {
// 		map.get(key).then(function (value) {
// 			printValue("Value for key=1: ", value);
// 			printedValue=value.key;
// 		}).catch( function (error){
// 			console.log("error2", error);
// 		});
// 	};

// response.end(printedValue);

// }));
// server.listen(7001);











































