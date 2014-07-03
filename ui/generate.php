<?php

$config = array(
    'server_name'          => '',
    'root_dir'             => '',
    'http_port'            => 80,
    'support_https'        => 0,
    'ssl_cert'             => '',
    'ssl_key'              => '',
    'max_upload_size'      => 5,
    'compress_response'    => 2,
    'protect_system_files' => true,
    'allow_from'           => '',
    'use_php'              => true,
    'cache_php_validity'   => 0,
    'cache_php_min'        => 3,
    'php_custom_errors'    => '',
    'method_options'       => true,
    'method_get'           => true,
    'method_head'          => true,
    'method_post'          => true,
    'method_put'           => false,
    'method_patch'         => false,
    'method_delete'        => false,
    'method_trace'         => false,
    'method_link'          => false,
    'method_unlink'        => false,
    'method_connect'       => false,
    'log_bots'             => true,
    'log_dynamic'          => true,
    'flush_every_amount'   => 32,
    'flush_every_time'     => 5,
    'log_compress'         => 0,
    'error_level'          => 4,
    'connections_ip'       => 20,
    'normal_rps'           => 17,
    'max_rps'              => 100,
    'slowdown_rps'         => true,
    'connections_ip_php'   => 20,
    'normal_rps_php'       => 17,
    'max_rps_php'          => 100,
    'slowdown_rps_php'     => true,
    'backend_timeout'      => 10
);


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    die(json_encode($config));
}