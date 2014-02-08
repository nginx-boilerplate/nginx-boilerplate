#!/bin/sh

# This script kills any currently running nginx instance
# and starts a new one with the boilerplate config
# it also waits for any changes in boilerplate configs
# and reloads nginx

if [ "$(whoami)" != 'root' ]; then
    echo "Please run this script as a privileged user"
    exit 1;
fi

NxBinary="";

for N in nginx tengine
do 
    if which $N > /dev/null 2>&1;
    then
        NxBinary=$N;
        break
    fi
done

if [ "$NxBinary" = "" ]; then
    echo "Please install Nginx/Tengine first.";
    exit;
fi

stop_nginx()
{
    echo "Stopping $NxBinary"
    kill `pgrep $NxBinary` > /dev/null 2>&1
}

start_nginx()
{
    echo "Starting $NxBinary"
    $NxBinary -c $basePath/nginx.conf -p $basePath
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

echo Press Ctrl+C to stop $NxBinary

sh $basePath/../bin/chmon.sh "echo Reloading $NxBinary; killall $NxBinary; $NxBinary -c $basePath/nginx.conf -p $basePath;" $basePath