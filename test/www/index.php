<?php

usleep(300000);
session_start();
header('Server: Nginx Boilerplate');
print '<h3 style="color: #59F;">Nginx Boilerplate works (uniqid: ' . uniqid() . ')</h3>';

if ($_SERVER['REMOTE_ADDR'] === $_SERVER['SERVER_ADDR']) {
    print '<pre>';
    print_r($_SERVER);
}