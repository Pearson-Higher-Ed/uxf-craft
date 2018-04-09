<?php
namespace Craft;

use Twig_Extension;
use Twig_Filter_Method;
use Twig_Function_Method;

class UXFToolsTwigExtensions extends \Twig_Extension {
  public function getName() {
    return 'UXFTools';
  }
  public function getFilters() {
    return array(
      'latestApproved' => new Twig_Filter_Method($this, 'latestApproved'),
      'groupByCategory' => new Twig_Filter_Method($this, 'groupBy')
    );
  }
  public function getFunctions() {
    return array(
      'fourFiveContrasty' => new Twig_Function_Method($this, 'fourFiveContrast')
    );
  }

  private function sortVersions($versions) {
    usort($versions, function($a, $b) {
      // ['1.0.0', 'beta.1']
      $a_segs = explode('-', $a['version']);
      $b_segs = explode('-', $b['version']);

      // ['1', '0', '0', 'beta.1']
      array_splice($a_segs, 0, 1, explode('.', $a_segs[0]));
      array_splice($b_segs, 0, 1, explode('.', $b_segs[0]));

      // ['1', '0', '0', '1']
      if (count($a_segs) == 4) {
        array_splice($a_segs, -1, 1, explode('.', end($a_segs))[1]);
      } else {
        array_push($a_segs, '99999'); // Kinda hacky way to rank approved
      }                               // components above beta
      if (count($b_segs) == 4) {
        array_splice($b_segs, -1, 1, explode('.', end($b_segs))[1]);
      } else {
        array_push($b_segs, '99999');
      }

      for ($i=0; $i < 4; $i++) {
        if ($a_segs[$i] > $b_segs[$i]) {
          return -1;
        }
        if ($b_segs[$i] > $a_segs[$i]) {
          return 1;
        }
      }
      return 0;
    });

    return $versions;
  }

  public function latestApproved($versions) {
    $sorted = $this->sortVersions($versions);

    for ($i=0; $i < count($sorted); $i++) {
      if (strpos($sorted[$i]['version'], 'beta') === false) {
        return $sorted[$i];
      }
    }
  }

  // calculates the luminosity of an given RGB color
  // the color code must be in the format of RRGGBB
  // the luminosity equations are from the WCAG 2 requirements
  // http://www.w3.org/TR/WCAG20/#relativeluminancedef
  private function calculateLuminosity($color) {
    $r = hexdec(substr($color, 0, 2)) / 255; // red value
    $g = hexdec(substr($color, 2, 2)) / 255; // green value
    $b = hexdec(substr($color, 4, 2)) / 255; // blue value
    if ($r <= 0.03928) {
      $r = $r / 12.92;
    } else {
      $r = pow((($r + 0.055) / 1.055), 2.4);
    }
    if ($g <= 0.03928) {
      $g = $g / 12.92;
    } else {
      $g = pow((($g + 0.055) / 1.055), 2.4);
    }
    if ($b <= 0.03928) {
      $b = $b / 12.92;
    } else {
      $b = pow((($b + 0.055) / 1.055), 2.4);
    }
    $luminosity = 0.2126 * $r + 0.7152 * $g + 0.0722 * $b;
    return $luminosity;
  }

  // calculates the luminosity ratio of two colors
  // the luminosity ratio equations are from the WCAG 2 requirements
  // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
  private function calculateLuminosityRatio($color1, $color2) {
    $l1 = $this->calculateLuminosity($color1);
    $l2 = $this->calculateLuminosity($color2);
    if ($l1 > $l2) {
      $ratio = (($l1 + 0.05) / ($l2 + 0.05));
    } else {
      $ratio = (($l2 + 0.05) / ($l1 + 0.05));
    }
    return $ratio;
  }

  public function fourFiveContrast($a, $b) {
    if ($a[0] == '#') $a = substr($a, 1);
    if ($b[0] == '#') $b = substr($b, 1);
    return $this->calculateLuminosityRatio($a, $b) >= 4.5;
  }

  public function groupBy($items) {
    $result = [];

    foreach ($items as $item) {
      $result[$item->category->label][] = $item;
    }
    return $result;
  }
}
