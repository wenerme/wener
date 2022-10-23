import test, { ExecutionContext } from 'ava';
import deflist from './deflist';
import html from 'rehype-stringify';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import unified from 'unified';
import math from 'remark-math';
import katex from 'rehype-katex';

const strip = ([str]: TemplateStringsArray) => str.replace(/\n {6}/g, '\n').replace(/\n {4}$/, '');

const parse = (str: string) =>
  unified()
    .use(markdown)
    .use(deflist)
    .use(math)
    .use(remark2rehype)
    .use(katex)
    .use(html)
    .process(str)
    .then((data) => data.toString());

const fixtures = [
  [
    'basic definition list',
    strip`
      Term 1

      : Definition 1
    `,
  ],
  [
    'definition list with inline markup',
    strip`
      Term *1*

      : Definition **1**
    `,
  ],
  [
    'document with other elements',
    strip`
      Definition List

      : Definition 1

      This paragraph follows the definition list.
    `,
  ],
  [
    'definition list with continuation',
    strip`
      Term 1

      : Definition
        with continuation.
    `,
  ],
  [
    'definition list with lazy continuation',
    strip`
      Term 1

      : Definition
      with lazy continuation.
    `,
  ],
  [
    'definition list with no space between the term and the descriptions (#7)',
    strip`
      Term **1**
      : Definition **bold** 1
      : Definition 2
    `,
  ],
  [
    'definition list with multiple descriptions (#9)',
    strip`
      Multiple descriptions

      : Description **1**
      : Description 2
    `,
  ],
  [
    'document with several subsequent definition lists (#10)',
    strip`
      Definition List 1

      : Description 1

      Definition List 2

      : Description 1

      Definition List 3

      : Description 1
    `,
  ],

  [
    'close to title',
    strip`
      List
      : Item
    `,
  ],
  [
    'simple with math',
    strip`
      List
      : text $w$
    `,
  ],
  [
    'multi with math',
    strip`
      List
      : text $w$
      : text $w2$
    `,
  ],

  [
    'only math',
    strip`
      Hi $w$ !
    `,
  ],
];

test('deflist', async (t) => {
  for (const [title, fixture] of fixtures) {
    const result = await parse(fixture);
    t.snapshot(result, title);
  }
});
