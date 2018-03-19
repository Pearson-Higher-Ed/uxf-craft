<?php
namespace Craft;

class UXFTools_ComponentIdsController extends BaseController {
  public function actionWriteIds() {
    $this->requirePostRequest();

    $criteria = craft()->elements->getCriteria(ElementType::Entry);
    $criteria->section = "components";
    $criteria->type = "component";

    $json = "{";
    foreach ($criteria as $entry) {
      $json = $json . '"' . $entry->slug . '": ' . $entry->id . ',';
    }
    $json = substr($json, 0, -1);
    $json = $json . "}";

    $path = craft()->path->getTempPath() . '/UXFTools';

    if (!file_exists($path)) {
      mkdir($path, 0777, true);
    }

    file_put_contents($path . '/component_ids.json', $json);
  }
}
