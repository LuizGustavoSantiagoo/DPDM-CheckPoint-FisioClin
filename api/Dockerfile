FROM php:8.2-cli

# Instalar dependências
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring zip bcmath

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copiar arquivos
COPY . .

# Instalar dependências Laravel
RUN composer install --no-dev --optimize-autoloader

# Permissões
RUN chmod -R 777 storage bootstrap/cache

# Railway usa a variável PORT automaticamente
ENV PORT=8000

# Comando principal (SEM NGINX, SEM PHP-FPM)
CMD php artisan migrate --force \
    && php artisan serve --host=0.0.0.0 --port=${PORT}
