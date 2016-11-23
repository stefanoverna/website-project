const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const pagination = require('metalsmith-pagination')
const metadata = require('metalsmith-metadata')
const markdown = require('metalsmith-markdown')
const collections = require('metalsmith-collections')
const watch = require('metalsmith-watch')
const serve = require('metalsmith-serve')
const msIf = require('metalsmith-if');
const marked = require('marked');
const sortBy = require('sort-by');

const isDevelopment = process.argv[2] === 'dev';

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(msIf(
    isDevelopment,
    serve()
  ))
  .use(msIf(
    isDevelopment,
    watch({
      paths: {
        "src/**/*": "**/*",
        "layouts/**/*": "**/*",
      },
      livereload: isDevelopment,
    })
  ))
  .use(metadata({
    sidebar: 'data/sidebar.yml'
  }))
  .use(collections({
    works: {
      pattern: 'works/*.md',
      sortBy: 'position',
    }
  }))
  .use(pagination({
    'collections.works': {
      perPage: 16,
      layout: 'works.ejs',
      first: 'index.html',
      path: 'works/page/:num/index.html',
    }
  }))
  .use(markdown())
  .use(layouts({
    engine: 'ejs',
    rename: true,
    markdown: marked,
    sortBy: sortBy,
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
