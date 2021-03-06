<?php
namespace Craft;

class SproutImport_ImportFromPostTask extends BaseTask
{
	/**
	 * @return string
	 */
	public function getDescription()
	{
		return Craft::t('Sprout Import From Post Task');
	}

	/**
	 * @return array
	 */
	protected function defineSettings()
	{
		return array(
			'elements' => AttributeType::Mixed,
			'seedInfo' => AttributeType::Mixed
		);
	}

	/**
	 * @return mixed
	 */
	public function getTotalSteps()
	{
		return count($this->getSettings()->getAttribute('elements'));
	}

	/**
	 * @param int $step
	 *
	 * @return bool
	 */
	public function runStep($step)
	{
		craft()->config->maxPowerCaptain();
		$elements = $this->getSettings()->getAttribute('elements');
		$seedInfo = $this->getSettings()->getAttribute('seedInfo');
		$element  = $step ? $elements[$step] : $elements[0];

		try
		{
			$transaction = craft()->db->getCurrentTransaction() === null ? craft()->db->beginTransaction() : null;

			$weedModelAttributes = array(
				'seed'    => true,
				'type'    => $seedInfo['type'],
				'details' => $seedInfo['details'],
				'dateSubmitted' => $seedInfo['dateSubmitted']
			);

			$weedModel = SproutImport_WeedModel::populateModel($weedModelAttributes);

			sproutImport()->save($element, $weedModel);

			$errors = sproutImport()->getErrors();

			if (!empty($errors))
			{
				$message = implode("\n", $errors);

				SproutImportPlugin::log($message, LogLevel::Error);

				$transaction->rollback();

				return false;
			}

			if ($transaction && $transaction->active)
			{
				$transaction->commit();
			}

			return true;
		}
		catch (\Exception $e)
		{
			SproutImportPlugin::log($e->getMessage(), LogLevel::Error);
		}

		return false;
	}
}
