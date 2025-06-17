module.exports = function (source) {
  const callback = this.async();
  const frontmatter = source.match(/^---[\s\S]+?---/);
  
  if (frontmatter && frontmatter[0].includes('no: true')) {
    const modifiedSource = source.replace(
      /^(---[\s\S]+?---)/, 
      `$1\n\nimport UnfinishedDocOverlay from '@site/src/components/UnfinishedDocOverlay';
\n<UnfinishedDocOverlay />\n`
    );
    return callback(null, modifiedSource);
  }
  
  return callback(null, source);
};