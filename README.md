#Nginx Boilerplate 

[![Chat](https://img.shields.io/gitter/room/gitterHQ/gitter.svg)](https://gitter.im/nginx-boilerplate/nginx-boilerplate)

Awesome Nginx configuration template and a set of handy must-have snippets.

## Features
 * Expressive include-based config
 * Optimized defaults
 * Connections/requests rate limiting and throttling
 * Easy PHP integration
 * [A-grade](https://www.ssllabs.com/ssltest/analyze.html) SSL setup
 * FastCGI response caching
 * Various predefined locations
 * Advanced logging
 * SEO
 * Docker-ready

## Requirements
 * Docker
 * docker-compose
 
Configs themselves depend on `Nginx` >= `1.7`, if used separately.
 
## Usage

### Abstract
Nginx boilerplate builds on top of official [nginx](https://hub.docker.com/_/nginx/) and [php](https://hub.docker.com/_/php/) alpine Docker images.
Additonally two basic docker-compose configs are provided: `docker-compose.yml` and `docker-compose.override.yml`.
The first contains the base/production version of the config and the second transparently extends it to provide extra features for local development.
Only `docker-compose.yml` should be used in production.
The additional docker compose config contains an empty php fpm installation for the sake of demo.

### Quick start
For a quick start simply run:
```bash
$ docker-compose up -d
```

By default two lightweight containers with default nginx boilerplate configuration would be created.
To not have to restart containers each time you would modify your configs, you can simply run:

```bash
$ docker-compose exec nginx nginx -s reload
```

```bash
docker exec -it fpm sh -c "echo '<?php phpinfo();' > /var/www/html/info.php"
```

## If something doesn't work
 * Check error logs
 * Make sure to have proper file/folder permissions
 * Create an issue on the project's github page
