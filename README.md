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


### Deploying the project

#### Setting up deploy process

##### Remote git repo on droplet
Following instructions in [this article][1] there is a bare git repo that lives at /var/repo/uxf-craft.git and which checks out the latest commit on master into the /var/www/html/ directory whenever it is pushed to.

##### Installing dependencies
After pushing Craft asked for the multibyte string php extension, which is installed with:

```
sudo apt-get update
sudo apt-get install mbstring
sudo apt-get install php-mcrypt
sudo apt-get install php-curl
sudo systemctl restart apache2 # Restart apache to take affect
```

##### Setting permissions
```
chown -R www-data:www-data /var/www
chmod -R 770 /var/www
chmod -R 775 /var/www/html
```

##### Configuring DB
Per [this article][2], MySQL 5.7.5+ needs to be configured differently.

Edit /etc/mysql/my.cnf to include the following lines:

```
[mysqld]
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```

Then

```
service mysql restart
```

[1]: https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps

[2]: https://craftcms.stackexchange.com/questions/12084/getting-this-sql-error-group-by-incompatible-with-sql-mode-only-full-group-by


### Exporting data from the github pages project

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
