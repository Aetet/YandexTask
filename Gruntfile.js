var Aliases = [
  './app.coffee:app',
  './config/emitter.coffee:emitter',
  './config/emitter.coffee:emitter',
  './spec.coffee:spec',
  './spec/spec_helper.coffee:spec_helper'
];

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9001,
          base: '.'
        }
      }
    },

    watch: {
      files: {
        files: ['src/**/*.js', 'src/**/*.xml', 'src/**/*.xsl']
      }
    }
  });
  grunt.registerTask('default', ['connect', 'watch']);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
};
