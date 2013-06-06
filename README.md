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
 * Update the "root" directive in src/sites/default.conf (document root)
 * Update the "user" directive in src/system.conf if needed (logs and fastcgi)
 * run build/run.sh to restart Nginx in boilerplate mode
 * Go to http://127.0.0.1 (or to http://your_host_name)

## Install
 * Copy the contents of src/ to your nginx config directory (usually /etc/nginx)
 * Update the "user" directive in src/system.conf if needed
 * Create/migrate your vhosts to sites/
 * To disable a site change its config's file extention to anything other than .conf