
const fs = require("fs")
const path = require("path")

const writing = {}
const battery = {}

function _free( jsonKey ){
    if( battery[jsonKey].length > 0 ){
        const { jsonPath, jsonData } = battery[jsonKey].shift()
        write( jsonPath, jsonData )
    }
}

function write( jsonPath, jsonData ){
    return new Promise( function( resolve, reject ){
        const jsonKey = path.relative( __filename, jsonPath )
        const jsonString = JSON.stringify( jsonData, null, 2 )
        if( !writing[jsonKey] ){
            writing[jsonKey] = true
            if( !battery.hasOwnProperty(jsonKey) ){
                battery[jsonKey] = []
            }
            current = jsonKey
            fs.writeFile( jsonPath, jsonString, function( error ){
                writing[jsonKey] = false
                _free( jsonKey )
                if( error ) reject( error )
                resolve( true )
            })
        }else{
            if( !battery[jsonKey].find( function( patient ){
                return patient.jsonString == jsonString 
            })){
                battery[jsonKey].push({
                    jsonPath : jsonPath,
                    jsonData : jsonData,
                    jsonString : jsonString
                })
            }
            resolve( false )
        }
    })
}

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