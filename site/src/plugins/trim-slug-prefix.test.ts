import test from 'node:test';
import assert from 'node:assert/strict';

test('trim prefix', (t) => {
  const trim = (s: string) => {
    // alias
    return s.replaceAll(/\/([^/]+)\/\1-/g, '/$1/').replace(/\/(kubernetes)\/k8s-/, '/$1/');
  };
  for (const [k, v] of Object.entries({
    hello: 'hello',
    'docs/dev/dev-faq': 'docs/dev/faq',
    'docs/dev/devfaq': 'docs/dev/devfaq',
    'docs/kubernetes/k8s-faq': 'docs/kubernetes/faq',
  })) {
    assert.equal(trim(k), v);
  }
});
