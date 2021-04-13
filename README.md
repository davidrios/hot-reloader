# hot-reloader for Webpack

This is a simple loader that lets you harness the power of
[webpack's](https://webpack.js.org/) [HMR](https://webpack.js.org/concepts/hot-module-replacement/)
with any loader.


## Why

Lets say you want to import a .txt file. You could use the `raw-loader` loader to
import it in your code like this:

```javascript
import contents from './example.txt';
```

Now every time you update `file.txt`, webpack detects the change and reload your
application. What if you don't want the application reloaded? This loader let's you
get the result from the import and register a callback to receive future updates.


## Usage

First you have to add this loader as the first one for each rule you want to use it.
For instance to import text files with the `raw-loader` you would configure
webpack like this:

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.txt$/i,
        use: [
          'hot-reloader',
          'raw-loader'
        ]
      },
    ],
  },
};
```

Now the result of the import will be an object in the format `{ content, register }`,
where `content` will be the result you would get from the import if you didn't use
the hot-reload, and `register` is a `function (updateCallback, errorCallback)` that
you call to register your update callback.

The above example would then be:

```javascript
import request from './example.txt';
let content = request.content

request.register((updatedContent) => {
  content = updatedContent
})
```

And that's all. If you don't register a callback, the page will be reloaded like
usual.

There's a working example in [example](https://github.com/davidrios/hot-reloader/tree/master/example)
folder for you to test.