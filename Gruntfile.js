module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify:
    {
      
    }

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
      tasks: ['sass']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  

  grunt.registerTask('default', ['sass', 'watch']);

};