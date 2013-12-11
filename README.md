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

## Try it
 * Update the "root" directive in src/sites/default.conf
 * (optional) Update the "user" directive in src/nginx-bp/system/os.conf
 * (optional) Make sure "user" has access to the locations specified in src/nginx-bp/system/os.conf (access logs, php socket, fastcgi tmp dirs)
 * (optional) Check src/nginx-bp/upstreams/php.conf to match your php-fpm setup (socket vs TCP/IP)
 * Run bin/run.sh as privileged user to restart Nginx in boilerplate mode
 * Go to http://localhost/ (or http://127.0.0.1/)

## Install
 * Copy the contents of src/ to your nginx config directory (usually /etc/nginx)
 * (optional) Update the "user" directive in src/system/os.conf if needed
 * (optional) Make sure "user" has access to the specified in src/nginx-bp/system/os.conf locations
 * (optional) Check src/nginx-bp/upstreams/php.conf to match your php-fpm setup (socket vs TCP/IP)
 * Create/migrate your vhosts to sites/
 * (optional) To disable a site change its config's file extention to anything other than .conf

## If something doesn't work
 * Make sure you have cgi.fix_pathinfo set to "1" or commented out in php.ini
 * Check the contents of /var/log/nginx/default.error.log
 * Create an issue on the project's github page
