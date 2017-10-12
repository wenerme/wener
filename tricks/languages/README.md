# Languages

* Ranking
  * [Interactive: The Top Programming Languages 2017](http://spectrum.ieee.org/static/interactive-the-top-programming-languages-2017)


## PEG
* [PEG.js](https://pegjs.org/)
  * Simple and expressive grammar syntax
  * Integrates both lexical and syntactical analysis
  * Parsers have excellent error reporting out of the box
  * Based on parsing expression grammar formalism — more powerful than traditional LL(k) and LR(k) parsers
  * Usable from your browser, from the command line, or via JavaScript API


## EBNF
* [ISO 14977](https://www.iso.org/standard/26153.html)
  * Information technology -- Syntactic metalanguage -- Extended BNF

```
Production  = name "=" [ Expression ] ";" ;
Expression  = Alternative { "|" Alternative } ;
Alternative = Term { Term } ;
Term        = name | TOKEN | Group | Option | Repetition ;
Group       = "(" Expression ")" ;
Option      = "[" Expression "]" ;
Repetition  = "{" Expression "}" ;
```
