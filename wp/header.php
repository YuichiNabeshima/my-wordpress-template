<?php
  /**
   * @var array $args
   * @var string $args.css
   * @var string $args.meta_title
   * @var string $args.meta_description
   */

  $css = !empty($args['css']) ? $args['css'] : 'top';
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="format-detection" content="telephone=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<meta name="viewport" content="width=device-width">
<script>
  function viewportSet() {
    const wsw = window.screen.width;
    if (wsw < 768) {
      document.querySelector("meta[name='viewport']").setAttribute("content", "width=device-width,initial-scale=1.0,viewport-fit=cover");
    } else {
      document.querySelector("meta[name='viewport']").setAttribute("content", "width=1280");
    }
  }
  viewportSet();
  window.addEventListener("resize", viewportSet, false);
  window.addEventListener("orientationchange", viewportSet, false);
</script>

<meta name="description" content="<?=$args['meta_description']?>">
<meta property="og:type" content="website">
<meta property="og:title" content="<?=$args['meta_title']?>">
<meta property="og:description" content="<?=$args['meta_description']?>">
<meta property="og:url" content="<?=(empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']?>">
<meta property="og:image" content="<?=get_stylesheet_directory_uri()?>/assets/img/ogp.jpg">
<link rel="shortcut icon" href="<?=get_stylesheet_directory_uri()?>/assets/img/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="<?=get_stylesheet_directory_uri()?>/assets/img/apple-touch-icon.png">
<title><?=$args['meta_title']?></title>

<?php
  if( WP_DEBUG && IS_DEV ):
?>
  <link rel="stylesheet" href="http://localhost:5173/src/css/entry_point/<?=$css?>.css">
<?php
  else:
?>
  <link rel="stylesheet" href="<?=get_stylesheet_directory_uri()?>/assets/css/<?=$css?>_pc.css" media="screen and (min-width: 768px)">
  <link rel="stylesheet" href="<?=get_stylesheet_directory_uri()?>/assets/css/<?=$css?>_sp.css" media="screen and (max-width: 767px)">
<?php
  endif;

	wp_head();
?>
</head>
<body>
  <header class="header"></header>
