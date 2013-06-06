#!/bin/sh

# This script kills any currently running nginx instance
# and starts a new one with the boilerplate config

basePath=$(readlink -m $(dirname $0)/../)/src/

kill `pgrep nginx` > /dev/null 2>&1 
nginx -c $basePath/nginx.conf