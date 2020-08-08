# vitalpixel.org
This is the source code for my personal website, the purpose of which was mainly for me to keep up with modern frontend development and deployment.  

But I find the modern web despicable, for the most part at least. The extremely dark patterns of the cookie consent pop-ups — but especially the invasive cookies they're pretending to block, the agressiveness of newsletter subscription modals — but mostly the unnecessary marketing campaigns they are trying to shove down your throat, or the countless other third party scripts, frameworks, and spying mechanisms that go into most websites today.  

So I established the goal of having a simple build and deploy setup that minimizes the use of external dependencies and avoids having javascript running on the client-side like the plague.  
The build process is just a basic gulp recipe that compiles .scss files to .css, minifies everything and performs some other post-processor steps.
I'm still looking for the best solution to allow some kind of compenentization and templating.  
The deployment is made by TravisCI each time there is a push to the Master branch.  

## Develop
Using `gulp watch` will spin up a local server that will automatically open the index.html on Firefox.  
The browser will be automatically refreshed each time you save the .html or .scss files.

## Deploy
Using `gulp build` will compile and minify css and js, autoprefix css to the last 2 versions of each browser and put everything in the deploy folder.