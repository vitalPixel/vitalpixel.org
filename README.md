# vitalpixel.org
This is the source code for my personal website, the purpose of which was mainly for me to keep up with modern frontend development and deployment.  

But I find the modern web despicable, for the most part at least.  
- The extremely dark patterns of the cookie consent pop-ups — but especially the invasive cookies they're pretending to block;
- The agressiveness of newsletter subscription modals — but mostly the unnecessary marketing campaigns they are trying to shove down your throat;
- The countless other third party scripts, frameworks, and spying mechanisms that go into most websites today...  

So I established the goal of having the simplest possible setup that minimizes the use of external dependencies and avoids cookies like the plague.  
I would also like to avoid having javascript running on the client as much as possible, but the feasibility remains to be seen.

The build process is just a basic gulp recipe that compiles .scss files to .css, minifies everything and performs some other post-processor steps.
I'm still looking for the best solution to allow some kind of compenentization and templating.  
The deployment is made by TravisCI each time there is a push to the Master branch.  

## Develop
1. Clone this repo;
2. Running `nvm use` will make sure that you're using the latest node version supported by the project;
3. Running `npm install` will install all of the dev dependencies (mostly related to the gulp processes described below);
4. Running `gulp watch` will spin up a local server that will automatically open the index.html on Firefox and automatically refresh the browser each time you save any changes to the .html or .scss files.

## Deploy
1. Running `gulp build` will compile everything, minify all css and js, autoprefix css to the last 2 versions of each browser and put everything in the deploy folder.