'use strict'
const co = require('co');
const LaunchDarkly = require("launchdarkly-node-server-sdk");
require("dotenv").config();

module.exports = function(org_id) {
    return co.wrap(function*() {
        try {
            
            const client = LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK_KEY);
            yield client.waitForInitialization();

            let flag = yield client.variation(
                'bodenstein-use-got-module-for-http',
                {
                    kind: 'OrgID',
                    key: org_id,
                    context: 'OrgID'
                },
                false
            );
            process.env.FLAG_REQUEST = flag;
            
            return flag;
        } catch (error) {
            console.error("Error is  :", error);
        }
    });
};
