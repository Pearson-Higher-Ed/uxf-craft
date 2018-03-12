<?php
namespace Craft;

class UXFTools_FolderIdsController extends BaseController {
  public function actionWriteIds() {
    $this->requirePostRequest();

    $assets = new AssetsService();
    $criteria = new FolderCriteriaModel(array("sourceId" => 1));
    $folders = $assets->findFolders($criteria);

    // print_r("<pre>");
    // print_r($folders);
    // print_r("</pre>");

    $json = "{";
    foreach ($folders as $folder) {
      $json = $json . '"' . $folder->name . '": ' . $folder->id . ',';
    }
    $json = substr($json, 0, -1);
    $json = $json . "}";

    $path = craft()->path->getTempPath() . '/UXFTools';

    if (!file_exists($path)) {
      mkdir($path, 0777, true);
    }

    file_put_contents($path . '/folder_ids.json', $json);
  }
}
