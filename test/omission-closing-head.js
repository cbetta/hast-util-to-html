/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module hast-util-to-html
 * @fileoverview Test suite for `hast-util-to-html`.
 */

'use strict';

/* eslint-env node */

/* Dependencies. */
var test = require('tape');
var h = require('hastscript');
var u = require('unist-builder');
var to = require('..');

/* Tests. */
test('`head` (closing)', function (t) {
  t.deepEqual(
    to(h('head'), {omitOptionalTags: true}),
    '<head>',
    'should omit tag without following'
  );

  t.deepEqual(
    to(h('html', [h('head'), u('comment', 'alpha')]), {omitOptionalTags: true}),
    '<head></head><!--alpha-->',
    'should not omit tag if followed by `comment`'
  );

  t.deepEqual(
    to(h('html', [h('head'), ' alpha']), {omitOptionalTags: true}),
    '<head></head> alpha',
    'should not omit tag if the next sibling starts with white-space'
  );

  t.deepEqual(
    to(h('html', [h('head'), u('text', 'alpha')]), {omitOptionalTags: true}),
    '<head>alpha',
    'should omit tag if not followed by `comment`'
  );

  t.end();
});