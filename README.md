This repository contains all of the templates, configuration, etc. for the UXF website to run on Craft CMS.

## Useful implementation notes

### Craft Plugin
There is one custom plugin which makes working with the version tree easier. It adds the `latestApproved` twig filter. Pass an array of versions for a single component and it will return the latest approved entry.

### Twig notes

#### Checking for defined properties
Use `object['prop'] is defined` vs `object.prop is defined`.

#### Creating absolute urls
Use `{{ siteUrl }}desired/path/` (note no slash immediately after the base url).

For entries just use `{{ entry.url }}` which already contains the base.

## Deploying Craft updates

1. Make any changes to the templates, etc. Commit to the git repo.

2. Run `git push live master`

## Syncing database changes

Any control panel settings will be stored in the database. We use the production server as the canonical source for DB settings. You can sync them back to a local dev environment by running the following command:

```
./scripts/pull_db.sh
```

The production server will also serve as the canonical source for assets, which can be pulled down to local by running:

```
./scripts/pull_assets.sh
```

Reference: https://nystudio107.com/blog/database-asset-syncing-between-environments-in-craft-cms

## Third party services

### Mailgun
A free mailgun account is used to send account activation emails. It is connected through SMTP.

## Backing up the instance

For now we are using Digital Ocean backups. In the future it would be worth setting up the Craft Scripts thing to automatically backup to S3 or something.

Reference: https://nystudio107.com/blog/mitigating-disaster-via-website-backups  
Reference: https://github.com/nystudio107/craft-scripts

## Configuring the Digital Ocean droplet

1. Create a LAMP on 16.04 One-click app.
2. Choose the desired size.
3. Recommend configuring an SSH key.
4. SSH into the droplet and install dependencies:

  ```
  sudo apt-get update
  sudo apt-get install php-mbstring php-mcrypt php-curl php-xml npm nodejs-legacy
  sudo systemctl restart apache2
  ```

5. Set the proper permissions:

  ```
  chown -R www-data:www-data /var/www/
  chmod -R 770 /var/www/
  chmod -R 774 /var/www/html/
  ```

  Reference: https://deploybot.com/guides/deploy-craft-cms-to-digitalocean

6. Enable options:

  ```
  a2enmod rewrite
  a2enmod ssl
  phpenmod mcrypt
  service apache2 restart
  ```

7. Change GROUP BY behavior in MySQL to account for breaking change in MySQL 5.7.5+ by editing `/etc/mysql/my.cnf` to include the following lines at the end of the file:

  ```
  [mysqld]
  sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
  ```

  Reference: https://craftcms.stackexchange.com/questions/12084/getting-this-sql-error-group-by-incompatible-with-sql-mode-only-full-group-by

8. Log into MySQL and create a database user. Note Digital Ocean stores the root MySQL password at `/root/.digitalocean_password`

  ```
  mysql -u root -p
  ```

  Then run the following queries:

  ```
  CREATE USER craftcms@localhost IDENTIFIED BY 'complex_password';
  CREATE DATABASE craftcms;
  GRANT ALL PRIVILEGES ON craftcms.* TO craftcms@localhost;
  FLUSH PRIVILEGES;
  exit
  ```

  And restart MySQL:

  ```
  service mysql restart
  ```

9. Recommend running `mysql_secure_installation`, at least with the options of removing the anonymous user, disallowing remote root access, and removing the test database. Don't forget to reload the privilege table as prompted to ensure changes take effect.

9. Install SSL certificates by following these instructions: https://www.digitalocean.com/community/tutorials/how-to-install-an-ssl-certificate-from-a-commercial-certificate-authority

10. Create the bare git repo that we will push to when we want to deploy.

  ```
  cd /var/
  mkdir repo && cd repo
  mkdir uxf-craft.git && cd uxf-craft.git
  git init --bare

  cd hooks/
  touch post-receive
  ```

  Edit the `post-receive` file to contain:

  ```
  #!/bin/sh
  git --work-tree=/var/www/html/ --git-dir=/var/repo/uxf-craft.git/ checkout -f
  npm install --prefix /var/www/html/
  ```

  Then make it executable:

  ```
  chmod +x post-receive
  ```

  Reference: https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps

11. Add the server repo as a remote to your local repo.

  ```
  git remote add live ssh://root@<droplet_ip_address>/var/repo/uxf-craft.git/
  ```

  To deploy the project run `git push live master`

12. Add config files. Two config files are excluded from the git repo because they contain db passwords, `craft/config/db.php` and `scripts/.env.sh`. Edit these to contain the correct information then:

  ```
  scp craft/config/db.php root@<droplet_ip_address>:/var/www/html/craft/config/
  scp scripts/.env.sh root@<droplet_ip_address>:/var/www/html/scripts/
  ```

13. Set change the user on craft files to take advantage of previously set up permissions.

```
chown -R www-data:www-data /var/www/
```

14. Go to <droplet_ip_address>/admin and follow the prompts to complete the craft installation.

15. Go to the settings panel, click on plugins, and install the UXFToolsPlugin.

16. At this point you can follow the steps below to do a fresh import, or restore from a backup.

### Server notes
You may need to increase the file upload size limit in php. This is likely in the php.ini file, don't forget to restart apache after changing it.


## Exporting data from the github pages project

1. Make sure to set up all of the fields, entries, assets, etc. in the Craft CMS. Especially make sure the asset fields point to the correct asset source if you have deleted/recreated them.

2. Edit line 55 and 56 of `exporter.js` to point to the correct section and type IDs for the top level components. (Read the IDs from the url when looking at them in the Craft settings area.)

3. From the root of the github pages repo, run:
  ```
  node --harmony ./exporter.js
  ```

  to create the following files:

  - components.json --- This file lists the top level components with appropriate slugs
  - assets.json --- This file lists all of the images and videos for every component version, intended for a FeedMe plugin asset import
  - sketch.json --- Lists all of the sketch files for each version, intended for FeedMe plugin import

  Note you may need to run the command a few times to get it to complete without throwing an error as occasionally there is a race condition when checking file urls for 404s.

4. Import the top level components by pointing the SproutImport plugin at `components.json`.

5. Import images and videos by running FeedMe on `assets.json`. This will likely take a while.

6. Import sketch files by running FeedMe on `sketch.json`.

7. Edit lines 9 and 33 of the `UXFTools_FolderIdsController.php` file in the custom UXFToolsPlugin to reflect the IDs of the two asset sources.

8. In the custom UXFToolsPlugin, click the two buttons to write parent and folder IDs to the files `component_ids.json`, `folder_ids.json`, and `folder_ids_sketch.json`. These files can be found at:

  ```
  craft/storage/runtime/temp/UXFTools/
  ```

9. Copy those three files to the root of the github pages repo.

10. Create the `versions-X.json` files by running:

  ```
  node --harmony ./exporter_versions.js
  ```

  Note: ensure the sectionId and typeId are set correctly on lines 195 and 196.

11. In sequential order, import the versions files with the SproutImport plugin.

12. There may be a few errors about missing files and whatnot. I was generally able to go in and manually rename references to get this all to work. Check the sprout logs at craft/storage/runtime/logs/

13. Extra steps for custom color type:

  - Change all the color version entries to colorsVersion entry type
  - Use the third button in the UXF tools plugin to write the entry IDs for the colors entries.
  - Run `node --harmony ./exporter_colors.js` in the jekyll repo to create the `colors.json file`
  - Use the Feed Me plugin to pull this file in and update the existing entries
