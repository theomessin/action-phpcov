#!/bin/bash
set -eu pipefail
php -dpcov.enabled=1 ./vendor/bin/phpunit --coverage-text