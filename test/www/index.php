<?php

usleep(300000);
session_start();
header('Server: Nginx Boilerplate');
print '<h3 style="color: #59F;">Nginx Boilerplate works (uniqid: ' . uniqid() . ')</h3>';

print '<pre>';
print_r($_SERVER);
