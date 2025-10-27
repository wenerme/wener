function injectScript(url) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${url}"]`);
    if (existing) {
      return resolve(existing);
    }
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
    document.head.appendChild(script);
  });
}

function injectStyle(url) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`link[rel="stylesheet"][href="${url}"]`);
    if (existing) {
      return resolve(existing);
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.onload = () => resolve(link);
    link.onerror = () => reject(new Error(`Failed to load stylesheet: ${url}`));
    document.head.appendChild(link);
  });
}
