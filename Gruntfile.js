module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    autoprefixer:
    {
      dist:
      {
        options: {
          browsers: ['last 2 version', 'ie 8', 'ie 9']
        },
        files:[{
          expand: true,
          src: ['**/*.css'],
          dest: '',
          ext: '.css'
        }]     
      }
    },

    uglify:
    {
      lib:
      {
        mangle:true,
        compress:true,
        files:[{
          expand:true,
          src: ['lib/**.js', '!lib/**.min.js'],
          ext: '.min.js'
        }]
      }
    },

    sass:
    {
      dist:
      {
        sourcemap:true,
        files:[{
          expand: true,
          src: ['**/*.scss'],
          dest: 'css/',
          ext: '.css'
        }]        
      }
    },


    watch: {
      files: ["**/*.scss"],
      tasks: ['newer:sass', 'newer:autoprefixer', 'newer:uglify']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  

  grunt.registerTask('default', ['sass', 'autoprefixer', 'uglify', 'watch']);


};