<?php
namespace Craft;

class UserSproutImportElementImporter extends BaseSproutImportElementImporter
{
	/**
	 * @return mixed
	 */
	public function getModelName()
	{
		return 'User';
	}

	/**
	 * @return bool
	 */
	public function hasSeedGenerator()
	{
		return true;
	}

	/**
	 * @return string
	 */
	public function getSettingsHtml()
	{
		$groups = craft()->userGroups->getAllGroups();

		$groupsSelect = array();

		if (!empty($groups))
		{
			foreach ($groups as $group)
			{
				$groupsSelect[$group->id]['label'] = $group->name;
				$groupsSelect[$group->id]['value'] = $group->id;
			}
		}

		return craft()->templates->render('sproutimport/_integrations/user/settings', array(
			'id'     => $this->getModelName(),
			'groups' => $groupsSelect
		));
	}

	/**
	 * @param $settings
	 */
	public function getMockData($quantity, $settings)
	{
		$saveIds   = array();
		$userGroup = $settings['userGroup'];

		if (!empty($quantity))
		{
			for ($i = 1; $i <= $quantity; $i++)
			{
				$model = $this->generateUser($userGroup);
				$saveIds[] = $model->id;
			}
		}

		return $saveIds;
	}

	private function generateUser($groupId)
	{
		$faker = $this->fakerService;

		$firstName = $faker->firstName;
		$lastName  = $faker->lastName;

		$name = $firstName . ' ' . $lastName;

		$username = $faker->userName;

		$username = sproutImport()->mockData->generateUsernameOrEmail($username, $faker);

		$email = $faker->email;

		$email = sproutImport()->mockData->generateUsernameOrEmail($email, $faker, true);

		$data                            = array();
		$data['@model']                  = 'User';
		$data['groupIds']                = array($groupId);
		$data['attributes']['username']  = $username;
		$data['attributes']['firstName'] = $firstName;
		$data['attributes']['lastName']  = $lastName;
		$data['attributes']['email']     = $faker->email;

		$fieldLayout           = craft()->fields->getLayoutByType('User');
		$fieldLayoutFieldModel = $fieldLayout->fields;

		$data['content']['fields'] = sproutImport()->mockData->getFieldsWithMockData($fieldLayoutFieldModel);

		return sproutImport()->elementImporter->saveElement($data);
	}

	/**
	 * @return array
	 */
	public function getImporterDataKeys()
	{
		return array('groupIds');
	}

	/**
	 * @return bool
	 * @throws Exception
	 * @throws \Exception
	 */
	public function save()
	{
		$user = craft()->users->saveUser($this->model);

		if ($user)
		{
			if (!empty($this->rows['attributes']['groupIds']))
			{
				$groupIds = $this->rows['attributes']['groupIds'];

				$userId = $this->model->id;

				craft()->userGroups->assignUserToGroups($userId, $groupIds);
			}
		}

		return $user;
	}
}