/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl, RangeControl } from "@wordpress/components";

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'create-block/carousel', {
  /**
   * This is the display title for your block, which can be translated with `i18n` functions.
   * The block inserter will show this name.
   */
  title: __( 'Carousel', 'create-block' ),

  /**
   * This is a short description for your block, can be translated with `i18n` functions.
   * It will be shown in the Block Tab in the Settings Sidebar.
   */
  description: __(
    '',
    'create-block'
  ),

  /**
   * Blocks are grouped into categories to help users browse and discover them.
   * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
   */
  category: 'widgets',

  /**
   * An icon property should be specified to make it easier to identify a block.
   * These can be any of WordPress’ Dashicons, or a custom svg element.
   */
  icon: 'slides',

  /**
   * Optional block extended support features.
   */
  supports: {
    // Removes support for an HTML mode.
    html: false,
    align: true,
  },

  attributes: {
    id: {
      type: 'text',
    },
    fade: {
      type: 'boolean',
    },
    indicators: {
      type: 'boolean',
      default: true,
    },
    controls: {
      type: 'boolean',
      default: true,
    },
    interval: {
      type: 'integer',
      default: 5000,
    },
    pause: {
      type: 'pause',
      default: true,
    },
    ride: {
      type: 'ride',
      default: true,
    },
    wrap: {
      type: 'wrap',
      default: true,
    },
  },
  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
   *
   * @param {Object} [props] Properties passed from the editor.
   *
   * @return {WPElement} Element to render.
   */
  edit( { clientId, attributes, setAttributes } ) {

    const {
      fade,
      indicators,
      controls,
      pause,
      ride,
      wrap,
      interval
    } = attributes;

    const ALLOWED_BLOCKS = [ 'create-block/slide' ];

    setAttributes( { id: clientId } )

    return (
      <div id={ `carousel-${ clientId }` } className={ `carousel slide` } data-ride="carousel">
      <InspectorControls>
          <PanelBody title="Slider Configuration" icon="" initialOpen={true}>
            <ToggleControl
              label="Fade Effect"
              help={
                fade
                  ? "Carousel will use a crossfade effect."
                  : "Carousel will use a sliding effect."
              }
              checked={fade}
              onChange={value => {
                setAttributes({ fade: value });
              }}
            />

            <ToggleControl
              label="Show Indicators"
              help={
                indicators
                  ? "Indicators will be shown."
                  : "Indicators will be hidden."
              }
              checked={indicators}
              onChange={value => {
                setAttributes({ indicators: value });
              }}
            />

            <ToggleControl
              label="Show Controls"
              help={
                controls
                  ? "Controls will be shown."
                  : "Controls will be hidden."
              }
              checked={controls}
              onChange={value => {
                setAttributes({ controls: value });
              }}
            />

            <ToggleControl
              label="Pause on Hover"
              help={
                pause
                  ? "Slides will stop changing when the mouse is over them."
                  : "Slides will change regardless of the mouse position."
              }
              checked={pause}
              onChange={value => {
                setAttributes({ pause: value });
              }}
            />

            <ToggleControl
              label="Autoplay"
              help={
                ride
                  ? "Carousel will autoplay."
                  : "Carousel is manually advanced."
              }
              checked={ride}
              onChange={value => {
                setAttributes({ ride: value });
              }}
            />

            <ToggleControl
              label="Wrap"
              help={
                wrap
                  ? "Carousel cycles continuously."
                  : "Carousel has hard stops."
              }
              checked={wrap}
              onChange={value => {
                setAttributes({ wrap: value });
              }}
            />

            <RangeControl
              label="Interval"
              help="In millisecons"
              value={interval}
              min={0}
              max={10000}
              step={500}
              onChange={value => {
                setAttributes({ interval: value });
              }}
            />
          </PanelBody>
        </InspectorControls>
        <div className="carousel-inner">
          <InnerBlocks
            allowedBlocks={ ALLOWED_BLOCKS }
          />
        </div>
      </div>
    );
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by the block editor into `post_content`.
   *
   * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
   *
   * @return {WPElement} Element to render.
   */
  save({ attributes }) {
    const {
      id,
      fade,
      indicators,
      controls,
      pause,
      ride,
      wrap,
      interval
    } = attributes;

    const fadeClass = (fade) ? 'carousel-fade' : '';

    const autoplay = (ride) ? 'carousel' : '';

    return (
      <div id={ `carousel-${ id }` } className={ `carousel slide ${ fadeClass }` } data-ride={ autoplay} data-pause={ pause } data-wrap={ wrap } data-interval={ interval }>
        <div className="carousel-inner">
          <InnerBlocks.Content />
        </div>
        { controls == true ? (
        <div className="controls">
          <a className="carousel-control-prev" href={ `#carousel-${ id }` }   role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href={ `#carousel-${ id }` }   role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        ) : '' }
        { indicators == true ? (
          <ol class="carousel-indicators"></ol>
        ) : '' }
      </div>
    );
  },
} );
