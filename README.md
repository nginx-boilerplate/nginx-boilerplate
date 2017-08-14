# Nginx Boilerplate 

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
 * Docker/Swarm ready

## Requirements
 * `Docker` >= `1.13`
 * `docker-compose` >= `3.1`
 
Configs themselves depend on `Nginx` >= `1.9.5`, if used separately.
 
## Usage

### Abstract
Nginx boilerplate builds on top of official [nginx](https://hub.docker.com/_/nginx/) and [php](https://hub.docker.com/_/php/) alpine Docker images.
Additonally two basic docker-compose configs are provided: `docker-compose.yml` and `docker-compose.override.yml`.
The first contains the base/production version of the docker run config while the second transparently extends it to provide extra features for local development.
Only `docker-compose.yml` should be used in production.

`docker-compose.override.yml` also contains an empty php fpm installation for the sake of the demo. Also because the boilerplate assumes the usage of php-fpm and fails to start otherwise.

### Check it out

You only need docker for this, simply run:

```bash
$ docker run --rm -it -p 80:80 -p 443:443 nginxboilerplate/nginx-boilerplate
```

Now open up [https://localhost/go/home](https://localhost/go/home) in your browser!

And since you only run the nginx part there, there's no support for php.
If you open the main page, which supposed to give you the `phpinfo` output, it's going to load for 10 secods and give you an error page.  

### Running it

For a quick and dirty localhost setup run:
```bash
$ docker-compose up -d
```

By default the bundled nginx image is provided with self-signed wildcard certificate for *.localhost, so you will have to instruct your browser to trust it.

### Reloading
To not have to restart containers each time you modify your configs, you can simply run:

```bash
$ docker-compose exec nginx nginx -s reload
```

### Logs
By default a new `logs/` directory should be created in the project directory, that directly maps to the nginx logs directory. 

#### Docker swarm
To run in Docker swarm first make sure your Docker setup is in swarm mode:

```bash
$ docker swarm init
```

First of all you need to define your domain ssl certificate and key as a swarm secret:

```bash
$ docker secret create cert.crt your_certificate.crt
$ docker secret create cert.key your_certificate_key.key
```

Now to start or update nginx (and php) services in the swarm run:

```bash
$ docker stack deploy -c docker-compose.yml --with-registry-auth --prune app
```

To see nginx logs run:
```bash
$ docker service logs -f app_nginx
```

To scale services:
```bash
$ docker service scale app_nginx=2 app_fpm=10
```

Now you can refresh the page a couple of times and notice different host names that your requests land on.

### Customization

The main virtual host definition is located at `servers/main.conf`.
Probably the best way to work with the repo is by cloning it and hooking up docker hub to automatically build a new image whenever there's new code.
 

## If something doesn't work
 * Check error and access logs
 * [Create an issue](https://github.com/nginx-boilerplate/nginx-boilerplate/issues/new) on the project's github page
