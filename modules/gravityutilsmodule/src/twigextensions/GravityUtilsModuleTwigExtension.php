<?php
/**
 * Gravity Utils module for Craft CMS 3.x
 *
 * Handy extensions for the Gravity website.
 *
 * @link      google.com
 * @copyright Copyright (c) 2018 Parker Malenke
 */

namespace modules\gravityutilsmodule\twigextensions;

use modules\gravityutilsmodule\GravityUtilsModule;

use Craft;

/**
 * Twig can be extended in many ways; you can add extra tags, filters, tests, operators,
 * global variables, and functions. You can even extend the parser itself with
 * node visitors.
 *
 * http://twig.sensiolabs.org/doc/advanced.html
 *
 * @author    Parker Malenke
 * @package   GravityUtilsModule
 * @since     1.0.0
 */
class GravityUtilsModuleTwigExtension extends \Twig_Extension
{
    // Public Methods
    // =========================================================================

    /**
     * Returns the name of the extension.
     *
     * @return string The extension name
     */
    public function getName()
    {
        return 'GravityUtilsModule';
    }

    /**
     * Returns an array of Twig filters, used in Twig templates via:
     *
     *      {{ 'something' | someFilter }}
     *
     * @return array
     */
    public function getFilters()
    {
        return [
            new \Twig_SimpleFilter(
              'someFilter', [$this, 'someInternalFunction']
            ),
            new \Twig_SimpleFilter(
              'latestApproved', [$this, 'latestApproved']
            ),
            new \Twig_SimpleFilter(
              'latestOverall', [$this, 'latestOverall']
            ),
            new \Twig_SimpleFilter(
              'groupByCategory', [$this, 'groupByCategory']
            ),
            new \Twig_SimpleFilter(
              'iconsGroupByCategory', [$this, 'iconsGroupBy']
            ),
            new \Twig_SimpleFilter(
              'hasNightly', [$this, 'hasNightly']
            ),
            new \Twig_SimpleFilter(
              'getNightly', [$this, 'getNightly']
            )
        ];
    }

    /**
     * Returns an array of Twig functions, used in Twig templates via:
     *
     *      {% set this = someFunction('something') %}
     *
    * @return array
     */
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('fourFiveContrasty', [$this, 'fourFiveContrast']),
        ];
    }

    private function sortVersions($versions) {
      $versions = array_filter($versions, function($v) {
        if (strtolower($v['version']) == 'nightly') {
          return false;
        } else {
          return true;
        }
      });

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

    public function latestOverall($versions) {
      return $this->sortVersions($versions)[0];
    }

    public function groupBy($items) {
      $result = [];

      foreach ($items as $item) {
        $result[$item->category->label][] = $item;
      }
      return $result;
    }

    public function iconsGroupBy($icons) {
      $result = [];

      foreach ($icons as $icon) {
        $categories = $icon->categories->find();
        foreach ($categories as $category) {
          $result[$category->title][] = $icon;
        }
      }

      return $result;
    }

    public function hasNightly($components) {
      if (!is_array($components)) {
        $components = $components->all();
      }
      return array_filter($components, function($c) {
        foreach ($c->children->all() as $child) {
          if (strtolower($child->version) == 'nightly') {
            return true;
          }
        }
        return false;
      });
    }

    public function getNightly($versions) {
      foreach ($versions as $version) {
        if (strtolower($version->version) == 'nightly') {
          return $version;
        }
      }
      return false;
    }

    /**
     * Our function called via Twig; it can do anything you want
     *
     * @param null $text
     *
     * @return string
     */
    public function someInternalFunction($text = null)
    {
        $result = $text . " in the way";

        return $result;
    }

    public function fourFiveContrast($a, $b) {
      if ($a[0] == '#') $a = substr($a, 1);
      if ($b[0] == '#') $b = substr($b, 1);
      return $this->calculateLuminosityRatio($a, $b) >= 4.5;
    }
}
