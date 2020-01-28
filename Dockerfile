FROM php:7.4-alpine

# Github action volume mount.
VOLUME [ "/github/home" ]

# Install some alpine system dependencies.
RUN apk add --no-cache autoconf bash build-base

# Install and enable pcov for coverage.
RUN pecl install pcov && docker-php-ext-enable pcov

# Install Composer from: https://hub.docker.com/_/composer
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Install nodejs and npm, as well as surge.sh 
RUN apk add --no-cache  nodejs npm && npm install --global surge

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]