'use strict';
const test = require('ava');
const {map, node} = require('fluture');
const {pipe} = require('ramda');
const req = require('request');
var co = require('co');
const transformOptions = require('./internal/transformOptions');
const transformResponse = require('./internal/transformResponse');
const transformGotOptions = require('./internal/got/transformOptions');
const gotRequest = require('./internal/got/got');
const extractlaunchdarklyflags = require('../logic/extractlaunchdarklyflags');
const LaunchDarkly = require('launchdarkly-node-server-sdk');
  
co(function* () {
    let request;
    let transOptions;
    let org_id = 'abc1';  // Here I have assumed org_id
    var flagset = yield extractlaunchdarklyflags(org_id);

    if (process.env.FLAG_REQUEST === true) {
        transOptions = transformGotOptions({});
        request = options => node(gotRequest(options));
    } else {
        transOptions = transformOptions ({timeout: process.env.REQUEST_TIMEOUT || 120000});
        request = options => node(nodeback => req(options, nodeback));
    }

    module.exports = pipe(transOptions, request, map(transformResponse));});

