var connect = require('connect');
var serveStatic = require('serve-static');
var path = __dirname + "/public";

console.info("path is:", path);

connect().use(serveStatic(path)).listen(8080, function(){
    console.log('Server running on 8080...');
});