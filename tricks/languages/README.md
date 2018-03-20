# Languages

* Ranking
  * [Interactive: The Top Programming Languages 2017](http://spectrum.ieee.org/static/interactive-the-top-programming-languages-2017)



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
