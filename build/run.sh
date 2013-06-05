#!/bin/sh

# This script kills any currently running nginx instance
# and starts a new one with the boilerplate config

kill `pgrep nginx` > /dev/null 2>&1 
nginx -c $(realpath $(dirname $0)/../src/)/nginx.conf