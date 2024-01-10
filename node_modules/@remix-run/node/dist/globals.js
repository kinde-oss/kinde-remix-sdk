/**
 * @remix-run/node v2.4.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var webFetch = require('@remix-run/web-fetch');
var webStream = require('@remix-run/web-stream');

function installGlobals() {
  global.File = webFetch.File;
  global.Headers = webFetch.Headers;
  global.Request = webFetch.Request;
  global.Response = webFetch.Response;
  global.fetch = webFetch.fetch;
  global.FormData = webFetch.FormData;

  // Export everything from https://developer.mozilla.org/en-US/docs/Web/API/Streams_API
  global.ByteLengthQueuingStrategy = webStream.ByteLengthQueuingStrategy;
  global.CountQueuingStrategy = webStream.CountQueuingStrategy;
  global.ReadableByteStreamController = webStream.ReadableByteStreamController;
  global.ReadableStream = webStream.ReadableStream;
  global.ReadableStreamBYOBReader = webStream.ReadableStreamBYOBReader;
  global.ReadableStreamBYOBRequest = webStream.ReadableStreamBYOBRequest;
  global.ReadableStreamDefaultController = webStream.ReadableStreamDefaultController;
  global.ReadableStreamDefaultReader = webStream.ReadableStreamDefaultReader;
  global.TransformStream = webStream.TransformStream;
  global.TransformStreamDefaultController = webStream.TransformStreamDefaultController;
  global.WritableStream = webStream.WritableStream;
  global.WritableStreamDefaultController = webStream.WritableStreamDefaultController;
  global.WritableStreamDefaultWriter = webStream.WritableStreamDefaultWriter;
}

exports.installGlobals = installGlobals;
