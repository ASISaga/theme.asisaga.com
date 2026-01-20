// PostCSS configuration for CSS optimization
module.exports = {
  plugins: [
    // Sort and combine media queries
    require('postcss-sort-media-queries')({
      sort: 'mobile-first'
    }),
    
    // Minify CSS
    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true
        },
        normalizeWhitespace: true,
        mergeLonghand: true,
        mergeRules: true,
        minifyFontValues: true,
        minifyGradients: true
      }]
    }),
    
    // Optional: Remove unused CSS (configure carefully)
    // require('@fullhuman/postcss-purgecss')({
    //   content: [
    //     './_layouts/**/*.html',
    //     './_includes/**/*.html',
    //     './*.html'
    //   ],
    //   safelist: {
    //     standard: [/^material-/, /^bento-/, /^genesis-/, /^nav-/, /^btn-/],
    //     deep: [/modal/, /dropdown/, /tooltip/]
    //   }
    // })
  ]
};
