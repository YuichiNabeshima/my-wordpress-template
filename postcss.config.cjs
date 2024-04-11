/** @type {import('postcss-load-config').Config} */
module.exports = () => {
  return {
    plugins: {
      'postcss-mixins': {},
      'postcss-import': {},
      'postcss-nested': {},
      'postcss-media-minmax': {}
    }
  };
}
