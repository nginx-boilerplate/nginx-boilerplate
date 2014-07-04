#Nginx Boilerplate 
Awesome Nginx configuration template and a set of handy must-have snippets.

***
## Features
 * Convenient include-based config structure
 * Optimized defaults
 * Connection and requests rate limitation settings
 * Backend response caching
 * Various predefined locations
 * Advanced logging

## Install in trial mode
 * Update the "root" directive in src/sites/default.conf
 * (optional) Check src/nginx-bp/upstreams/php.conf to match your php-fpm setup (socket vs TCP/IP)
 * Run bin/run.sh as privileged user to restart Nginx in boilerplate mode
 * Go to http://localhost/

## Run the UI and get configure boilerplate
 * Run bin/ui.sh to start the UI (you can provide a server:port as an optional argument)
 * Got to localhost:5517 (or whatever you specified as an optional argument)
 * Configure your boilerplate and hit the download button
 * Optionally, if you have boilerplate running in a trial mode, hit test drive button to see how it works

## If something doesn't work
 * Make sure you have cgi.fix_pathinfo set to "1" or commented out in php.ini
 * Check the contents of /var/log/nginx/default.error.log
 * Create an issue on the project's github page
