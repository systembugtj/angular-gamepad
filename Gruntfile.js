'use strict';

module.exports = function (grunt) {
  var libraryConfiguration = {
    lib: 'src',
    dist: 'dist'
  };

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    yeoman: libraryConfiguration,
    pkg: grunt.file.readJSON('package.json'),
    library: grunt.file.readJSON('bower.json'),
    concat: {
      options: {
        separator: ''
      },
      library: {
        src: ['.tmp/scripts/out.js'],
        dest: '<%= yeoman.dist %>/<%= library.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      jid: {
        files: {
          '<%= yeoman.dist %>/<%= library.name %>.min.js': ['<%= concat.library.dest %>']
        }
      }
    },
    jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: {
				src: [
					'Gruntfile.js',
					'src/**/*.js'
				]
			},
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/**/*.js']
			}
    },
    watch: {
      options: {
        livereload: true
      },
      ts: {
        files: ['<%= yeoman.lib %>/scripts/{,*}/*.ts'],
        tasks: ['typescript']
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['newer:jshint:all']
      },
      jsTest: {
        files: ['test/**/*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
		},
		typescript: {
			base: {
				src: ['<%= yeoman.lib %>/scripts/**/*.ts'],
				dest: '.tmp/scripts/out.js',
				options: {
					target: 'es5',
					basePath: '<%= yeoman.lib %>/scripts',
					sourceMap: true,
					declaration: true,
					watch: false
				}
			}
		},
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('default', [
    'newer:jshint',
    'typescript',
    'concat',
    'uglify'
  ]);
  grunt.registerTask('livereload', [
    'default',
    'watch'
  ]);
};
