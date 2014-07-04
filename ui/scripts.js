$(function() {
    $.getJSON('/generate.php', function(values, result) {
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
                    {id: 'php', text: 'Php', img: 'icon-php'},
                    {id: 'methods', text: 'Methods', img: 'icon-methods'},
                    {id: 'logs', text: 'Logs', img: 'icon-logs'},
                    {id: 'limits', text: 'Limits', img: 'icon-limits'},
                    {id: 'timeouts', text: 'Timeouts', img: 'icon-timeouts'}
                ],
                onClick: function(event) {
                    w2ui.layout.content('main', w2ui[event.target]);
                    onLayoutRendered(event.target);

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
                            attr: 'placeholder="test.com"'
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
                    /*{
                     name: 'http_port',
                     type: 'int',
                     hint: 'Port to use',
                     html: {
                     attr: 'maxlength="8" class="int"',
                     caption: 'Http port'
                     }
                     },*/
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
                    //http_port: values.http_port,
                    support_https: values.support_https,
                    ssl_cert: values.ssl_cert,
                    ssl_key: values.ssl_key,
                    root_dir: values.root_dir,
                    server_name: values.server_name
                }
            },
            basic: {
                name: 'basic',
                fields: [{
                        name: 'max_upload_size',
                        type: 'float',
                        html: {
                            attr: 'maxlength="8" class="int"',
                            caption: 'Max upload file size (Mbs)'
                        },
                        hint: 'Use zero for default value'
                    },
                    {
                        name: 'compress_response',
                        type: 'list',
                        options:
                                {
                                    items: [
                                        {text: "Don't compress", value: 0},
                                        {text: 1, value: 1},
                                        {text: 2, value: 2},
                                        {text: 3, value: 3},
                                        {text: 4, value: 4},
                                        {text: 5, value: 5},
                                        {text: 6, value: 6},
                                        {text: 7, value: 7},
                                        {text: 8, value: 8},
                                        {text: 9, value: 9}
                                    ],
                                    showNone: false
                                },
                        html: {
                            caption: 'Response compression level'
                        },
                        hint: 'Choose 0 to disable gzip compression'
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
                    max_upload_size: values.max_upload_size,
                    compress_response: values.compress_response,
                    protect_system_files: values.protect_system_files
                }
            },
            access: {
                name: 'access',
                fields: [
                    {
                        name: 'allow_from',
                        type: 'text',
                        html: {
                            caption: 'Allow from',
                            attr: 'placeholder="127.0.0.1, 192.168.1.0/24"'
                        },
                        hint: 'You can specify several using commas'
                    }
                ]
            },
            php: {
                name: 'php',
                fields: [
                    {
                        name: 'use_php',
                        type: 'checkbox',
                        html: {
                            caption: 'Execute Php scripts'
                        },
                        hint: 'Turns off Php processing and restricts access to php scripts'
                    },
                    {
                        name: 'cache_php_validity',
                        type: 'int',
                        html: {
                            caption: 'Cache PHP response (hours)',
                            attr: 'class="float"'
                        },
                        hint: 'Zero means php caching is disabled'
                    },
                    {
                        name: 'cache_php_min',
                        type: 'int',
                        html: {
                            caption: 'Minimum requests for caching',
                            attr: 'class="int"'
                        },
                        hint: 'Uri will be cached after that number of requests'
                    },
                    {
                        name: 'php_custom_errors',
                        type: 'text',
                        html: {
                            caption: 'Custom error pages',
                            attr: 'placeholder="404, 403, 503, 5xx"'
                        },
                        hint: 'Each matched error response would be handled by a respective html page (e.g. 404.html, 5xx.html etc.)'
                    },
                    {
                        name: 'connections_ip_php',
                        type: 'int',
                        html: {
                            caption: 'Connections per IP',
                            attr: 'class="int"'
                        },
                        hint: 'More connections from a single IP will cause 503'
                    },
                    {
                        name: 'normal_rps_php',
                        type: 'int',
                        html: {
                            caption: 'Normal requests per second',
                            attr: 'class="int"'
                        },
                        hint: 'Requests with a speed up until that number will not be restricted'
                    },
                    {
                        name: 'max_rps_php',
                        type: 'int',
                        html: {
                            caption: 'Maximum requests per second',
                            attr: 'class="int"'
                        },
                        hint: 'Excess requests per second that are still handled but optionally slowed down to keep normal rps rate. Heigher rate would case 503'
                    },
                    {
                        name: 'slowdown_rps_php',
                        type: 'checkbox',
                        html: {
                            caption: 'Slow down excess requests'
                        },
                        hint: 'Slow down excess requests to keep normal rps rate'
                    }
                ],
                record: {
                    use_php: values.use_php,
                    cache_php_validity: values.cache_php_validity,
                    cache_php_min: values.cache_php_min,
                    connections_ip_php: values.connections_ip_php,
                    normal_rps_php: values.normal_rps_php,
                    max_rps_php: values.max_rps_php,
                    slowdown_rps_php: values.slowdown_rps_php
                }
            },
            methods: {
                name: 'methods',
                fields: [
                    {
                        name: 'method_options',
                        type: 'checkbox',
                        html: {
                            caption: 'OPTIONS'
                        },
                        hint: 'Returns the HTTP methods that the server supports for the specified URL'
                    },
                    {
                        name: 'method_get',
                        type: 'checkbox',
                        html: {
                            caption: 'GET'
                        },
                        hint: 'Requests a representation of the specified resource. Requests using GET should only retrieve data and should have no other effect.'
                    },
                    {
                        name: 'method_head',
                        type: 'checkbox',
                        html: {
                            caption: 'HEAD'
                        },
                        hint: 'Asks for the response identical to the one that would correspond to a GET request, but without the response body.'
                    },
                    {
                        name: 'method_post',
                        type: 'checkbox',
                        html: {
                            caption: 'POST'
                        },
                        hint: 'Requests that the server accept the entity enclosed in the request as a new subordinate of the web resource identified by the URI.'
                    },
                    {
                        name: 'method_put',
                        type: 'checkbox',
                        html: {
                            caption: 'PUT'
                        },
                        hint: 'Requests that the enclosed entity be stored under the supplied URI'
                    },
                    {
                        name: 'method_patch',
                        type: 'checkbox',
                        html: {
                            caption: 'PATCH'
                        },
                        hint: 'Is used to apply partial modifications to a resource'
                    },
                    {
                        name: 'method_delete',
                        type: 'checkbox',
                        html: {
                            caption: 'DELETE'
                        },
                        hint: 'Deletes the specified resource'
                    },
                    {
                        name: 'method_trace',
                        type: 'checkbox',
                        html: {
                            caption: 'TRACE'
                        },
                        hint: 'Echoes back the received request so that a client can see what (if any) changes or additions have been made by intermediate servers'
                    },
                    {
                        name: 'method_connect',
                        type: 'checkbox',
                        html: {
                            caption: 'CONNECT'
                        },
                        hint: 'Converts the request connection to a transparent TCP/IP tunnel'
                    }
                ],
                record: {
                    method_options: values.method_options,
                    method_get: values.method_get,
                    method_head: values.method_head,
                    method_post: values.method_post,
                    method_put: values.method_put,
                    method_patch: values.method_patch,
                    method_delete: values.method_delete,
                    method_trace: values.method_trace,
                    method_connect: values.method_connect
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
                        },
                        hint: 'Bots are logged to a separate file or not logged at all'
                    },
                    {
                        name: 'log_humans',
                        type: 'checkbox',
                        html: {
                            caption: 'Log humans'
                        },
                        hint: 'Store requests from humans to documents. Images, scripts and other assets are not logged'
                    },
                    {
                        name: 'flush_every_amount',
                        type: 'int',
                        html: {
                            caption: 'Flush every (kbs)',
                            attr: 'class="int"'
                        },
                        hint: 'Do not write logs to disk until there\'s a selecte amount of log data to write'
                    },
                    {
                        name: 'flush_every_time',
                        type: 'float',
                        html: {
                            caption: 'Flush every (minutes)',
                            attr: 'class="int"'
                        },
                        hint: 'Write log data every that amount of minutes'
                    },
                    {
                        name: 'log_compress',
                        type: 'list',
                        options:
                                {
                                    items: [
                                        {text: "Don't compress", value: 0},
                                        {text: 1, value: 1},
                                        {text: 2, value: 2},
                                        {text: 3, value: 3},
                                        {text: 4, value: 4},
                                        {text: 5, value: 5},
                                        {text: 6, value: 6},
                                        {text: 7, value: 7},
                                        {text: 8, value: 8},
                                        {text: 9, value: 9}
                                    ],
                                    showNone: false
                                },
                        html: {
                            caption: 'Log compression level'
                        },
                        hint: 'Write compressed data (readable by zless, zcat etc.)'
                    },
                    {
                        name: 'error_level',
                        type: 'list',
                        html: {
                            caption: 'Error log level'
                        },
                        hint: 'Sets errog log verbosoty',
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
                    }
                ],
                record: {
                    log_bots: values.log_bots,
                    log_humans: values.log_humans,
                    flush_every_amount: values.flush_every_amount,
                    flush_every_time: values.flush_every_time,
                    log_compress: values.log_compress,
                    error_level: values.error_level
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
                        },
                        hint: 'More connections from a single IP will cause 503'
                    },
                    {
                        name: 'normal_rps',
                        type: 'int',
                        html: {
                            caption: 'Normal requests per second',
                            attr: 'class="int"'
                        },
                        hint: 'Requests with a speed up until that number will not be restricted'
                    },
                    {
                        name: 'max_rps',
                        type: 'int',
                        html: {
                            caption: 'Maximum requests per second',
                            attr: 'class="int"'
                        },
                        hint: 'Excess requests per second that are still handled but optionally slowed down to keep normal rps rate. Heigher rate would case 503'
                    },
                    {
                        name: 'slowdown_rps',
                        type: 'checkbox',
                        html: {
                            caption: 'Slow down excess requests'
                        },
                        hint: 'Slow down excess requests to keep normal rps rate'
                    }
                ],
                record: {
                    connections_ip: values.connections_ip,
                    normal_rps: values.normal_rps,
                    max_rps: values.max_rps,
                    slowdown_rps: values.slowdown_rps
                }
            },
            timeouts: {
                name: 'timeouts',
                fields: [
                    {
                        name: 'backend_timeout',
                        type: 'int',
                        html: {
                            caption: 'Wait for Php response (seconds)',
                            attr: 'class="int"'
                        }, 
                        hint: 'If Php takes longer that this, connection is closed with 504'
                    }
                ],
                record: {
                    backend_timeout: values.backend_timeout
                }
            },
            generate: {
                name: 'generate',
                actions: {
                    "generate_button": function() {
                        $.ajax({
                            url: '/generate.php',
                            data: values,
                            success: function() {
                                $('<form/>')
                                        .attr('action', 'http://' + values.server_name)
                                        .attr('target', '_blank')
                                        .attr('method', 'get')
                                        .appendTo('body')
                                        .submit()
                                        .remove();
                            },
                            error: function() {
                                console.log(arguments);
                            }
                        });
                    },
                    "download_button": function() {
                        values.download = 1;
                        location = '/generate.php?' + $.param(values);
                    }
                }
            }
        };

        $('#main').w2layout(config.layout);

        w2ui.layout.content('left', $().w2sidebar(config.sidebar));
        w2ui.layout.content('main', $().w2form(config.server));
        w2ui.layout.content('bottom', $('#generate').w2form(config.generate));

        $().w2form(config.access);
        $().w2form(config.basic);
        $().w2form(config.php);
        $().w2form(config.methods);
        $().w2form(config.logs);
        $().w2form(config.limits);
        $().w2form(config.timeouts);

        function onLayoutRendered(targetLayout) {
            jQuery.each(w2ui[targetLayout].fields, function(key, field) {
                if ($(field).attr('type') === 'checkbox') {
                    $(field.el).click(function() {
                        values[$(this).prop('id')] = $(this).prop('checked') ? 1 : 0;
                    });
                } else {
                    $(field.el).bind('input', function() {
                        values[$(this).prop('id')] = $(this).val();
                    });
                }
            });

            jQuery.each(w2ui.layout.panels[1].content.fields, function(key, field) {
                $(field.el).hover(function(e) {
                    field.hint && $(e.target).w2tag(field.hint);
                }, function(e) {
                    $(e.target).w2tag();
                });
            });
        }

        onLayoutRendered('server');
    });

    if (location.port !== 80 && location.port !== '') {
        $('#generate_button').prop('disabled', false);
    }
});
