'use strict';

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bower: {
			install: {
				options: {
					targetDir: './ui/client/lib',
					bowerOptions: {
						forceLatest: true
					}
				}
			}
		},
		less: {
			dist: {
				files: {
					'./client/application.css': [
						'./client/less/**/*.less'
					]
				}
			}
		},
		watch: {
			less: {
				files: ['./client/less/**/*.less'],
				tasks: ['less']
			}
		},
		nodemon: {
			dev : {
				script: 'ui/server.js',
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
	grunt.registerTask('build', ['bower:install']);
	grunt.registerTask('serve', ['bower:install', 'nodemon:dev']);
};