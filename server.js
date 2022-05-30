// ----------------------------------------------------------------------------------
// Imported modules
const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')
const figlet = require('figlet')


// ----------------------------------------------------------------------------------
// Global Variables (generally you want to keep this minimal)

// If the environment we're running our server in (say, Netlify or Heroku)
// has a port it sets automatically, use that. Otherwise, we'll use a default of 3000.
const PORT = process.env.PORT || 3000


// ----------------------------------------------------------------------------------
// Functions

// Helper function that returns the matching content type for a given file extension,
//  or returns text/html by default if content type isn't accounted for.
// Note: I think Express can do this automatically: https://expressjs.com/en/4x/api.html#res.send
// So while this is required with Node, it won't be required with Express
//  once you start using it.
function getContentType(fileType) {
    const defaultHTMLType = 'text/html'
    // This list can be expanded to include more content types if you want to use
    // this approach/function in the future for your own projects, or if by chance you are
    // tested on building a simple Node backend from scratch (hopefully not lol).
    const contentTypes = {
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
    }
    return contentTypes[fileType] || defaultHTMLType
}

// --------------------------------------------------
// Returns 'heads' or 'tails' string with a 50% chance for each.
// Returns in object format of {result: 'heads'} or {result: 'tails'}
function getCoinFlipResult(userChoice) {
    // Math.random() returns a random number between 0 and 1.
    // We check to see if the result is less than 0.5. If it is, we return 'heads'.
    const flip = Math.random() < 0.5 ? 'heads' : 'tails'

    let outcome = `Server coin flipped ${flip}. `
    if (userChoice === flip) {
        outcome += 'You win!'
    }
    else {
        outcome += 'You lose!'
    }
    return outcome
}


// ----------------------------------------------------------------------------------
// Start up the server!
const server = http.createServer((req, res) => {
    // If a fetch response url comes back as "/", that's a request for the home page.
    // Otherwise, we'll return the requested url.
    const requestPageName = req.url === "/" ? "index.html" : req.url
    // An easy way to check if a request is an api request. This evaluates to true or false.
    const isApiRequest = requestPageName.startsWith('/api')

    let filePath = path.join(__dirname, requestPageName)
    let fileType = path.extname(filePath)
    // If the path requested had no file extension, we will assume it was a request for a regular html page.
    // We'll also skip this for api requests, since those won't have file extensions in the request either.
    if (fileType.length === 0 && !isApiRequest) {
        filePath = path.join(__dirname, requestPageName + '.html')
        fileType = path.extname(filePath)
    }

    // Now we can automatically determine the content type to serve, based on the file extension.
    // All of this is to have one or two response function calls, rather than long if/else chains to
    // serve each page type.
    const contentType = getContentType(fileType)

    // Querystring is deprecated, since url.parse() now has a query property.
    // We can use url.parse() by itself instead.
    const params = url.parse(req.url, true).query

    // --------------------------------------------------
    // This will read the requested file path and serve it to the client.
    function servePageResponse() {
        fs.readFile(filePath, (err, data) => {
            res.writeHead(200, contentType)
            try {
                res.write(data)
            } catch (err) {
                console.log(`Error when trying to load ${requestPageName}`)
                console.log(err)
            }
            res.end()
        })
    }
    // --------------------------------------------------
    // This will serve our API response with the outcome of heads or tails.
    function serveAPIResponse() {
        const userChoice = params.flip
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(getCoinFlipResult(userChoice))
    }
    // --------------------------------------------------
    // This will handle and serve errors from the server (as well as errors from Figlet)
    function serveErrorResponse(err) {
        console.log(err)
        // Figlet is used for turning error text into ascii art.
        figlet('404 Page Not Found', function(figError, data) {
            if (figError) {
                console.log('Something went wrong...')
                console.dir(figError)
                return
            }
            res.write(data)
            res.end()
        })
    }

    // --------------------------------------------------
    // Response served here!
    try {
        isApiRequest ? serveAPIResponse() : servePageResponse()
    }
    catch (err) {
        serveErrorResponse(err)
    }
})
server.listen(PORT)
console.log(`Server listening on port ${PORT}...`)