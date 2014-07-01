var disabled = {
};

var config = {
    layout: {
        name: 'layout',
        padding: 0,
        panels: [
            {type: 'left', size: 200, resizable: true, minSize: 120},
            {type: 'main', minSize: 550, overflow: 'hidden'},
            {type: 'bottom', size: 60, overflow: 'hidden'}
        ]
    },
    sidebar: {
        name: 'sidebar',
        nodes: [
            {id: 'server', text: 'Server', img: 'icon-server', selected: true},
            {id: 'basic', text: 'Basic', img: 'icon-basic'},
            {id: 'access', text: 'Access', img: 'icon-access'},
            {id: 'cache', text: 'Cache', img: 'icon-cache'},
            {id: 'system', text: 'System', img: 'icon-system'},
            {id: 'php', text: 'Php', img: 'icon-php'},
            {id: 'methods', text: 'Methods', img: 'icon-methods'},
            {id: 'logs', text: 'Logs', img: 'icon-logs'},
            {id: 'limits', text: 'Limits', img: 'icon-limits'},
            {id: 'timeouts', text: 'Timeouts', img: 'icon-timeouts'}
        ],
        onClick: function(event) {
            w2ui.layout.content('main', w2ui[event.target]);
        }
    },
    server: {
        name: 'server',
        fields: [
            {
                name: 'server_name',
                type: 'text',
                hint: 'Having "www." prefix will force "www." 301 redirect and vice-versa',
                html: {
                    caption: 'Server name',
                    attr: 'placeholder="example.com"'
                }
            },
            {
                name: 'root_dir',
                type: 'text',
                hint: 'Directory where the site files are',
                html: {
                    caption: 'Web document root',
                    attr: 'placeholder="/var/www/example/"'
                }
            },
            {
                name: 'http_port',
                type: 'int',
                hint: 'Port to use',
                html: {
                    attr: 'maxlength="8" class="int"',
                    caption: 'Http port'
                }
            },
            {
                name: 'support_https',
                type: 'list',
                options:
                        {
                            items: [
                                {text: 'No', value: 0},
                                {text: 'Yes', value: 1},
                                {text: 'Always', value: 2}
                            ],
                            showNone: false
                        },
                html: {
                    caption: 'Support HTTPS'
                },
                hint: 'Choosing "Always" will force 301 redirect'
            },
            {
                name: 'ssl_cert',
                type: 'text',
                html: {
                    caption: 'Path to SSL certificate'
                }
            },
            {
                name: 'ssl_key',
                type: 'text',
                html: {
                    caption: 'Path to SSL key'
                }
            }
        ],
        record: {
            http_port: 80,
            support_https: 0,
        }
    },
    basic: {
        name: 'basic',
        fields: [{
                name: 'allow_uploads',
                type: 'float',
                html: {
                    attr: 'maxlength="8" class="int"',
                    caption: 'Allow uploads (Mbs)'
                },
                hint: 'Use zero to disable'
            },
            {
                name: 'compress_response',
                type: 'text',
                html: {
                    caption: 'Compression level',
                    attr: 'maxlength="1" class="int"'
                },
                hint: 'Use 0 to disable gzip compression'
            },
            {
                name: 'protect_system_files',
                type: 'checkbox',
                html: {
                    caption: 'Protect system files'
                },
                hint: 'Restrict access to dot files'
            }
        ],
        record: {
            allow_uploads: 5,
            compress_response: 2,
            protect_system_files: true
        }
    },
    access: {
        name: 'access',
        fields: [
            {
                name: 'Allow From',
                type: 'text',
                html: {
                    attr: 'placeholder="127.0.0.1, 192.168.1.0/24"'
                }
            }
        ]
    },
    cache: {
        name: 'cache',
        fields: [
            {
                name: 'cache_static',
                type: 'int',
                html: {
                    attr: 'class="int"',
                    caption: 'Cache static files (months)'
                }
            },
            {
                name: 'open_files_cache',
                type: 'int',
                html: {
                    attr: 'class="int"',
                    caption: 'Open files to cache'
                }
            },
        ],
        record: {
            cache_static: 12,
            open_files_cache: 300

        }
    },
    system: {
        name: 'system',
        fields: [
            {
                name: 'nginx_user',
                type: 'text',
                html: {
                    caption: 'Nginx user'
                }
            },
            {
                name: 'nice',
                type: 'int',
                html: {
                    attr: 'class="int"',
                    caption: 'Process priority'
                },
                hint: 'Use values from -19 to 20. Lower means higher priority.'
            },
        ],
        record: {
            nginx_user: 'www-data',
            nice: 0
        }
    },
    php: {
        name: 'php',
        fields: [
            {
                name: 'exec_php',
                type: 'checkbox',
                html: {
                    caption: 'Execute PHP scripts'
                }
            },
            {
                name: 'cache_php_validity',
                type: 'int',
                html: {
                    caption: 'Cache PHP response (hours)',
                    attr: 'class="int"'
                },
                hint: 'Zero means disabled'
            },
            {
                name: 'cache_php_min',
                type: 'int',
                html: {
                    caption: 'Minimum requests to cache',
                    attr: 'class="int"'
                }
            },
            {
                name: 'php_custom_errors',
                type: 'text',
                html: {
                    caption: 'Custom error pages',
                    attr: 'placeholder="404, 403, 503, 5xx"'
                },
                hint: 'Each matched error response would be handled by a respective html page (e.g. 404.html, 5xx.html etc.)'
            }
        ],
        record: {
            exec_php: true,
            cache_php_validity: 0,
            cache_php_min: 3
        }
    },
    methods: {
        name: 'methods',
        fields: [
            {
                name: 'method_head',
                type: 'checkbox',
                html: {
                    caption: 'HEAD'
                }
            },
            {
                name: 'method_get',
                type: 'checkbox',
                html: {
                    caption: 'GET'
                }
            },
            {
                name: 'method_post',
                type: 'checkbox',
                html: {
                    caption: 'POST'
                }
            },
            {
                name: 'method_options',
                type: 'checkbox',
                html: {
                    caption: 'OPTIONS'
                }
            },
            {
                name: 'method_delete',
                type: 'checkbox',
                html: {
                    caption: 'DELETE'
                }
            },
            {
                name: 'method_put',
                type: 'checkbox',
                html: {
                    caption: 'PUT'
                }
            },
            {
                name: 'method_trace',
                type: 'checkbox',
                html: {
                    caption: 'TRACE'
                }
            },
            {
                name: 'method_connect',
                type: 'checkbox',
                html: {
                    caption: 'CONNECT'
                }
            }
        ],
        record: {
            method_head: true,
            method_get: true,
            method_post: true,
            method_options: true,
            method_delete: false,
            method_put: false,
            method_trace: false,
            method_connect: false
        }
    },
    logs: {
        name: 'logs',
        fields: [
            {
                name: 'log_bots',
                type: 'checkbox',
                html: {
                    caption: 'Log bots'
                }
            },
            {
                name: 'log_static',
                type: 'checkbox',
                html: {
                    caption: 'Log static requests'
                }
            },
            {
                name: 'log_dynamic',
                type: 'checkbox',
                html: {
                    caption: 'Log dynamic requests'
                }
            },
            {
                name: 'flush_every_amount',
                type: 'int',
                html: {
                    caption: 'Flush every (kbs)',
                    attr: 'class="int"'
                }
            },
            {
                name: 'flush_every_time',
                type: 'int',
                html: {
                    caption: 'Flush every (minutes)',
                    attr: 'class="int"'
                }
            },
            {
                name: 'log_compress',
                type: 'int',
                html: {
                    caption: 'Log compression level',
                    attr: 'class="int"'
                }
            },
            {
                name: 'error_level',
                type: 'list',
                html: {
                    caption: 'Error log level'
                },
                options:
                        {
                            items: [
                                {text: 'Debug', value: 0},
                                {text: 'Info', value: 1},
                                {text: 'Notice', value: 2},
                                {text: 'Warn', value: 3},
                                {text: 'Error', value: 4},
                                {text: 'Crit', value: 5},
                                {text: 'Alert', value: 6},
                                {text: 'Emerg', value: 7}
                            ],
                            showNone: false
                        }
            },
        ],
        record: {
            log_bots: true,
            log_static: false,
            log_dynamic: true,
            flush_every_amount: 32,
            flush_every_time: 5,
            log_compress: 0,
            error_level: 4
        }
    },
    limits: {
        name: 'limits',
        fields: [
            {
                name: 'connections_ip',
                type: 'int',
                html: {
                    caption: 'Connections per IP',
                    attr: 'class="int"'
                }
            },
            {
                name: 'normal_rps',
                type: 'int',
                html: {
                    caption: 'Normal requests per second',
                    attr: 'class="int"'
                }
            },
            {
                name: 'max_rps',
                type: 'int',
                html: {
                    caption: 'Maximum requests per second',
                    attr: 'class="int"'
                }
            },
            {
                name: 'slowdown_rps',
                type: 'checkbox',
                html: {
                    caption: 'Slow down excess requests'
                }
            }
        ],
        record: {
            connections_ip: 10,
            normal_rps: 20,
            max_rps: 100,
            slowdown_rps: true
        }
    },
    timeouts: {
        name: 'timeouts',
        fields: [
            {
                name: 'keepalive_reuse',
                type: 'int',
                html: {
                    caption: 'Wait for keepalive reuse',
                    attr: 'class="int"'
                }
            },
            {
                name: 'backed_timeout',
                type: 'int',
                html: {
                    caption: 'Wait for backend to generate page',
                    attr: 'class="int"'
                }
            },
            
        ],
        record: {
            keepalive_reuse: 5,
            backed_timeout: 10
        }
    },
    generate: {
        name: 'generate'
    }
};

$(function() {
    $('#main').w2layout(config.layout);
    w2ui.layout.content('left', $().w2sidebar(config.sidebar));
    w2ui.layout.content('main', $().w2form(config.server));
    w2ui.layout.content('bottom', $('#generate').w2form(config.generate));
    
    w2ui.layout.on('*', function() {
        jQuery.each(w2ui.layout.panels[1].content.fields, function(key, field) {
            $(field.el).off('hover');
            $(field.el).hover(function(e) {
                field.hint && $(e.target).w2tag(field.hint);
            }, function(e) {
                $(e.target).w2tag();
            });
        });
    });

    $().w2form(config.access);
    $().w2form(config.basic);
    $().w2form(config.cache);
    $().w2form(config.system);
    $().w2form(config.php);
    $().w2form(config.methods);
    $().w2form(config.logs);
    $().w2form(config.limits);
    $().w2form(config.timeouts);
});