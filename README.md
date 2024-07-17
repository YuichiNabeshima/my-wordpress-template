# My WordPress Template

## Version
- Nodejs 20.11.1

## Setup
Exec on project root
```shell
npm install
```

Frist build
```shell
npm run build
```

When you build, the code under `src` will be output under `wp/assets/`.

Container start
```shell
npm run wp-env start
```

Login local Admin dashboard
```shell
user: admin
password: password
```

## Development
```shell
npm run dev
```
Starting the local server `http://localhost:5173` but please see the `http://localhost:8888` (you need to start the container).

## Production build
Please build by command below before you upload the assets to production.
```shell
npm run build
```
If you want to make sure the production build, please assign false value to following variable and you can make sure production build on `http://localhost:8888`.


```php:/wp/functions.php
<?php
// Whether to reference js and css files for development.
const IS_DEV = false;
```

**If you add images while developing, please build each time because <img> tags reffers to `wp/assets/`.**

## Directory structure
Static assets like images and fonts are put at public directory and it will be output under the `wp/assets` as it is when build.

```
┣━ public ━ img/
┃        ┗━ fonts/
┃
┣━ src ━━━━ css/
┃        ┗━ ts/
┃
┣━ wp ━━━━━ assets/
┃        ┗━ ...
```

## Style
It is assumed that a dedicated css file will be prepared for each page. If you want to use common css, please use mixin to make it common.

The files under `src/css/entry_point/` will be output to `wp/assets/css/` with their file names unchanged.

Pass the css file name to the get_header() function of each page.

```php
<?php
  get_header(null, [
    'css' => 'top',
  ]);
?>
```

## JS
The JS files under `src/ts/entry_point/` will also be output to `wp/assets/js/` with their file names unchanged.

Pass the css file name to the get_header() function of each page.

```php
<?php
  get_footer(null, [
    'js' => 'top',
  ]);
?>
```

### How to add JS feature
```php:html
  <button
    class="alert-btn"
    data-module="alert"
  >
    Alert!
  </button>
```

```ts:/src/ts/modules/alert.ts
export function alert( el: HTMLElement ) {
  el.addEventListener('click', () => {
    alert('click');
  });
}
```

When you want to add new JS feature, please create new file under the `src/ts/modules/`.
Then the HTML Element which you wrote `data-module="alert"` is passed the argument of the function.

If you finish to create new feature, please register your new function on the file under the `/src/ts/entry_point/~.ts`


```ts:/src/ts/entry_point/top.ts
import { registerModule } from '../register_module';
import { alert } from '../modules/alert';

registerModule({
  alert,
});

```

Then the name of the function will be able to be used value of `data-module`.

If you want to pass the variable from the html, you can use the `data-options` attribute and you can pass the variable as JSON format.

```php
  <button
    class="alert-btn"
    data-module="alert"
    data-options='{
      "alertText": "I am from earth."
    }'
  >
    Alert!
  </button>
```

```ts
type Opts = {
  alertText: string;
}

export function main( el: HTMLElement, opts: Opts ) {
  const msg = opts.alertText;
  el.addEventListener('click', () => {
    alert(msg);
  });
}
```

If you want to only run the module when device is PC or Smart phone.
You can use `data-only` attribute, there are 2 options which `pc` or `sp`.

Display width<br>
pc >= 768px<br>
sp <  768px


```php
  <button
    class="alert-btn"
    data-module="alert"
    data-options='{
      "alertText": "I am from earth."
    }'
    data-only="pc"
  >
    Alert PC only!
  </button>
```

When you want to put multiple modules on a tag.
```php
  <button
    class="alert-btn"
    data-module="alert another-alert"
    data-options='{
      "alert": {
        "alertText": "message"
      },
      "another-alert": {
        "afterText": "after message"
      }
    }'
    data-only='{
      "alert": "pc",
      "another-alert": "sp"
    }'
  >
    Multiple module
  </button>
```
