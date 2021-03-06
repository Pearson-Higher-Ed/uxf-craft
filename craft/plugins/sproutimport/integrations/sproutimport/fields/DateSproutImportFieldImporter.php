<?php
namespace Craft;

class DateSproutImportFieldImporter extends BaseSproutImportFieldImporter
{
	/**
	 * @return string
	 */
	public function getModelName()
	{
		return 'Date';
	}

	/**
	 * @return mixed
	 */
	public function getMockData()
	{
		$settings = $this->model->settings;

		$minuteIncrement = $settings['minuteIncrement'];
		$showDate        = $settings['showDate'];
		$showTime        = $settings['showTime'];

		$values = array();

		$values['time'] = '';

		if ($showDate === 1)
		{
			$values['date'] = $this->fakerService->date('d/m/Y');
		}

		if ($showTime === 1)
		{
			$randomTimestamp = strtotime($this->fakerService->time("g:i:s A"));

			$values['time'] = sproutImport()->mockData->getMinutesByIncrement($randomTimestamp, $minuteIncrement);
		}

		return $values;
	}
}
