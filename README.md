#Nginx Boilerplate 

Awesome Nginx configuration template and a set of handy must-have snippets.

## Features
 * Convenient include-based config structure
 * Optimized defaults
 * Connection and requests rate limitation settings
 * Backend response caching
 * Various predefined locations
 * Advanced logging
 
## Requirements (at least one)
 * `Docker` to run it anywhere
 * `Nginx` >= `1.7` to run it "bare"
 * /etc/hosts needs changing for local development

## Running with Docker (recommended)
 * `git clone git@github.com:Umkus/nginx-boilerplate.git`
 * `cd nginx-boilerplate/`
 * `docker-compose up`
 * Update your `/etc/hosts` in accordance with `test/hosts`

## Running "bare"
 * `git clone git@github.com:Umkus/nginx-boilerplate.git`
 * `sudo cp nginx-boilerplate /etc/nginx/`

## If something doesn't work
 * Make sure you have `cgi.fix_pathinfo` set to `1` or commented out in php.ini
 * Check the contents of `/var/log/nginx/yoursitename.error.log`
 * Make sure to have proper file/folder permissions for config files
 * Create an issue on the project's github page
