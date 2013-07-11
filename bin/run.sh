#!/bin/sh

# This script kills any currently running nginx instance
# and starts a new one with the boilerplate config
# it also waits for any changes in boilerplate configs
# and reloads nginx

if [ "$(whoami)" != 'root' ]; then
    echo "Please run this script as a privileged user"
    exit 1;
fi

stop_nginx()
{
    echo "\nStopping Nginx\n"
    kill `pgrep nginx` > /dev/null 2>&1
}

start_nginx()
{
    echo "\nStarting Nginx\n"
    nginx -c $basePath/nginx.conf
}

ctrl_c()
{
    stop_nginx;
    exit $?
}

basePath=$(readlink -m $(dirname $0)/../)/src/

trap ctrl_c INT

stop_nginx
start_nginx
sh $basePath/../bin/chmon.sh "echo Reloading Nginx; killall nginx; nginx -c $basePath/nginx.conf;" $basePath