<?php
namespace Craft;

use TOC;

class TocGenPlugin extends BasePlugin {
  public function init() {
    require __DIR__ . '/vendor/autoload.php';
  }
  public function getName() {
    return 'TocGenPlugin';
  }

  public function getVersion() {
    return '0.0.1';
  }

  public function getDeveloper() {
    return 'Parker Malenke';
  }

  public function getDeveloperUrl() {
    return '';
  }

  public function hasCpSection() {
    return false;
  }

  public function addTwigExtension() {
    Craft::import('plugins.tocgen.twigextensions.TocTwigExtension', true);

    return new TOC\TocTwigExtension();
  }
}
