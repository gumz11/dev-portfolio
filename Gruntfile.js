module.exports = function( grunt ) {
	'use strict';

	grunt.initConfig( {
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			all: [
				'Gruntfile.js',
				'assets/scripts.js'
			]
		},

		uglify: {
			target: {
				files: {
					'scripts.min.js': ['assets/scripts.js']
				}
			}
		},

		sass: {
			dist: {
				files: {
					'style.css': 'assets/style.scss'
				}
			}
		},

		autoprefixer: {
			dist: {
				options: {
					browsers: [ 'last 1 version', '> 1%', 'ie 8' ]
				},
				files: {
					'style.css': ['style.css']
				}
			}
		},

		cssmin: {
			target: {
				files: {
					'style.min.css': ['style.css']
				}
			}
		},

		watch: {
			styles: {
				files: ['assets/*.scss'],
				tasks: ['sass', 'autoprefixer', 'cssmin'],
				options: {
					debounceDelay: 500
				}
			},
			scripts: {
				files: ['assets/*.js'],
				tasks: ['jshint', 'uglify'],
				options: {
					debounceDelay: 500
				}
			}
		}

	});

	grunt.registerTask('default', ['jshint', 'uglify', 'sass', 'autoprefixer', 'cssmin']);

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
};