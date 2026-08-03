'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const Router = require('../src/sockets/Router');
const {
	normalizeChatFilterText,
	boundedEditDistance,
	longestUnbrokenRun,
	letterSeparatorSignature
} = require('../src/sockets/ChatFilterNormalization');

assert.strictEqual(
	Router.extractFp2FromSkinWrapper('skin|#fff|#fff|#fff||device-fingerprint'),
	'device-fingerprint'
);
assert.strictEqual(Router.extractFp2FromSkinWrapper('skin|#fff'), '');
assert.strictEqual(Router.extractFp2FromSkinWrapper(''), '');

assert.strictEqual(normalizeChatFilterText('  Hello\u200b   WORLD  '), 'hello world');
assert.strictEqual(boundedEditDistance('server', 'serber', 1), 1);
assert.strictEqual(boundedEditDistance('server', 'totally-different', 2), 3);
assert.strictEqual(longestUnbrokenRun('abc defgh ij'), 5);
assert.strictEqual(letterSeparatorSignature('a x r x e x n x a'), 'arena');

const listenerSource = fs.readFileSync(path.join(__dirname, '../src/sockets/Listener.js'), 'utf8');
assert.match(listenerSource, /const PROOF_VALIDITY_MS = 30 \* 1000;/);
assert.match(listenerSource, /Math\.abs\(now - timestamp\) > PROOF_VALIDITY_MS/);
assert.match(listenerSource, /usedNonces\.set\(nonce, now \+ PROOF_VALIDITY_MS\)/);

console.log('Agar.io v2 regression checks passed.');
