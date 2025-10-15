
FROM composer:2 AS vendor

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --no-scripts \
    --no-plugins \
    --no-autoloader

FROM php:8.3-fpm-alpine AS app

WORKDIR /var/www/html

RUN apk add --no-cache \
        bash \
        curl \
        libzip \
        libpng \
        freetype \
        libjpeg-turbo \
        oniguruma \
        libxml2 \
    && apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        libzip-dev \
        libpng-dev \
        freetype-dev \
        libjpeg-turbo-dev \
        oniguruma-dev \
        libxml2-dev \
        curl-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        bcmath \
        gd \
        zip \
        mbstring \
        curl \
        opcache \
    && docker-php-ext-enable opcache \
    && apk del .build-deps \
    && rm -rf /tmp/* /var/cache/apk/*

COPY --from=vendor /usr/bin/composer /usr/bin/composer

COPY --from=vendor /app/vendor ./vendor

COPY . .

RUN composer dump-autoload --optimize --no-interaction \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 9000
