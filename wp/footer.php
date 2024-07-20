<?php
  /**
   * @var array $args
   * @var string $args.js
   */

  $js = !empty($args['js']) ? $args['js'] : 'common';
?>
<footer class="footer"></footer>

<?php
  if( WP_DEBUG && IS_DEV ):
?>
  <script type="module" src="http://localhost:5173/@vite/client"></script>
  <script type="module" src="http://localhost:5173/src/ts/entry_point/<?=$js?>.ts"></script>
<?php
  else:
?>
  <script src="<?=get_stylesheet_directory_uri()?>/assets/js/<?=$js?>.js"></script>
<?php
  endif;

  wp_footer();
?>
</body>
</html>
