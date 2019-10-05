# JSafe

Very fast queue for JSON write queries.

## Install

`npm install jsafe`

## Import

```js
const { write, read } = require("jsafe")
```

## Functions

<dl>
<dt><a href="#write">write(jsonPath, jsonData)</a> ⇒ <code>promise</code></dt>
<dd><p>Add JSON object to write or to stack.</p>
</dd>
<dt><a href="#read">read(jsonPath, defaultJsonData)</a> ⇒ <code>object</code></dt>
<dd><p>Read the JSON file if it exists.</p>
</dd>
</dl>

<a name="write"></a>

## write(jsonPath, jsonData) ⇒ <code>promise</code>
Add JSON object to write or to stack.

**Kind**: global function
**Returns**: <code>promise</code> - - But catch error is optional.

| Param | Type | Description |
| --- | --- | --- |
| jsonPath | <code>string</code> | The path of json file. |
| jsonData | <code>object</code> | JSON stringable data. |

```js
write("./file.json", json)
// Check if a writing is in progress.
// If so, overwrites the waiting stack
// with the new version of the file.
```

<a name="read"></a>

## read(jsonPath, defaultJsonData) ⇒ <code>object</code>
Read the JSON file if it exists.

**Kind**: global function
**Returns**: <code>object</code> - - JSON exploitable data.

| Param | Type | Description |
| --- | --- | --- |
| jsonPath | <code>string</code> | The path of json file. |
| defaultJsonData | <code>object</code> | JSON stringable data. |

```js
const json = read("./file.json", "Hello World")
// Require json and delete require.cache.
// To do only once in the same script.
// Returns defaultJsonData if the file is non-existent.
```