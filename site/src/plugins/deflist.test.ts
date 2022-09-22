import test, { ExecutionContext } from 'ava';
import deflist from './deflist';
import html from 'rehype-stringify';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import unified from 'unified';

const strip = ([str]: TemplateStringsArray) => str.replace(/\n {6}/g, '\n').replace(/\n {4}$/, '');

const parse = (str: string) =>
  unified()
    .use(markdown)
    .use(deflist)
    .use(remark2rehype)
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
];

async function macro(t: ExecutionContext, input: any) {
  const result = await parse(input);
  t.snapshot(result);
}

macro.title = (name: string) => `remark-deflist should parse a ${name}`;

// for (const fixture of fixtures) {
//   const [ name, source ] = fixture
//   test(name, macro, source);
// }

test('deflist', async (t) => {
  for (const [title, fixture] of fixtures) {
    const result = await parse(fixture);
    t.snapshot(result, title);
  }
});
