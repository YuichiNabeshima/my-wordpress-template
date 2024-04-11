<?php
// Whether to reference js and css files for development.
const IS_DEV = true;

/**
 * Disable Gutenberg.
 */
function exclude_styles()
{
  wp_dequeue_style( 'wp-block-library' );
}
add_action( 'wp_print_styles', 'exclude_styles', 100 );
