<?php
namespace Craft;

class UXFTools_ColorIdsController extends BaseController {
  public function actionWriteIds() {
    $this->requirePostRequest();

    $criteria = craft()->elements->getCriteria(ElementType::Entry);
    $criteria->section = "components";
    $criteria->type = "colorsVersion";

    $json = "{";
    foreach ($criteria as $entry) {
      $json = $json . '"' . $entry->version . '": ' . $entry->id . ',';
    }
    $json = substr($json, 0, -1);
    $json = $json . "}";

    $path = craft()->path->getTempPath() . '/UXFTools';

    if (!file_exists($path)) {
      mkdir($path, 0777, true);
    }

    file_put_contents($path . '/color_ids.json', $json);

  }
}
