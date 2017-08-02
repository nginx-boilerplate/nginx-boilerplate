#Nginx Boilerplate 

[![Chat](https://img.shields.io/gitter/room/gitterHQ/gitter.svg)](https://gitter.im/nginx-boilerplate/nginx-boilerplate)

Awesome Nginx configuration template and a set of handy must-have snippets.

## Features
 * Expressive include-based config
 * Optimized defaults
 * Easy PHP integration
 * Connections/requests rate limiting and throttling
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
The first contains the base/production version of the docker run config while the second transparently extends it to provide extra features for local development.
Only `docker-compose.yml` should be used in production.

`docker-compose.verride.yml` also contains an empty php fpm installation for the sake of the demo. Also because the boilerplate assumes the usage of php-fpm and fails to start otherwise.

### Quick start
For a quick start simply run:
```bash
$ docker-compose up -d
```

Now open [https://localhost](https://localhost) in your browser!

By default the bundled nginx image is provided with self-signed wildcard certificate for the chosen domain name (see `.env`), so you will have to instruct your browser to trust it.

### Reloading
To not have to restart containers each time you modify your configs, you can simply run:

```bash
$ docker-compose exec nginx nginx -s reload
```

Now simply open [http://localhost/info.php]()!

### Logs
By default a new `logs/` directory should be created in the project directory, that directly maps to the nginx logs directory.

## If something doesn't work
 * Check error and access logs
 * [Create an issue](https://github.com/nginx-boilerplate/nginx-boilerplate/issues/new) on the project's github page
