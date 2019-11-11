# SpaceBas eTemplate Drupal Composer Pantheon

These badges need rebuilding:

[![CircleCI](https://circleci.com/gh/spacebase/spacebasepantheon.svg?style=shield)](https://circleci.com/gh/spacebase/spacebasepantheon)
[![Pantheon example-drops-8-composer](https://img.shields.io/badge/dashboard-drops_8-yellow.svg)](https://dashboard.pantheon.io/sites/c401fd14-f745-4e51-9af2-f30b45146a0c#dev/code)
[![Dev Site example-drops-8-composer](https://img.shields.io/badge/site-drops_8-blue.svg)](http://dev-example-drops-8-composer.pantheonsite.io/)


This repository merges SpaceBase code for a Drupal-based community website with
Pantheon's tools for integrating GitHub, Circle CI and Pantheon hosting. It is
intended to allow you to launch a useable and extendible demo site of the
SpaceBase code on Pantheon servers, with a good basic development workflow,
very quickly and largely cut-and-paste. 

Please follow the "Quick Start" below — this repository should be cloned using
Terminus, not `git clone.`


## Goals and Key Resources

SpaceBase is a website for communities to collaborate  on local content, and impact programs, and reports. The original site is https://SpaceBase.co

Within your community, internal groups will have their own presence, own resources and members.

We hope to make this very quickly available to anyone who’d like to use it: this repository aims to help you launch on a Pantheon test server with your own GitHub repository and a functional development workflow, right now, just by creating some accounts and cut-and-pasting commands.

History: The code is not locked to Pantheon, GitHub or CircleCI — SpaceBase started with GitLab, Platform.sh and Lando.

#### The resources we used:

https://pantheon.io/docs/guides/drupal-8-commerce = Tutorial showing how to use Pantheon’s template to create a Drupal site on Pantheon, creating your own GitHub repsitory linked to your Pantheon site via Circle CI. For our public site generation, we’re trying to get the same thing to happen with a template we maintain.
https://pantheon.io/docs/migrate-manual  Used to integrate our code and Pantheon code, while keeping our git history.


## Quick Start 

### Step 1: Create accounts and get access tokens. [ Easy / setup ]
In this step you will create accounts on Pantheon.io, Github.com, and CircleCI, getting access tokens and installing Composer and Pantheon’s terminus.


https://pantheon.io/docs/guides/build-tools#before-you-begin 

This should guide you to install composer (there is an easier set of instructions for mac users here); install Terminus; add your SSH public key to Pantheon; get keys for CircleCI and GitHub.

Once you have the access tokens, enter them into your shell/terminal window:

```
export GITHUB_TOKEN= yourtoken
export CIRCLE_TOKEN=yourtoken
export SITENAME=choose-your-sitename
```
(Avoid capitals!)

### Step 2:  Create Your SpaceBase Clone [Cut & Paste, hopefully]


#### Use `terminus` to clone our repository onto Pantheon so you can launch your Drupal site.

`terminus build:project:create --stability dev spacebase/spacebasepantheon $SITENAME`

That command should do a lot: create a new GitHub repository and a new Pantheon demo site, integrated by CircleCI. (If not, run again with option  `-vvv` to debug.)


#### Load the database at Pantheon and start using Drupal [ Easy Drupal ]

We have a demo database here:
http://demo1.spacebase.co/dumpfile_less_content.sql
@ToDy: further prep demo1 content.

Import our database either in in Pantheon panel, or try terminus (we had problems w/ command line):
terminus import:database $SITENAME.dev http://demo1.spacebase.co/dumpfile_less_content.sql

Possibly useful commands:
terminus drush $SITENAME.dev cr
terminus drush $SITENAME.dev uli

You’ve now got your working copy of the SpaceBase distribution. 

PS: On GitHub, the top of the README.md should have your CircleCI, Pantheon dashboard and site (“dev” at Pantheon, use Pantheon tools to make it live.)

So far you’ve created a new github repository in your personal account based on the config you exported into the shell, AND fired up a site at Pantheon. To do further work, you  need to clone your site on GitHub to a local environment.

#### Clone, edit, commit, push — and CircleCI   [ Drupal devel and Git ]

To create a working localhost, clone your new repository that terminus created for you on GitHub (not on our template!)

You can get that code running however you prefer on your localhost — or ignore localhost if you are simply checking out our site on a Pantheon demo. Make changes, commit, push to GitHub master branch— and then CircleCI is already set up to move your changes to Pantheon.

### Local Development with Lando [Optional]

Bonus:  We used lando as our local dev environment. If you’d like to, we left the .lando.yml file for easy set up:

Install lando: https://docs.lando.dev/basics/installation.html

cd web/sites/default
cp settings.lando.php settings.local.php
lando start
curl -O  http://demo1.spacebase.co/dumpfile_less_content.sql
	(Or perhaps this will have moved … get the current database file.)
lando db-import dumpfile_less_content.sql

Now you should have a local development environment that upgrades your code via
CircleCI whenever you push your master branch to origin at Github. Have fun!


#### Commands we found useful

COMPOSER_MEMORY_LIMIT=-1 composer update



## Workflow and hosting implementation

(See: https://pantheon.io/docs/guides/drupal-8-commerce )

This repository is a reference implementation and start state for a modern Drupal 8 workflow utilizing [Composer](https://getcomposer.org/), Continuous Integration (CI), Automated Testing, and Pantheon. Even though this is a good starting point, you will need to customize and maintain the CI/testing set up for your projects — and are welcome to change who you use as your host or CI/testing provider.

This repository is meant to be copied one-time by the the [Terminus Build Tools Plugin](https://github.com/pantheon-systems/terminus-build-tools-plugin) but can also be used as a template [as this repository uses https://github.com/pantheon-systems/example-drops-8-composer/ as a template.] It should not be cloned or forked directly.

The Terminus Build Tools plugin will scaffold a new project, including:

* A Git repository
* A free Pantheon sandbox site
* Continuous Integration configuration/credential set up

For more details and instructions on creating a new project, see the [Terminus Build Tools Plugin](https://github.com/pantheon-systems/terminus-build-tools-plugin/).


## Important files and directories

### `/web`

Pantheon will serve the site from the `/web` subdirectory due to the configuration in `pantheon.yml`. This is necessary for a Composer based workflow. Having your website in this subdirectory also allows for tests, scripts, and other files related to your project to be stored in your repo without polluting your web document root or being web accessible from Pantheon. They may still be accessible from your version control project if it is public. See [the `pantheon.yml`](https://pantheon.io/docs/pantheon-yml/#nested-docroot) documentation for details.

Other hosts such as Platform.sh can work with this configuration too.

#### `/config`

One of the directories moved to the git root is `/config`. This directory holds Drupal's `.yml` configuration files. In more traditional repo structure these files would live at `/sites/default/config/`. Thanks to [this line in `settings.php`](https://github.com/pantheon-systems/example-drops-8-composer/blob/54c84275cafa66c86992e5232b5e1019954e98f3/web/sites/default/settings.php#L19), the config is moved entirely outside of the web root.


### `composer.json`
This project uses Composer to manage third-party PHP dependencies.

The `require` section of `composer.json` should be used for any dependencies your web project needs, even those that might only be used on non-Live environments. All dependencies in `require` will be pushed to Pantheon.

The `require-dev` section should be used for dependencies that are not a part of the web application but are necesarry to build or test the project. Some example are `php_codesniffer` and `phpunit`. Dev dependencies will not be deployed to Pantheon.

If you are just browsing this repository on GitHub, you may not see some of the directories mentioned above. That is because Drupal core and contrib modules are installed via Composer and ignored in the `.gitignore` file.

SpaceBase's custom Drupal configuration is used as the source for Drupal core.

Third party Drupal dependencies, such as contrib modules, are added to the project via `composer.json`. The `composer.lock` file keeps track of the exact version of dependency. [Composer `installer-paths`](https://getcomposer.org/doc/faqs/how-do-i-install-a-package-to-a-custom-path-for-my-framework.md#how-do-i-install-a-package-to-a-custom-path-for-my-framework-) are used to ensure the Drupal dependencies are downloaded into the appropriate directory.

Non-Drupal dependencies are downloaded to the `/vendor` directory.


### `.ci`
This `.ci` directory is where all of the scripts that run on Continuous Integration are stored. Provider specific configuration files, such as `.circle/config.yml` and `.gitlab-ci.yml`, make use of these scripts.

The scripts are organized into subdirectories of `.ci` according to their function: `build`, `deploy`, or `test`.

#### Build Scripts `.ci/build`
Steps for building an artifact suitable for deployment. Feel free to add other build scripts here, such as installing Node dependencies, depending on your needs.

- `.ci/build/php` installs PHP dependencies with Composer

#### Build Scripts `.ci/deploy`
Scripts for facilitating code deployment to Pantheon.

- `.ci/deploy/pantheon/create-multidev` creates a new [Pantheon multidev environment](https://pantheon.io/docs/multidev/) for branches other than the default Git branch
  - Note that not all users have multidev access. Please consult [the multidev FAQ doc](https://pantheon.io/docs/multidev-faq/) for details.
- `.ci/deploy/pantheon/dev-multidev` deploys the built artifact to either the Pantheon `dev` or a multidev environment, depending on the Git branch

#### Automated Test Scripts `.ci/tests`
Scripts that run automated tests. Feel free to add or remove scripts here depending on your testing needs.

**Static Testing** `.ci/test/static` and `tests/unit`
Static tests analyze code without executing it. It is good at detecting syntax error but not functionality.

- `.ci/test/static/run` Runs [PHP CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) with [Drupal coding standards](https://www.drupal.org/project/coder), PHP Unit, and [PHP syntax checking](https://www.php.net/manual/en/function.php-check-syntax.php).
- `tests/unit/bootstrap.php` Bootstraps the Composer autoloader
- `tests/unit/TestAssert.php` An example Unit test. Project specific test files will need to be created in `tests/unit`.

**Visual Regression Testing** `.ci/test/visual-regression`
Visual regression testing uses a headless browser to take screenshots of web pages and compare them for visual differences.


- `.ci/test/visual-regression/run` Runs [BackstopJS](https://github.com/garris/BackstopJS) visual regression testing.
- `.ci/test/visual-regression/backstopConfig.js` The [BackstopJS](https://github.com/garris/BackstopJS) configuration file. Setting here will need to be updated for your project. For example, the `pathsToTest` variable determines the URLs to test.

**Behat Testing** `.ci/test/behat` and `tests/behat`
[Behat](http://behat.org/en/latest/) is an acceptance/end-to-end testing framework written in PHP. It faciliates testing the fully built Drupal site on Pantheon infrastucture. [The Drupal Behat Extension](https://www.drupal.org/project/drupalextension) is used to help with integrating Behat and Drupal.


Note: SpaceBase used Behat testing at Platform.sh and relevant code is
included here, but at the initial launch we haven't retested this. These notes
here in the ReadMe are from Pantheon's setup.


- `.ci/test/behat/initialize` creates a backup of the environment to be tested
- `.ci/test/behat/run` sets the `BEHAT_PARAMS` environment variable with dynamic information necessary for Behat and configure it to use Drush via [Terminus](https://pantheon.io/docs/terminus/) and starts headless Chrome, and runs Behat
- `.ci/test/behat/cleanup` restores the previously made database backup and saves screenshots taken by Behat
- `tests/behat/behat-pantheon.yml` Behat configuration file compatible with running tests against a Pantheon site
- `tests/behat/tests/behat/features` Where Behat test files, with the `.feature` extension, should be stored. The provided example tests will need to be replaced with project specific tests.
  - `tests/behat/tests/behat/features/content.feature` A Behat test file which logs into the Drupal dashboard, creates nodes, users and terms, and verifies their existience in the Drupal admin interface and the front end of the site


## Updating your Pantheon site

When using this repository to manage your Drupal site, you will no longer use the Pantheon dashboard to update your Drupal version. Instead, you will manage your updates using Composer. Ensure your site is in Git mode, clone it locally, and then run composer commands from there.  Commit and push your files back up to Pantheon as usual.


## Overal approach to Drupal setup

We use composer as much as possible and aim for the standard approaches, with a /web directory. 

The /web/sites/default contains a settings.php file based on Pantheon that
includes settings.pantheon.php. It references but does not include
a settings.local.php file. It does include settings.lando.php which lets us use
Lando as our local development. Our repository also includes our older
settings.platformsh.php which we no longer use, but might be useful if you
choose Platform.sh as your web host.

## Not using Pantheon and Github?

SpaceBase was originally developed using GitLab and Platform.sh

Please have a look at https://gitlab.com/spacebase/spacebase/wikis/Local-environment-setup when setting up this codebase for the first time.

It is very closely based on the [Drupal Composer project](https://github.com/drupal-composer/drupal-project).


Note the [`.platform.app.yaml`](/.platform.app.yaml) file and the [`.platform`](/.platform) directory — at least for now we may keep these extra files in the new repository.


Also see:

* [`settings.platformsh.php`](/web/sites/default/settings.platformsh.php) - This file contains Platform.sh-specific code to map environment variables into Drupal configuration.  You can add to it as needed.  See [the documentation](https://docs.platform.sh/frameworks/drupal8.html) for more examples of common snippets to include here.
* [`scripts/platformsh`](/scripts/platformsh) - This directory contains our update script to keep this repository in sync with the Drupal Composer project.  It may be safely ignored or removed.

## Tutorial: Managing a Drupal site built with Composer

Nothing is easier than managing a Composer-based Drupal site on Platform.sh. See [Drupal 8 and Composer](https://docs.platform.sh/frameworks/drupal8.html) for details. For example adding a single module to your Drupal installation is as simple as:

```sh
composer require drupal/devel
git commit -am 'Add the Devel module'
git push
```

## How does this starter kit differ from vanilla Drupal from Drupal.org?

1. The `vendor` directory (where non-Drupal code lives) and the `config` directory
   (used for syncing configuration from development to production) are outside
   the web root. This is a bit more secure as those files are now not web-accessible.

2. The `settings.php` and `settings.platformsh.php` files are provided by
   default. The `settings.platformsh.php` file automatically sets up the database connection on Platform.sh, and allows controlling Drupal configuration from environment variables.

