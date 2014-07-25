To use these configs either copy them as they are or use the UI boilerplate generator (recommended, unless you've already did that. See http://nginx-boilerplate.umkus.com/ for the UI.)

To install boilerplate copy files in this directory over to `/etc/nginx`.
If this is the first time installing nginx boilerplate backup your original `/etc/nginx` contents.

To further customize your generated boilerplate site please edit the site config `nginx-bp/bootstrap/SITE_URL.conf`

You should not change other files if you want the following features supported:
 * drop-in installation and independent operation of other generated boilerplate sites 
 * upgrading boilerplate

If required - create new config files and include them from the respected site config.
