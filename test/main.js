#!/bin/node
var request = require('supertest'),
    express = require('express');

requestNormal = request('http://example.com/');
requestWww = request('http://www.example.com/');

function handle(err) {
    if (err) {
        console.log(err);
    }
}

requestNormal.get('/.git').expect(403, handle);

requestNormal.get('/').expect(200, handle);
requestWww.get('/').expect(301, handle);
