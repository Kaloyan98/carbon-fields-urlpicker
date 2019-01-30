## Carbon Field: urlpicker

_(this is an extension of [Carbon Fields](http://carbonfields.net/) plugin)_

Adds a `urlpicker` field type to Carbon Fields. Install using composer:
```cli
composer require kyosfiov/carbon-fields-urlpicker
```

(first, make sure you have `"minimum-stability": "dev"` set in `composer.json`)

Or by installing as a WP plugin (composer is recommended though; installing as a plugin may throw an error).

## Return values:
The field will return an associative array with the following values:

```
url: the actual URL
anchor: the text anchor (might be blank)
blank: wether the link should open in a new window or not
```

## Example

### Registering A Field
This goes in your `functions.php` as with other Carbon Fields fields. The only difference is that the type is `urlpicker`.

```php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

add_action( 'carbon_fields_register_fields', 'crb_url_picker_test' );

function crb_url_picker_test() {
  Container::make( 'post_meta', 'URL Picker Test' )
    ->add_fields( array(
      Field::make( 'urlpicker', 'crb_my_link', 'URL Picker Test' )
      	->set_help_text( "This is a test of the URL picker." )
    ));
}
```

### Using Field Values

```php
<?php $my_link = carbon_get_the_post_meta( 'crb_my_link' ); ?>
<a href="<?php $my_link[url] ?>"<?php ( $my_link[blank] ? ' target="_blank"' : '') ?>><?php $my_link[anchor] ?></a>
```

Note that the `anchor` field will return `0` or `1`, depending on whether the checkbox is ticked next to "Open link in a new tab".

### Gutenberg Integration

```php
use Carbon_Fields\Block;

Block::make( __( 'My Shiny Gutenberg Block' ) )
    ->add_fields( array(
        Field::make( 'urlpicker', 'url_data', __( 'Link' ) ),
        Field::make( 'image', 'image', __( 'Block Image' ) ),
        Field::make( 'rich_text', 'content', __( 'Block Content' ) ),
    ) )
    ->set_render_callback( function ( $block ) {
        ?>

        <div class="block">
            <div class="block__heading">
            	<?php
            	$link_data = $block['url_data'];
            	?>
            	<a href="<?php $link_data['url'] ?>"<?php ( $link_data['blank'] ? ' target="_blank"' : '') ?>><?php $link_data['anchor'] ?></a>
            </div><!-- /.block__heading -->

            <div class="block__image">
                <?php echo wp_get_attachment_image( $block['image'], 'full' ); ?>
            </div><!-- /.block__image -->

            <div class="block__content">
                <?php echo apply_filters( 'the_content', $block['content'] ); ?>
            </div><!-- /.block__content -->
        </div><!-- /.block -->

        <?php
    } );
```
