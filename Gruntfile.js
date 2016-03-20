var sys = require('sys');
var exec = require('child_process').exec;

module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            jsx: {
              files: ['src/componnents/*.jsx', "main.js"],
              tasks: ['jsxToJs'],
            },
        }
    });

    grunt.registerTask('jsxToJs', 'compile jsx to js', function() {
        console.info("compile jsx to js")
        
        exec("webpack", function (error, stdout, stderr) {
            console.log("excute webpack");
            
            sys.print('stdout: ' + stdout);
            sys.print('stderr: ' + stderr);

            if (error !== null) {
                console.log('exec error: ' + error);
            }
        })
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
};