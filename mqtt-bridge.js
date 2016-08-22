#!/usr/bin/env node

'use stict';

const fs = require('fs');
const minimist = require('minimist');
const mqtt = require('mqtt');
const debug = require('debug')('mqtt-bridge');

function main(argv) {
    const args = minimist(argv || process.argv.slice(2));

    const from = args.from;
    const to = args.to;
    const topic = args.topic;

    if (!from || !to || !topic) {
        console.error(`usage: mqtt-bridge --from mqtt://origin --to mqtt://destination --topic 'topic/#'`);
        return 1;
    }

    const fromCA = args['from-ca'];
    const fromUser = args['from-user'];
    const fromPass = args['from-pass'];
    const toCA = args['to-ca'];
    const toUser = args['to-user'];
    const toPass = args['to-pass'];

    const fromConnection = mqtt.connect(from, {
        ca: fromCA && fs.readFileSync(fromCA),
        username: fromUser,
        password: fromPass
    });

    fromConnection.on('connect', () => {
        debug('connected to %s', from);
        fromConnection.subscribe(topic);
    });

    fromConnection.on('message', (topic, message) => {
        debug('%s: %o', topic, message);
        toConnection.publish(topic, message);
    });

    const toConnection = mqtt.connect(to, {
        ca: toCA && fs.readFileSync(toCA),
        username: toUser,
        password: toPass
    });

    toConnection.on('connect', () => {
        debug('connected to %s', to);
    });
}

exports.main = main;

if (require.main === module) {
    process.exitCode = main() || 0;
}
