This repository contains all of the templates, configuration, etc. for the UXF website to run on Craft CMS.

## Useful implementation notes

### Craft Plugin
There is one custom plugin which makes working with the version tree easier. It adds the `latestApproved` twig filter. Pass an array of versions for a single component and it will return the latest approved entry.
