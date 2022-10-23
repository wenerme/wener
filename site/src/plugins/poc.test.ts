import test from 'ava';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { math } from 'micromark-extension-math';
import { mathFromMarkdown, mathToMarkdown } from 'mdast-util-math';

test('math from mark', (t) => {
  t.snapshot(fromMarkdown(`# Hello\n Nice $m$`, { extensions: [math()], mdastExtensions: [mathFromMarkdown()] }));

  t.snapshot(fromMarkdown(`text $w$`, {
    extensions: [math()],
    mdastExtensions: [mathFromMarkdown()],
  }))
});
