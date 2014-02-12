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
      parser: {
        options: {
          port: 9001,
          base: './src/QueryString'
        }
      },
      xsl: {
        options: {
          port: 9001,
          base: './src/XSL'
        }
      }
    },

    watch: {
      files: {
        files: ['src/**/*.js', 'src/**/*.xml', 'src/**/*.xsl']
      }
    }
  });
  grunt.registerTask('parser', ['connect:parser', 'watch']);
  grunt.registerTask('xsl', ['connect:xsl', 'watch']);
  grunt.registerTask('default', 'parser');

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
};
