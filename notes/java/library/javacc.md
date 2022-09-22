---
title: JavaCC
---

# JavaCC

## 概述
* [JavaCC](https://javacc.org/) - The Java Parser Generator
* `LL(*)`
* 生成的代码没有运行时依赖
* [grammar repository](https://javacc.org/grammar-library)

## 配置

```xml
<plugin>
    <groupId>com.helger.maven</groupId>
    <artifactId>ph-javacc-maven-plugin</artifactId>
    <version>4.0.3</version>
    <executions>
        <execution>
            <phase>generate-sources</phase>
            <goals>
                <goal>jjtree-javacc</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

## 选项

"LOOKAHEAD" "=" java_integer_literal ";"
|	"CHOICE_AMBIGUITY_CHECK" "=" java_integer_literal ";"
|	"OTHER_AMBIGUITY_CHECK" "=" java_integer_literal ";"
|	"STATIC" "=" java_boolean_literal ";"
|	"SUPPORT_CLASS_VISIBILITY_PUBLIC" "=" java_boolean_literal ";"
|	"DEBUG_PARSER" "=" java_boolean_literal ";"
|	"DEBUG_LOOKAHEAD" "=" java_boolean_literal ";"
|	"DEBUG_TOKEN_MANAGER" "=" java_boolean_literal ";"
|	"ERROR_REPORTING" "=" java_boolean_literal ";"
|	"JAVA_UNICODE_ESCAPE" "=" java_boolean_literal ";"
|	"UNICODE_INPUT" "=" java_boolean_literal ";"
|	"IGNORE_CASE" "=" java_boolean_literal ";"
|	"USER_TOKEN_MANAGER" "=" java_boolean_literal ";"
|	"USER_CHAR_STREAM" "=" java_boolean_literal ";"
|	"BUILD_PARSER" "=" java_boolean_literal ";"
|	"BUILD_TOKEN_MANAGER" "=" java_boolean_literal ";"
|	"TOKEN_EXTENDS" "=" java_string_literal ";"
|	"TOKEN_FACTORY" "=" java_string_literal ";"
|	"TOKEN_MANAGER_USES_PARSER" "=" java_boolean_literal ";"
|	"SANITY_CHECK" "=" java_boolean_literal ";"
|	"FORCE_LA_CHECK" "=" java_boolean_literal ";"
|	"COMMON_TOKEN_ACTION" "=" java_boolean_literal ";"
|	"CACHE_TOKENS" "=" java_boolean_literal ";"
|	"OUTPUT_DIRECTORY" "=" java_string_literal ";"


## 语法结构

```javacc
/* 选项 */
options{
    UNICODE_INPUT=true;
}

/* 解析器定义 */
PARSER_BEGIN(MyParser)
package me.wener.myparser;
import java.util.*;
import java.math.*;
import static me.wener.myparser.ParserHelper.*;
public class MyParser {

}
PARSER_END(MyParser)

/* 忽略的内容 */
SKIP:
{
    " "
|   "\t"
|   "\r"
|   "\f"
}

/* 词法定义 */
TOKEN: {
    <LOGIC_OPERATOR: "&&" | "||" | "^" >
    | <PREFXI_OPERATOR : "!">
}

TOKEN: {
    < IDENTIFIER: <LETTER> (<LETTER>|<DIGIT>)*>
    | < INTEGER: (<DIGIT>)+ >
    | < #LETTER: ["a"-"z"] >
    | < #DIGIT: ["0"-"9"] >
    | < STRING:
    "'"
    (
        (~["\'","\\","\n","\r"])
        |("\\"
            ( ["n","t","b","r","f","\\","'","\""]
            | ["0"-"7"] ( ["0"-"7"] )?
            | ["0"-"3"] ["0"-"7"] ["0"-"7"]
            )
        )
    )*
    "'"
    >
}

/* 语法定义 */
Term Term():{
}{
    "$" <IDENTIFIER> {return new VariableTerm().setName(token.image);}
    | <INTEGER> {return new IntegerTerm().setValue(Long.parseLong(token.image));}
    | <STRING> {return new StringTerm().setValue(token.image.substring(1,token.image.length()-1));}
}
```
