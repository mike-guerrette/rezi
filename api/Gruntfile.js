'use strict';

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		nodemon: {
			dev: {
				script: 'api/server.js',
				options: {
					callback: function (nodemon) {
						nodemon.on('log', function (event) {
							console.log(event.colour);
						});
					}
				}
			}
		}
	});

	grunt.registerTask('default', ['nodemon:dev']);
	grunt.registerTask('serve', ['nodemon:dev']);
};