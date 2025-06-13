module.exports = function(context, options) {
  return {
    name: 'docusaurus-plugin-no-doc',
    injectHtmlTags() {
      return {
        postBodyTags: [
          {
            tagName: 'script',
            innerHTML: `
              (function() {
                const observer = new MutationObserver(function(mutations) {
                  const article = document.querySelector('article');
                  if (article && article.dataset.no === 'true') {
                    const overlay = document.createElement('div');
                    overlay.id = 'unfinished-doc-overlay';
                    article.appendChild(overlay);
                    const root = document.createElement('div');
                    root.id = 'unfinished-doc-root';
                    overlay.appendChild(root);
                  }
                });
                
                observer.observe(document.body, {
                  childList: true,
                  subtree: true
                });
              })();
            `,
          },
        ],
      };
    },
  };
};