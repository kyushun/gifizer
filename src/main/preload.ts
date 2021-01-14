const path = require('path');

process.once('loaded', () => {
  window.process = process;
  window.path = path;
});
