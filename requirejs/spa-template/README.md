# RequireJS - Single Page Application Template #

### About ###

This template is intended facilitate future modular javascript experiments and
projects. It is a direct copy of https://github.com/volojs/create-template, with
only minor changes.

* No guarantees that any of the code will compile properly or work at all!
* I take no responsibility for your use or misuse of any of this code!
* Caveat emptor!

### Instructions ###

This web project has the following setup:

* www/ - the web assets for the project
    * index.html - the entry point into the app.
    * app.js - the top-level config script used by index.html
    * app/ - the directory to store project-specific scripts.
    * lib/ - the directory to hold third party scripts.
* tools/ - the build tools to optimize the project.

To optimize, run:

    node tools/r.js -o tools/build.js

That build command creates an optimized version of the project in a
**www-built** directory. The app.js file will be optimized to include
all of its dependencies.

For more information on the optimizer:
http://requirejs.org/docs/optimization.html

For more information on using requirejs:
http://requirejs.org/docs/api.html

### Who do I cuss out? ###

* Andrew L. Ayers - junkbotix@gmail.com
* http://www.phoenixgarage.org/



