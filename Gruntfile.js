/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '',


    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: [
          'src/assets/js/libs/jquery.min.js',
          'src/assets/js/libs/pointer.min.js',
          'src/assets/js/libs/stats.min.js',

          'src/assets/js/global.js',
          'src/assets/js/namespace.js',

          'src/assets/js/item.js',
          'src/assets/js/groupitem.js',
          'src/assets/js/collision.js',
          'src/assets/js/engine.js',

          'src/assets/js/bullets.js',
          'src/assets/js/enemies.js',
          'src/assets/js/particles.js',
          'src/assets/js/player.js',
          'src/assets/js/prizes.js',
          'src/assets/js/sprite.js',
          'src/assets/js/game.js'
        ],
        //dest: 'src/assets/js/invaders.concat.js'
        dest: 'build/assets/js/invaders.min.js'
      }
    },


    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: 'src/assets/js/invaders.concat.js',
        dest: 'build/assets/js/invaders.min.js'
      }
    },


    watch: {
      scripts: {
        files: [
          'src/assets/js/*.js'
        ],
        tasks: ['concat', 'uglify']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['concat']);

};