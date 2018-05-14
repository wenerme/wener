// GraphQL Grammer
// ==============
// https://github.com/wenerme/wener/tree/master/tricks/languages/antlr/GraphQL.g4
//
// Appendix B -- Grammar Summary.md https://github.com/facebook/graphql/blob/master/spec/Appendix%20B%20--%20Grammar%20Summary.md
//
// Changes - search `//extension` in grammer to find out where has been extended
// - Add `extend by name` syntax for object and interface
// - Allowed use keyword as name
// - Allowed directives on directive definition, add DIRECTIVE location
// - Allowed schema has optional name
// - Allowed optional '&' for interface
//
// Notes
// - Change type to typeSpce for Go target to prevent name conflict
//

grammar GraphQL;

graphql : document ;

// 2.1 Source Text
// SourceCharacter : [\u0009\u000A\u000D\u0020-\uFFFF] ;

Ignored: (UnicodeBOM | WhiteSpace | LineTerminator | Comma) -> skip;

UnicodeBOM : [\uFEFF];

// Horizontal Tab/Space
WhiteSpace : [\u0009\u0020];

// New Line/Carriage Return New Line
// [\u000A] | '\u000D\u000A' | [\u000D]
LineTerminator : [\u000D\u000A]+;

Comment : '#' ~[\n\r\u2028\u2029]* -> channel(2);
// NOTE overlap with NAME
// CommentChar : ~[\u000D\u000A] ; // TODO SourceCharacter but not LineTerminator

Comma : ',' ;

// 2.1.9 Names
// NOTE: Allowed keyword as name
name
  : NAME
  | 'type' | 'fragment' | 'extend' | 'implements' | 'schema'
  | 'enum' | 'union' | 'interface' | 'input' | 'scalar' | 'directive'
  | 'query' | 'mutation' | 'subscription'
  | DirectiveLocation
  // | 'true' | 'false' | 'null' // NOTE boolean and null is NOT allowed
  | 'by' // keyword used by extensions
  // | 'on' // will confuse inline spread
  ;

// 2.2 Query Document
document
   : definition+ EOF
   ;
//extension
executableDocument
   : executableDefinition+ EOF
   ;

//extension
typeSystemDocument
   : typeSystemDefinition+ EOF
   ;

definition
  : executableDefinition
  | typeSystemDefinition
  ;

executableDefinition
  : operationDefinition
  | fragmentDefinition
  ;

// 2.3 Operations
operationDefinition
  : operationType name? variableDefinitions? directives? selectionSet
  | selectionSet
  ;
operationType : 'query' | 'mutation' | 'subscription' ;

// 2.4 Selection Sets
selectionSet : '{' selection+ '}' ;
selection
  : field
  | fragmentSpread
  | inlineFragment
  ;

// 2.5 Fields
field : alias? name arguments? directives? selectionSet? ;

// 2.6 Arguments
arguments : '(' argument+ ')' ;
argument : name ':' value ;

// 2.7 Field Alias

alias
   : name ':'
   ;

// 2.8 Fragments

fragmentSpread
   : '...' fragmentName directives?
   ;
fragmentDefinition
   : 'fragment' fragmentName typeCondition directives? selectionSet
   ;

fragmentName
   : name //  TODO name but not `on`
   ;
typeCondition
   : 'on' namedType
   ;
inlineFragment
   : '...' typeCondition? directives? selectionSet
   ;

//constValue
//   : STRING # stringValue | NUMBER # numberValue | BOOLEAN # booleanValue
//   ;


// 2.9 Input Values
value
  : variable
  | floatValue
  | intValue
  | stringValue
  | booleanValue
  | nullValue
  | enumValue
  | listValue
  | objectValue
  ;

// 2.9.1 Int Value
intValue : IntegerPart ;
IntegerPart
  : NegativeSign? '0'
  | NegativeSign? NonZeroDigit Digit*
  ;
NegativeSign : '-' ;
fragment Digit : [0123456789] ;
fragment NonZeroDigit : [123456789] ;

// 2.9.2 Float Value
floatValue
  : IntegerPart FractionalPart ExponentPart
  | IntegerPart ExponentPart
  | IntegerPart FractionalPart
  ;

FractionalPart : '.' Digit+ ;
ExponentPart : ExponentIndicator Sign? Digit+ ;
fragment ExponentIndicator : [eE] ;
fragment Sign : [+-] ;

// 2.9.3 Boolean Value
booleanValue : 'true' | 'false' ;

// 2.9.4 String Value
stringValue
  : StringConst
  ;
StringConst : '""' | '"' StringCharacter+ '"';
fragment StringCharacter
  : [\u0009\u0020\u0021\u0023-\u005B\u005D-\uFFFF] // SourceCharacter bit not " \u0022 or \ \u005C or LineTerminator
  | '\\u' EscapedUnicode
  | '\\' EscapedCharacter
  ;

fragment EscapedUnicode : [0-9A-Fa-f] [0-9A-Fa-f] [0-9A-Fa-f] [0-9A-Fa-f];

fragment EscapedCharacter : ["\\/bfnrt];

// 2.9.5 Null Value
nullValue : 'null' ;

// 2.9.6 Enum Value
enumValue
  : name
  ; // TODO name but not `true`, `false` or `null`

// 2.9.7 List Value
listValue
  : '[' ']'
  | '[' value+ ']'
  ;

// 2.9.8 Input Object Values
objectValue
  : '{' '}'
  | '{' objectField+ '}'
  ;
objectField : name ':' value ;

// 2.10 Variables
variable : '$' name ;
variableDefinitions : '(' variableDefinition+ ')' ;
variableDefinition : variable ':' type ( '='? defaultValue)? ;
defaultValue : value ;

// 2.11 Input Types
type
  : namedType
  | listType
  | nonNullType
  ;

namedType : name ;

listType : '[' type ']' ;

nonNullType : namedType '!' | listType '!' ;


// 2.12
directives : directive+ ;
directive : '@' name arguments? ;

// TypeSystemDefinition
// ====================
typeSystemDefinition
  : schemaDefinition
  | typeDefinition
  | typeExtension
  | directiveDefinition
  ;

//extension name?
schemaDefinition
: 'schema' name? directives? '{' operationTypeDefinition+ '}'
;
operationTypeDefinition : operationType ':' namedType;

description : stringValue ;

typeDefinition
  : scalarTypeDefinition
  | objectTypeDefinition
  | interfaceTypeDefinition
  | unionTypeDefinition
  | enumTypeDefinition
  | inputObjectTypeDefinition
  ;

typeExtension
  : scalarTypeExtension
  | objectTypeExtension
  | interfaceTypeExtension
  | unionTypeExtension
  | enumTypeExtension
  | inputObjectTypeExtension
  ;

scalarTypeDefinition : description? 'scalar' name directives?;

scalarTypeExtension : 'extend' 'scalar' name directives;

objectTypeDefinition : description? 'type' name implementsInterfaces? directives? fieldsDefinition?;

objectTypeExtension
  : 'extend' 'type' name implementsInterfaces? directives? fieldsDefinition
  | 'extend' 'type' name implementsInterfaces? directives
  | 'extend' 'type' name implementsInterfaces
  | 'extend' 'type' name 'by' name directives? fieldsDefinition? //extension
  ;
// Recursion  'implements' _ '&'? _ NamedType / ImplementsInterfaces _ '&' _ NamedType
implementsInterfaces
  : 'implements' '&'? namedType
  | implementsInterfaces '&'? namedType //extension optional '&'?
  ;

fieldsDefinition : '{' fieldDefinition+ '}' ;

fieldDefinition : description? name argumentsDefinition?  ':'  type  directives? ;

argumentsDefinition : '(' inputValueDefinition* ')' ;

inputValueDefinition : description? name ':' type ('='? defaultValue)? directives? ; // NOTE add '=' for default value

interfaceTypeDefinition : description? 'interface' name directives? fieldsDefinition? ;

interfaceTypeExtension
  : 'extend' 'interface' name directives? fieldsDefinition
  | 'extend' 'interface' name directives
  | 'extend' 'interface' name 'by' name directives? fieldsDefinition? //extension
  ;

unionTypeDefinition : description? 'union' name directives? unionMemberTypes? ;

// Recursion '=' _ '|'? _ NamedType / UnionMemberTypes '|' NamedType
unionMemberTypes
  : '=' '|'? namedType
  | unionMemberTypes '|' namedType
  ;


unionTypeExtension
  : 'extend' 'union' name directives? unionMemberTypes
  | 'extend' 'union' name directives
  ;
enumTypeDefinition : description? 'enum' name directives? enumValuesDefinition? ;

enumValuesDefinition : '{' enumValueDefinition+ '}' ;

enumValueDefinition : description? enumValue directives? ;

enumTypeExtension
  : 'extend' 'enum' name directives? enumValuesDefinition
  | 'extend' 'enum' name directives
  ;

inputObjectTypeDefinition : description? 'input' name directives? inputFieldsDefinition?;

inputFieldsDefinition : '{' inputValueDefinition+ '}' ;

inputObjectTypeExtension
  : 'extend' 'input' name directives? inputFieldsDefinition
  | 'extend' 'input' name directives
  ;
//extension directives? allowed directive on directive
directiveDefinition : description? 'directive' '@' name directives? argumentsDefinition? 'on' directiveLocations;

// Recursion '|'? _ DirectiveLocation / DirectiveLocations _ '|' _ DirectiveLocation
directiveLocations
  : '|'? DirectiveLocation
  | directiveLocations '|' DirectiveLocation
  ;


DirectiveLocation
  : ExecutableDirectiveLocation
  | TypeSystemDirectiveLocation
  ;

ExecutableDirectiveLocation
  : 'QUERY'
  | 'MUTATION'
  | 'SUBSCRIPTION'
  | 'FIELD'
  | 'FRAGMENT_DEFINITION'
  | 'FRAGMENT_SPREAD'
  | 'INLINE_FRAGMENT'
  ;

TypeSystemDirectiveLocation
  : 'SCHEMA'
  | 'SCALAR'
  | 'OBJECT'
  | 'FIELD_DEFINITION'
  | 'ARGUMENT_DEFINITION'
  | 'INTERFACE'
  | 'UNION'
  | 'ENUM'
  | 'ENUM_VALUE'
  | 'INPUT_OBJECT'
  | 'INPUT_FIELD_DEFINITION'
  | 'DIRECTIVE' //extension
  ;

// Must in the last
NAME : [_a-zA-Z] [_a-zA-Z0-9]* ;
