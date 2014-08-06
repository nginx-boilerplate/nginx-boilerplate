<?php

$config = array(
    'server_name'          => 'test.com',
    'root_dir'             => '/var/www/localhost',
    //'http_port'            => 80,
    'support_https'        => 0,
    'ssl_cert'             => '/etc/nginx/certs/server.crt',
    'ssl_key'              => '/etc/nginx/certs/server.key',
    'max_upload_size'      => 5,
    'compress_response'    => 2,
    'protect_system_files' => 1,
    'allow_from'           => '',
    'use_php'              => 1,
    'cache_php_validity'   => 0,
    'cache_php_min'        => 3,
    'php_custom_errors'    => '',
    'method_options'       => 1,
    'method_get'           => 1,
    'method_head'          => 1,
    'method_post'          => 1,
    'method_put'           => 0,
    'method_patch'         => 0,
    'method_delete'        => 0,
    'method_trace'         => 0,
    'method_connect'       => 0,
    'log_bots'             => 1,
    'log_humans'           => 1,
    'flush_every_amount'   => 32,
    'flush_every_time'     => 5,
    'log_compress'         => 0,
    'error_level'          => 4,
    'connections_ip'       => 20,
    'normal_rps'           => 20,
    'max_rps'              => 100,
    'slowdown_rps'         => 0,
    'connections_ip_php'   => 20,
    'normal_rps_php'       => 10,
    'max_rps_php'          => 50,
    'slowdown_rps_php'     => 0,
    'backend_timeout'      => 10
);


if (!empty($_GET)) {

    $values = $_GET;

    foreach ($config as $name => $value) {
        // Values not provided at all
        if (!isset($values[$name])) {
            $values[$name] = $config[$name];
        }

        // Required values were empty
        $required = array('server_name', 'root_dir');
        if (in_array($name, $required) && !$value) {
            $value = $config[$name];
        }
    }

    $baseDir = realpath(__DIR__ . '/../src/nginx-bp/') . '/';
    $bootstrap = file_get_contents($baseDir . 'bootstrap/example.conf');

    $bootstrap = str_replace('/var/www/example/', $values['root_dir'], $bootstrap);
    //$bootstrap = str_replace('80;', $values['http_port'] . ';', $bootstrap);

    if ((int) $values['support_https']) {

        if ((int) $values['support_https'] === 2) {
            $bootstrap = preg_replace('~^(listen\s+[0-9]+;)~iUms', '#\1', $bootstrap);
        }

        $bootstrap = preg_replace('~^#(listen\s+[0-9]+ ssl;)~iUms', '\1', $bootstrap);
        $bootstrap = preg_replace('~^#(include.+ssl\.conf)~ismU', '\1', $bootstrap);
        $bootstrap = preg_replace('~^#(ssl_certificate)~ismU', '\1', $bootstrap);

        $bootstrap = str_replace($config['ssl_cert'], $values['ssl_cert'], $bootstrap);
        $bootstrap = str_replace($config['ssl_key'], $values['ssl_key'], $bootstrap);
    }

    $bootstrap = preg_replace('~^(client_max_body_size\s+)[0-9]+~ismU', '${1}' . $values['max_upload_size'], $bootstrap);

    if ($values['compress_response'] > 0) {
        $bootstrap = preg_replace('~^(gzip_comp_level\s+)[0-9]~ismU', '${1}' . $values['compress_response'], $bootstrap);
    } else {
        $bootstrap = preg_replace('~^(include\s+\S+gzip.+)$~iUsm', '#\1', $bootstrap);
        $bootstrap = preg_replace('~^(gzip_comp_level\s+\S+)$~iUsm', '#\1', $bootstrap);
    }

    if (!$values['protect_system_files']) {
        $bootstrap = preg_replace('~^(include\s+\S+system\S+)~ismU', '#\1', $bootstrap);
    }

    if (!empty($values['allow_from'])) {

        $bootstrap = preg_replace("~^#allow\s+\S+\n~ismU", '', $bootstrap);
        $bootstrap = preg_replace("~^#deny\s+\S+\n~ismU", '', $bootstrap);

        //allow_from
        $froms = explode(',', $values['allow_from']);

        foreach ($froms as &$from) {
            $from = 'allow ' . $from . ';';
        }
        $froms = implode(PHP_EOL, $froms) . PHP_EOL . 'deny all;' . PHP_EOL;

        $bootstrap = substr_replace($bootstrap, $froms, strpos($bootstrap, 'access?') + 8, 0);
    }

    if (!$values['use_php']) {
        $bootstrap = preg_replace("~^(\s*)(include\s+\S+php\.conf;)$~ismU", '\1#\2', $bootstrap);
        $bootstrap = preg_replace("~^(\s*)#(return 405;)$~ismU", '\1\2', $bootstrap);
    }

    if (!$values['use_php'] && $values['cache_php_validity']) {
        $bootstrap = preg_replace("~^(\s*)#(include\s+\S+php_cache\.conf;)$~ismU", '\1\2', $bootstrap);
        $bootstrap = preg_replace("~^(\s*)#(fastcgi_cache_valid[^;]+;)$~ismU", '\1\2', $bootstrap);
        $bootstrap = preg_replace("~^(\s*)#(fastcgi_cache_min_uses[^;]+;)$~ismU", '\1\2', $bootstrap);
        $bootstrap = preg_replace("~^(\s*fastcgi_cache_valid[^;]+)[0-9]+(h;)$~ismU",
                                  '${1}' . $values['cache_php_validity'] . '${2}', $bootstrap);
        $bootstrap = preg_replace("~^(\s*fastcgi_cache_min_uses\s+)[0-9]+(;)$~ismU",
                                  '${1}' . $values['fastcgi_cache_min_uses'] . '${2}', $bootstrap);
    }

    $refRpsFile = $baseDir . 'zones/rps10.conf';
    $rpsFile = $baseDir . 'zones/rps' . $values['normal_rps_php'] . '.conf';

    if (!file_exists($rpsFile)) {
        $newContent = str_replace('10', $values['normal_rps_php'], file_get_contents($refRpsFile));
        file_put_contents($rpsFile, $newContent);
        chmod($rpsFile, 0666);
    }

    if ($values['slowdown_rps_php']) {
        $bootstrap = str_replace('=50 nodelay', '=50', $bootstrap);
    }
    if ($values['slowdown_rps']) {
        $bootstrap = str_replace('=100 nodelay', '=100', $bootstrap);
    }

    $bootstrap = str_replace('reqPerSec10', 'reqPerSec' . $values['normal_rps_php'], $bootstrap);
    $bootstrap = str_replace('reqPerSec20', 'reqPerSec' . $values['normal_rps'], $bootstrap);
    $bootstrap = str_replace('=50', '=' . $values['max_rps_php'], $bootstrap);
    $bootstrap = str_replace('=100', '=' . $values['max_rps'], $bootstrap);
    $bootstrap = str_replace('conPerIp 10', 'conPerIp ' . $values['connections_ip_php'], $bootstrap);
    $bootstrap = str_replace('conPerIp 20', 'conPerIp ' . $values['connections_ip'], $bootstrap);

    if (!empty($values['php_custom_errors'])) {
        $allErrors = array_merge(
                range(400, 418), range(422, 426), array(428, 429, 431, 434, 449, 451, 456), range(499, 511)
        );

        $customErrors = explode(',', $values['php_custom_errors']);
        $customErrors = array_combine($customErrors, $customErrors);

        foreach ($customErrors as $file => &$code) {
            if (is_numeric(strpos($code, 'x'))) {
                $code = array_filter($allErrors,
                                     function ($check) use ($code)
                    {
                    $from = str_replace('x', 0, $code);
                    $to = str_replace('x', 9, $code);

                    return $check >= $from && $check <= $to;
                    });
            }

            if (!is_array($code) && !in_array($code, $allErrors)) {
                continue;
            }

            $code = (array) $code;
        }

        $customErrors = array_filter($customErrors);

        if (!empty($customErrors)) {

            //#fastcgi_intercept_errors   on;
            $bootstrap = preg_replace("~^#(fastcgi_intercept_errors[^;]+;)$~ismU", '\1', $bootstrap);
            $bootstrap = preg_replace("~^#(include\s+[^;]+errors[^;]+;)$~ismU", '\1', $bootstrap);
            $bootstrap = preg_replace("~^#(error_page[^;]+;)$~ismU", '', $bootstrap);

            $customErrorsStr = '';
            foreach ($customErrors as $file => $codes) {
                $customErrorsStr .= 'error_page             ' . implode(' ', $codes) . ' /' . $file . '.html' . PHP_EOL;
            }

            $bootstrap = substr_replace($bootstrap, $customErrorsStr, strpos($bootstrap, '/errors.conf') + 14, 0);
        }
    }

    $methods = array();
    foreach ($values as $key => $value) {
        if (strpos($key, 'method_') === 0 && $value) {
            $methods[] = strtoupper(substr($key, 7));
        }
    }

    $methods = implode('|', $methods);

    if (!empty($methods)) {
        $bootstrap = str_replace('OPTIONS|GET|HEAD|POST', $methods, $bootstrap);
    }

    $errorLevels = array('Debug', 'Info', 'Notice', 'Warn', 'Error', 'Crit', 'Alert', 'Emerg');
    $errorLevel = strtolower($errorLevels[$values['error_level']]);

    $bootstrap = str_replace(' error;', ' ' . $errorLevel . ';', $bootstrap);

    if (!$values['log_humans']) {
        $bootstrap = preg_replace('~(access_[^;]+access[^;]+;)$~iUsm', '#\1', $bootstrap);
    }

    $bootstrap = str_replace('localhost.error.log', $values['server_name'] . '.error.log', $bootstrap);
    $bootstrap = str_replace('localhost.access.log', $values['server_name'] . '.access.log', $bootstrap);
    $bootstrap = str_replace('localhost.bots.log', $values['server_name'] . '.bots.log', $bootstrap);

    if ($values['flush_every_amount']) {
        $bufStr = ' buffer=' . $values['flush_every_amount'] . 'k';
        $bootstrap = substr_replace($bootstrap, $bufStr, strpos($bootstrap, 'bots.log main') + 13, 0);
        $bootstrap = substr_replace($bootstrap, $bufStr, strpos($bootstrap, 'access.log main') + 15, 0);
    }

    if ($values['flush_every_time']) {
        $fluStr = ' flush=' . $values['flush_every_time'] . 'm';
        $bootstrap = substr_replace($bootstrap, $fluStr, strpos($bootstrap, 'bots.log main') + 13, 0);
        $bootstrap = substr_replace($bootstrap, $fluStr, strpos($bootstrap, 'access.log main') + 15, 0);
    }

    if ($values['log_compress']) {
        $gzStr = ' gzip=' . $values['log_compress'];
        $bootstrap = substr_replace($bootstrap, $gzStr, strpos($bootstrap, 'bots.log main') + 13, 0);
        $bootstrap = substr_replace($bootstrap, $gzStr, strpos($bootstrap, 'access.log main') + 15, 0);

        $bootstrap = str_replace('access.log ', 'access.log.gz ', $bootstrap);
        $bootstrap = str_replace('bots.log ', 'bots.log.gz ', $bootstrap);
    }

    if (!$values['backend_timeout']) {
        $bootstrap = preg_replace('~(fastcgi_read_timeout[^;]+;)$~iUsm', '#\1', $bootstrap);
    } else {
        $bootstrap = preg_replace('~(fastcgi_read_timeout\s+)[0-9]+(;)$~iUsm',
                                  '${1}' . $values['backend_timeout'] . '${2}', $bootstrap);
    }


    $server = file_get_contents($baseDir . '../sites-available/example.conf');

    if (strpos($values['server_name'], 'www.') === 0) {
        $otherServerName = substr($values['server_name'], 4);
    } else {
        $otherServerName = 'www.' . $values['server_name'];
    }

    $server = str_replace('www.localhost', $otherServerName, $server);
    $server = str_replace('localhost', $values['server_name'], $server);

    //return          302 http://localhost;
    $server = preg_replace('~(\s+return[^;]+://)[^$]+(\$request_uri;)~iUsm', '\1' . $values['server_name'] . '\2', $server);

    if ($values['support_https'] == 1) {
        $server = str_replace('#listen', 'listen', $server);
        $server = str_replace('#include', 'include', $server);
        $server = str_replace('#ssl', 'ssl', $server);
        $server = str_replace('http://', '$scheme://', $server);
    }

    if ($values['support_https'] == 2) {
        $server = str_replace('http://', 'https://', $server);

        $server2 = substr($server, 0, strpos($server, '}') + 1);

        $server = preg_replace('~(server_name\s+)~iUsm', '\1' . $values['server_name'] . ' ', $server);

        $server2 = str_replace('#listen', 'listen', $server2);
        $server2 = preg_replace('~(listen\s+80;)~', '#\1', $server2);
        $server2 = str_replace('#include', 'include', $server2);
        $server2 = str_replace('#ssl', 'ssl', $server2);
        $server = $server2 . PHP_EOL . PHP_EOL . $server . PHP_EOL;
    }

    $server = str_replace('bootstrap/example.conf', 'bootstrap/' . $values['server_name'] . '.conf', $server);

    if ($values['server_name'] == 'example') {
        die('bad server name');
    }

    $serverFile = $baseDir . '../sites-available/' . $values['server_name'] . '.conf';
    $bootstrapFile = $baseDir . 'bootstrap/' . $values['server_name'] . '.conf';

    file_put_contents($serverFile, $server);
    file_put_contents($bootstrapFile, $bootstrap);

    chdir($baseDir . '../sites-enabled/');

    if (!file_exists($values['server_name'] . '.conf')) {
        $res = symlink('../sites-available/' . $values['server_name'] . '.conf', $values['server_name'] . '.conf');
    }

    if (isset($values['download'])) {

        posix_setuid(1000);
        $dest = '/tmp/' . uniqid('ngbp');

        mkdir($dest);

        $dirIterator = new RecursiveDirectoryIterator($baseDir . '/../', RecursiveDirectoryIterator::SKIP_DOTS);
        $iterator = new RecursiveIteratorIterator($dirIterator, RecursiveIteratorIterator::SELF_FIRST);

        foreach ($iterator as $item) {
            if ($item->isDir()) {
                $dirPath = $dest . '/' . $iterator->getSubPathName();
                mkdir($dirPath);
            } elseif ($item->getFileName() !== '.gitignore') {
                $filePath = $dest . '/' . $iterator->getSubPathName();

                if (is_link($item)) {
                    symlink(readlink($item), $filePath);
                } else {
                    copy($item, $filePath);
                }
            }
        }

        `cd $dest && zip --symlinks -r ngbp.zip *`;

        header('Content-Type: application/zip');
        header('Content-Disposition: attachment; filename=' . basename($dest . '/' . $values['server_name'] . '_nginx_boilerplate.zip'));
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($dest . '/ngbp.zip'));
        readfile($dest . '/ngbp.zip');

        `rm -rf $dest`;
        unlink($serverFile);
        unlink($bootstrapFile);
        unlink($baseDir . '../sites-enabled/' . $values['server_name'] . '.conf');
    }
} else {
    die(json_encode($config));
}