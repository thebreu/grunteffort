module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['**/*.sass'],
          dest: 'css',
          ext: '.css'
        }]
      }
    },
    postcss: { // Begin Post CSS Plugin
      options: {
        map: false,
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        src: 'css/style.css'
      }
    },
    cssmin: { // Begin CSS Minify Plugin
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      }
    },
    // uglify: { // Begin JS Uglify Plugin
    //   build: {
    //     src: ['js/*.js'],
    //     dest: 'js/script.min.js'
    //   }
    // },
    watch: { // Compile everything into one task with Watch Plugin
      css: {
        files: '**/*.sass',
        tasks: ['sass', 'postcss', 'cssmin'],
      },
      html: {
        files: '**/*.html',
      },
      options: {
        livereload: true,
      },
      // js: {
      //   files: '**/*.js',
      //   tasks: ['uglify']
      // }

    },
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
        }
      }
    }
  });



  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Register Grunt tasks
  grunt.registerTask('default', ['connect', 'watch']);
};
