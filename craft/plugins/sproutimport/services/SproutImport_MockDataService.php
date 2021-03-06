<?php
namespace Craft;

/**
 * Class SproutImport_MockDataService
 *
 * Various methods to help with importing mock seed data into fields and elements
 *
 * @package Craft
 */
class SproutImport_MockDataService extends BaseApplicationComponent
{
	/**
	 * Generate mock data for all supported fields associated with an Element
	 *
	 * @param $fields
	 *
	 * @return array
	 */
	public function getFieldsWithMockData($fields)
	{
		$fieldsWithMockData = array();

		if (!empty($fields))
		{
			foreach ($fields as $field)
			{
				$fieldHandle        = $field->field->handle;
				$fieldType          = $field->field->type;
				$fieldImporterClass = sproutImport()->getFieldImporterClassByType($fieldType);

				if ($fieldImporterClass != null)
				{
					$fieldImporterClass->setModel($field->field);

					$fieldsWithMockData[$fieldHandle] = $fieldImporterClass->getMockData();
				}
			}
		}

		return $fieldsWithMockData;
	}

	/**
	 * Get a random sample of Relations for the given Element Relations field
	 *
	 * @param       $elementName
	 * @param array $attributes
	 * @param       $limit
	 *
	 * @return array
	 * @throws Exception
	 */
	public function getMockRelations($elementName, array $attributes = array(), $limit = 1)
	{
		$criteria = craft()->elements->getCriteria($elementName);

		$results = $criteria->find($attributes);

		if (!$results)
		{
			return false;
		}

		$total = $criteria->total();

		// If limit is greater than the total number of elements, use total
		if ($limit > $total || $limit === '')
		{
			$limit = $total;
		}

		$randomLimit = rand(1, $limit);

		$randomKeys = array_rand($results, $randomLimit);

		$keys = (!is_array($randomKeys)) ? array($randomKeys) : $randomKeys;

		$elementIds = array();

		if (!empty($keys))
		{
			foreach ($keys as $key)
			{
				$elementIds[] = $results[$key]->id;
			}
		}

		return $elementIds;
	}

	/**
	 * Determine the Element Group IDs from the source settings
	 *
	 * @param $sources
	 *
	 * @return array
	 */
	public function getElementGroupIds($sources)
	{
		$ids = array();

		if (!empty($sources))
		{
			if ($sources == "*")
			{
				return $sources;
			}

			foreach ($sources as $source)
			{
				$ids[] = $this->getElementGroupId($source);
			}
		}

		return $ids;
	}

	/**
	 * Extract a specific Element Group ID from the source setting syntax
	 *
	 * Examples:
	 * - group:1
	 * - taggroup:1
	 *
	 * @param $source
	 *
	 * @return mixed
	 */
	public function getElementGroupId($source)
	{
		if (!isset($source))
		{
			return null;
		}

		if ($source == 'singles')
		{
			return $source;
		}

		$sourceExplode = explode(":", $source);

		return $sourceExplode[1];
	}

	/**
	 * Determine what limit to use for a field that has a limit setting.
	 *
	 * If a limit is set, use that limit. If the limit is infinite, use a reasonable default.
	 *
	 * @param $limit
	 *
	 * @return int
	 */
	public function getLimit($limitFromSettings, $defaultLimit = 3)
	{
		if ($limitFromSettings > 0)
		{
			return $limitFromSettings;
		}

		return $defaultLimit;
	}

	/**
	 * Return a random selection of items from an array.
	 *
	 * Useful for fields such as Multi-select and Checkboxes
	 *
	 * @param $values
	 * @param $number
	 *
	 * @return array|mixed
	 */
	public function getRandomArrayItems($values, $number)
	{
		$randomItems = array_rand($values, $number);

		if (!is_array($randomItems))
		{
			return array($randomItems);
		}

		return $randomItems;
	}

	/**
	 * Return selected values by keys for use with fields such as Multi-select and Checkboxes
	 *
	 * @param $keys
	 * @param $options
	 *
	 * @return array
	 */
	public function getOptionValuesByKeys($keys, $options)
	{
		$values = array();

		foreach ($keys as $key)
		{
			$values[] = $options[$key]['value'];
		}

		return $values;
	}

	/**
	 * Return a single random value for a set of given options
	 *
	 * @param        $options
	 * @param string $key
	 *
	 * @return mixed
	 */
	public function getRandomOptionValue($options, $key = 'value')
	{
		$randKey = array_rand($options, 1);

		$value = $options[$randKey];

		if ($key == false)
		{
			return $value;
		}

		return $value[$key];
	}

	/**
	 * Generate a fake time for the DateSproutImportFieldImporter Class
	 *
	 * @param $time
	 * @param $increment
	 *
	 * @return string
	 */
	public function getMinutesByIncrement($time, $increment)
	{
		$hour    = date('g', $time);
		$minutes = date('i', $time);
		$amPm    = date('A', $time);

		$timeMinute = $minutes - ($minutes % $increment);

		if ($timeMinute === 0)
		{
			$timeMinute = "00";
		}

		return $hour . ":" . $timeMinute . " " . $amPm;
	}

	/**
	 * Generate columns for the TableSproutImportFieldImporter
	 *
	 * @param $columns
	 *
	 * @return array
	 */
	public function generateTableColumns($columns)
	{
		$values = array();

		foreach ($columns as $key => $column)
		{
			$values[$key] = $this->generateTableColumn($key, $column);
		}

		return $values;
	}

	/**
	 * Generate a specific column for the TableSproutImportFieldImporter
	 *
	 * @param $key
	 * @param $column
	 *
	 * @return array|int|string
	 */
	public function generateTableColumn($key, $column)
	{
		$value        = '';
		$fakerService = sproutImport()->faker->getGenerator();

		if (!empty($column))
		{
			$type = $column['type'];

			switch ($type)
			{
				case "singleline":

					$value = $fakerService->text(50);

					break;

				case "multiline":
					$lines = rand(2, 3);

					$value = $fakerService->sentences($lines, true);

					break;

				case "number":

					$value = $fakerService->randomDigit;

					break;

				case "checkbox":

					$bool = rand(0, 1);

					if ($bool === 0)
					{
						$value = '';
					}

					$value = $bool;

					break;
			}
		}

		return $value;
	}

	/**
	 * Generate a fake name or email
	 *
	 * @param      $nameOrEmail
	 * @param      $faker
	 * @param bool $isEmail
	 * @param null $usersService
	 *
	 * @return string
	 */
	public function generateUsernameOrEmail($nameOrEmail, $faker, $isEmail = false, $usersService = null)
	{
		if ($usersService == null)
		{
			$usersService = craft()->users;
		}

		if ($usersService->getUserByUsernameOrEmail($nameOrEmail) != null)
		{
			if ($isEmail == true)
			{
				$fakeParam = $faker->email;
			}
			else
			{
				$fakeParam = $faker->userName;
			}

			return $this->generateUsernameOrEmail($fakeParam, $faker, $isEmail);
		}

		return $nameOrEmail;
	}
}
