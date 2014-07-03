#!/bin/sh

command -v php >/dev/null 2>&1 || { echo "Php is required to run UI" >&2; exit 1; }

if [ $(php -r 'print(float)PHP_VERSION_ID;') \< 50500 ]; then
    echo "Sorry, at least php 5.4 is required to run UI"
    exit 1;
fi

TARGET=localhost:5517;
if [ $# -ne 0 ]; then
    TARGET=$1;
fi;

php -S $TARGET -t $(readlink -m $(dirname $0)/../)/ui/