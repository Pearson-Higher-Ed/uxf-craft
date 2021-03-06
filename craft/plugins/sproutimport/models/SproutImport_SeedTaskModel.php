<?php
namespace Craft;

class SproutImport_SeedTaskModel extends BaseModel
{
	/**
	 * @return array
	 */
	protected function defineAttributes()
	{
		return array(
			'elementType'   => array(AttributeType::String, 'required' => true, 'default' => 'Entry'),
			'quantity'      => array(AttributeType::Number, 'required' => true, 'default' => 11),
			'settings'      => array(AttributeType::Mixed,  'required' => true),
			'type'          => array(AttributeType::String),
			'details'       => array(AttributeType::String),
			'dateSubmitted' => array(AttributeType::DateTime)
		);
	}
}