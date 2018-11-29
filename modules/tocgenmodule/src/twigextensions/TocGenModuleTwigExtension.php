<?php
/**
 * Toc Gen module for Craft CMS 3.x
 *
 * Generator a TOC from html headings
 *
 * @link      google.com
 * @copyright Copyright (c) 2018 Parker
 */

namespace modules\tocgenmodule\twigextensions;

use modules\tocgenmodule\TocGenModule;
use TOC;

use Craft;

/**
 * Twig can be extended in many ways; you can add extra tags, filters, tests, operators,
 * global variables, and functions. You can even extend the parser itself with
 * node visitors.
 *
 * http://twig.sensiolabs.org/doc/advanced.html
 *
 * @author    Parker
 * @package   TocGenModule
 * @since     1.0.0
 */
class TocGenModuleTwigExtension extends \Twig_Extension
{
    /**
     * @var \TOC\TocGenerator
     */
    private $generator;

    /**
     * @var \TOC\MarkupFixer
     */
    private $fixer;

    // Public Methods
    // =========================================================================

    public function __construct(TocGenerator $generator = null, MarkupFixer $fixer = null)
    {
      $this->generator = $generator ?: new TOC\TocGenerator();
      $this->fixer     = $fixer     ?: new TOC\MarkupFixer();
    }

    /**
     * Returns the name of the extension.
     *
     * @return string The extension name
     */
    public function getName()
    {
        return 'TocGenModule';
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
      $filters = parent::getFilters();

      $filters[] = new \Twig_SimpleFilter('add_anchors', function($str, $top = 1, $depth = 6) {
          return $this->fixer->fix($str, $top, $depth);
      }, ['is_safe' => ['html']]);

      return $filters;
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
      $functions = parent::getFunctions();

      // ~~~

      $functions[] = new \Twig_SimpleFunction('toc', function($markup, $top = 1, $depth = 6) {
          return $this->generator->getHtmlMenu($markup, $top, $depth);
      }, ['is_safe' => ['html']]);

      // ~~~

      $functions[] = new \Twig_SimpleFunction('toc_items', function($markup, $top = 1, $depth = 6) {
          return $this->generator->getMenu($markup, $top, $depth);
      });

      $functions[] = new \Twig_SimpleFunction('add_anchors', function($markup, $top = 1, $depth = 6) {
          return $this->fixer->fix($markup, $top, $depth);
      }, ['is_safe' => ['html']]);

      return $functions;
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
}
