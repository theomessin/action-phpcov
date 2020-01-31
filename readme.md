## PHPCov GitHub Action

This action will produce a PHPUnit coverage HTML report, publish it using ZEIT Now, and enforce a minimum coverage level.

### Inputs

**`now_token`** __(required)__ Your ZEIT Now token - used to deploy reports.

**`now_project`** _(optional)_ Which ZEIT Now project to deploy reports to.

**`min_coverage`** _(optional)_ The minimum coverage to enforce (default is `50`).

**`path`** _(optional)_ Relative path under $GITHUB_WORKSPACE to run PHPUnit.

### Outputs

**`url`** The deployment URL from ZEIT Now with the coverage report.

### Example usage

Here's how to use this action on a PHP project such as Laravel.
Assuming your repo has a `NOW_TOKEN` secret with your ZEIT Now token, 
all you have to do is set up PHP (with a coverage driver), 
as well as install composer dependencies.

```yml
on: [push]

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: shivammathur/setup-php@master
      with:
        coverage: pcov
        php-version: '7.4'
        extension: dom, fileinfo, mbstring
    - run: |
        composer install --no-suggest --prefer-dist --optimize-autoloader
        php -r "file_exists('.env') || copy('.env.example', '.env');"
        php artisan key:generate
    - uses: theomessin/action-phpcov
      with:
        min_coverage: 35
        now_project: "action-phpcov"
        now_token: ${{ secrets.NOW_TOKEN }}
```

This will output a message such as this:

```
PHPUnit 8.5.2 by Sebastian Bergmann and contributors.

Example (Tests\Unit\Example)
 ✔ Basic test

Example (Tests\Feature\Example)
 ✔ Basic test

Time: 160 ms, Memory: 18.00 MB

OK (2 tests, 2 assertions)

Generating code coverage report in Clover XML format ... done [10 ms]

Generating code coverage report in HTML format ... done [20 ms]

[Actual coverage is 44.23%. Minimum coverage is 35%]
▰▰▰▰▰▰▰▰▰▰▰▰▰▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱
You may find a full coverage report here:
https://action-phpcov-5h6g7y19k.now.sh
```

If the minimum coverage is not met, the action with fail.
