<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
	'*' => array(
		// Default Week Start Day (0 = Sunday, 1 = Monday...)
		'defaultWeekStartDay' => 0,

		// Environment-specific variables (see https://craftcms.com/docs/multi-environment-configs#environment-specific-variables)
		'environmentVariables' => array(),

		// Enable CSRF Protection (rec'd, will be enabled by default in Craft 3)
		'enableCsrfProtection' => true,

		// Whether "index.php" should be visible in URLs (true, false, "auto")
		'omitScriptNameInUrls' => 'auto',

		'extraAllowedFileExtensions' => 'sketch'
	),

	'localhost' => array(
		// Base site URL
		'siteUrl' => 'http://localhost:8888',

		// Control Panel trigger word
		'cpTrigger' => 'admin',

		// Dev Mode (see https://craftcms.com/support/dev-mode)
		'devMode' => true
	),

	'45.55.126.209' => array(
		'siteUrl' => 'http://45.55.126.209'
	)

);
