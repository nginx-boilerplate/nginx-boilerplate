#!/bin/sh

#Domain manager for Nginx Boilerplate
#Convenient adding and removing(eventually) domains


if [ "$(whoami)" != 'root' ]; then
    echo "Please run this script as a privileged user"
    exit 1;
fi

#Change to your document root container directory
#Project document root would be created inside
DOC_ROOT=/var/www/;


#TODO: grab this value from nginx-bp/system.conf
USR=www-data;

ISLOCAL=0;
BPCONFPATH=$(readlink -m $(dirname $0)/../src/sites)
CONFPATH=$BPCONFPATH;

while getopts lc: option
do
    case "${option}"
    in
            l)
                ISLOCAL=1;
            ;;
            c)
                CONFPATH=${OPTARG};
            ;;
    esac
done

shift `expr $OPTIND - 1`

if [ $# = 0 ] ; then
    echo "Usage: $(basename $0) [-c <confpath>] [-l] <domainname>"
    echo "    <domainname>  Valid domain name without leading www. Required."
    echo "    <confpath>    Config path to save. Defaults src/nginx-bp/sites/"
    echo "    -l            Localhost mode flag. Additionally modifies /etc/hosts. Defaults to Off."
   #echo "    <docroot>     Document root container path to use. Defaults to /var/www/."
    echo "Example: $(basename $0) test.com"
    echo

    exit;
fi

DOMAIN=$1;
DOMAINFILE=$(readlink -m $CONFPATH/$DOMAIN.conf)

echo Creating server config: $DOMAINFILE

if [ -f $DOMAINFILE ];
then
    echo Config already exists
else
    cp $BPCONFPATH/default.conf $DOMAINFILE;
fi

DOC_ROOT=$DOC_ROOT$DOMAIN;

echo Creating document root: $DOC_ROOT;

if [ ! -d $DOC_ROOT ];
then
    mkdir -p $DOC_ROOT;
    chmod -R 0755 $DOC_ROOT;
    chown -R $USR: $DOC_ROOT;

    cp $BPCONFPATH/../../test/www/index.html $DOC_ROOT;
    cp $BPCONFPATH/../../test/www/index.php $DOC_ROOT;
else
    echo Document root already exists;
fi

DOC_ROOT=$(echo $DOC_ROOT | sed -e"s/\//\\\\\//g");

sed -i -e"s/root\(\s\+\).*/root\1$DOC_ROOT;/" $DOMAINFILE;
sed -i -e"s/server_name\(\s\+\).*;/server_name\1$DOMAIN;/" $DOMAINFILE;
sed -i -e"s/listen.*//" $DOMAINFILE;

if [ $ISLOCAL -eq 1 ];
then
    echo Adding domain $DOMAIN to /etc/hosts

    if grep -q "127.0.0.1 $DOMAIN" /etc/hosts
    then
        echo Domain $DOMAIN was already in /etc/hosts
    else
        echo "127.0.0.1 $DOMAIN" >> /etc/hosts
    fi
fi

echo All done.