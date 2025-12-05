module.exports = function (grunt) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();


    grunt.initConfig({
        concat: {
            options: {
                separator: '\n',
                sourceMap: true,
                banner: '/*"The document is updated on "' + dd + '"/"' + mm + '"/"' + yyyy + '"*/\n'
            },
            css: {
                src: ['../css/**/*.css'],
                dest: 'dist/style.css',
            },
            js: {
                src: [
                    '../js/**/*.js'
                ],
                dest: 'dist/app.js',

            },
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    '../../htdocs/css/style.min.css': ['dist/style.css']
                }
            }

        },
        copy: {
            jquery: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        // filter:'isfile',
                        src: ['bower_components/jquery/dist/*'],
                        dest: '../../htdocs/js/jquery/',
                    },
                ],
            },
        },
        uglify: {
            my_target: {
                options: {
                    sourceMap: true,
                },
                files: {
                    '../../htdocs/js/app.min.js': ['dist/app.js'],
                },
            },
        },
        watch: {
            css: {
                files: ['../css/**/*.css'],
                tasks: ['concat:css', 'cssmin'],
                options: {
                    spawn: false,
                },
            },
            js: {
                files: ['../js/**/*.js'],
                tasks: ['concat:js', 'uglify', 'obfuscator'],
                options: {
                    spawn: false,
                },
            },

        },
        obfuscator: {
            options: {
                banner: '// obfuscated with grunt-contrib-obfuscator.\n',
                debugProtection: true,
                debugProtectionInterval: 1000,

                domainLock: ['gruntshow.selfmade.technology']
            },
            task1: {
                options: {
                    // options for each sub task
                },
                files: {
                    '../../htdocs/js/app.o.js': [
                        'dist/app.js'
                    ]
                }
            }
        },
    });



    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-obfuscator-4');
    grunt.registerTask('default', ['copy', 'concat', 'cssmin', 'uglify', 'obfuscator', 'watch']);

};