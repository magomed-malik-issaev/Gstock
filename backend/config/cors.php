<?php

return [
    'paths' => ['api/*'],
    'allowed_origins' => ['http://localhost:5173', 'http://localhost:5174'],
    'allowed_methods' => ['*'],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
