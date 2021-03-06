<?php
namespace Craft;

class TagSproutImportElementImporter extends BaseSproutImportElementImporter
{
	/**
	 * @return mixed
	 */
	public function getModelName()
	{
		return 'Tag';
	}

	/**
	 * @return bool
	 */
	public function hasSeedGenerator()
	{
		return true;
	}

	/**
	 * @return bool
	 * @throws Exception
	 * @throws \Exception
	 */
	public function save()
	{
		return craft()->tags->saveTag($this->model);
	}

	/**
	 * @return string
	 */
	public function getSettingsHtml()
	{
		$groupsSelect = array();

		$groups = craft()->tags->getAllTagGroups();

		if (!empty($groups))
		{
			foreach ($groups as $group)
			{
				$groupsSelect[$group->id]['label'] = $group->name;
				$groupsSelect[$group->id]['value'] = $group->id;
			}
		}

		return craft()->templates->render('sproutimport/_integrations/tag/settings', array(
			'id'        => $this->getModelName(),
			'tagGroups' => $groupsSelect
		));
	}

	/**
	 * @param $settings
	 */
	public function getMockData($quantity, $settings)
	{
		$saveIds  = array();
		$tagGroup = $settings['tagGroup'];

		if (!empty($quantity))
		{
			for ($i = 1; $i <= $quantity; $i++)
			{
				$model = $this->generateTag($tagGroup);
				$saveIds[] = $model->id;
			}
		}

		return $saveIds;
	}

	/**
	 * @param $tagGroup
	 *
	 * @throws Exception
	 * @throws \Exception
	 */
	private function generateTag($tagGroup)
	{
		$faker = $this->fakerService;
		$name  = $faker->word;

		$tag          = new TagModel();
		$tag->groupId = $tagGroup;
		$tag->enabled = true;
		$tag->locale  = 'en_us';
		$tag->slug    = ElementHelper::createSlug($name);

		$tag->getContent()->title = $name;

		if (craft()->tags->saveTag($tag))
		{
			return $tag->id;
		}
	}
}