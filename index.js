
const fs = require("fs")
const path = require("path")

const writing = {}
const battery = {}

/**
 * Write the next version if there is one.
 * 
 * @private
 * @param {string} jsonKey - The id key of json file.
 */

function _next( jsonKey ){
    if( battery[jsonKey] ){
        const { jsonPath, jsonData } = battery[jsonKey]
        delete battery[jsonKey]
        write( jsonPath, jsonData )
    }
}

/**
 * Add JSON object to write or to stack.
 * 
 * @param {string} jsonPath - The path of json file.
 * @param {object} jsonData - JSON stringable data.
 * @returns {promise} - But catch error is optional.
 */

function write( jsonPath, jsonData ){
    return new Promise( function( resolve, reject ){
        const jsonKey = path.relative( __filename, jsonPath )
        const jsonString = JSON.stringify( jsonData, null, 2 )
        if( !writing[jsonKey] ){
            writing[jsonKey] = true
            current = jsonKey
            fs.writeFile( jsonPath, jsonString, function( error ){
                writing[jsonKey] = false
                _next( jsonKey )
                if( error ) reject( error )
                resolve( jsonKey )
            })
        }else{
            battery[jsonKey] = {
                jsonPath : jsonPath,
                jsonData : jsonData,
                jsonString : jsonString
            }
            resolve( jsonKey )
        }
    })
}

/**
 * Read the JSON file if it exists.
 * 
 * @param {string} jsonPath - The path of json file.
 * @param {object} defaultJsonData - JSON stringable data.
 * @returns {object} - JSON exploitable data.
 */

function read( jsonPath, defaultJsonData = {} ){
    try {
        const jsonData = require( jsonPath )
        delete require.cache[jsonPath]
        return jsonData
    } catch (error) {
        return defaultJsonData
    }
}

module.exports = {
    write : write,
    read : read,
    writing : writing,
    battery : battery
}