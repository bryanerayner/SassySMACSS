module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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
      tasks: ['newer:sass']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  

  grunt.registerTask('default', ['sass', 'watch']);

};