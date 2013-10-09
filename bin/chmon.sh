#!/bin/bash

if [ $# = 0 ] ; then
    echo
    echo 'File change monitor'
    echo 'Usage: sh chmon.sh "some_command"  [/path/to/watch/]'
    echo
    exit;
fi

path=$2
if [ $# = 1 ] ; then
    path=$(pwd)
fi

sha=""
previous_sha=""
command=$1
 
update_sha()
{
    sha="$(ls -lR $path | sha1sum)"
}

restart ()
{
    eval $command
}

changed ()
{
    restart
    previous_sha="$sha"
}

compare ()
{
    update_sha
 
    if [ "$previous_sha" = "" ] ;
        then
                previous_sha="$sha";
        fi
 
    if [ "$sha" != "$previous_sha" ] ;
        then
                changed;
        fi
}

echo 'Waiting for changes in '$path;

while true; do
    sleep 1
    compare
done