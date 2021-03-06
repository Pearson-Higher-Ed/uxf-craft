<?php
namespace Craft;

class NumberSproutImportFieldImporter extends BaseSproutImportFieldImporter
{
	/**
	 * @return string
	 */
	public function getModelName()
	{
		return 'Number';
	}

	/**
	 * @return mixed
	 */
	public function getMockData()
	{
		$settings = $this->model->settings;

		$min     = is_numeric($settings['min']) ? $settings['min'] : 0;
		$max     = is_numeric($settings['max']) ? $settings['max'] : 100;
		$decimal = is_numeric($settings['decimals']) ? $settings['decimals'] : 0;

		if (!empty($decimal))
		{
			return $this->fakerService->randomFloat($decimal, $min, $max);
		}

		return $this->fakerService->numberBetween($min, $max);
	}
}
