<?php
namespace Craft;

use Twig_Extension;
use Twig_Filter_Method;

class UXFToolsTwigExtensions extends \Twig_Extension {
  public function getName() {
    return 'UXFTools';
  }
  public function getFilters() {
    return array(
      'latestApproved' => new Twig_Filter_Method($this, 'latestApproved'),
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
}
