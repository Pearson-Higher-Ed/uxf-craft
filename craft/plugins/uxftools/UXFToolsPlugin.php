<?php
namespace Craft;

class UXFToolsPlugin extends BasePlugin {
  public function getName() {
    return 'UXFToolsPlugin';
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
    return true;
  }

  public function addTwigExtension() {
    Craft::import('plugins.uxftools.twigextensions.UXFToolsTwigExtensions');

    return new UXFToolsTwigExtensions();
  }
}
