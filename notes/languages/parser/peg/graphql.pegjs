// GraphQL PEG.js Grammer
// ==============
// https://github.com/wenerme/wener/tree/master/notes/languages/peg/graphql.pegjs
//
// Try online https://pegjs.org/online
// Appendix B -- Grammar Summary.md https://github.com/facebook/graphql/blob/master/spec/Appendix%20B%20--%20Grammar%20Summary.md
//
// Changes
// - ArgumentsDefinition allowed empty
//

// Start rule
Grammar
  = Document

// Helper
_ = Ignored*
SP = _ ',' _ / _ // \u002C -> ,

// 2.1 Source Text
SourceCharacter
  = [\u0009\u000A\u000D\u0020-\uFFFF]

Ignored
  = UnicodeBOM
  / WhiteSpace
  / LineTerminator
  / Comment
  / Comma

UnicodeBOM
  = [\uFEFF]

// Horizontal Tab/Space
WhiteSpace
  = [\u0009\u0020]

// New Line/Carriage Return New Line
LineTerminator
  = [\u000A] / '\u000D\u000A' / [\u000D]

Comment
  = '#' CommentChar*
CommentChar
 = [^\u000D\u000A] // TODO SourceCharacter but not LineTerminator

Comma
  = ','

// 2.1.9 Names
Name
  = [_A-Za-z][_0-9A-Za-z]*

// 2.2 Query Document
Document
  = (Definition _)+
Definition
  = ExecutableDefinition
  / TypeSystemDefinition

ExecutableDefinition
  = OperationDefinition
  / FragmentDefinition

// 2.3 Operations
OperationDefinition
  = OperationType Name? VariableDefinitions? Directives? SelectionSet
  / SelectionSet
OperationType
  = 'query' / 'mutation' / 'subscription'

// 2.4 Selection Sets
SelectionSet
  = '{' _ Selection+ _ '}'
Selection
  = Field
  / FragmentSpread
  / InlineFragment

// 2.5 Fields
Field
  = Alias? Name Arguments? Directives? SelectionSet?

// 2.6 Arguments
Arguments
  = '(' _ (Argument SP)+ _ ')'
Argument
  = Name _ ':' _ Value

// 2.7 Field Alias
Alias
  = Name ':'

// 2.8 Fragments
FragmentSpread
  = '...' _ FragmentName _ Directives?
FragmentDefinition
  = 'fragment' _ FragmentName _ TypeCondition _ Directives? SelectionSet
FragmentName
  = Name //  TODO Name but not `on`

TypeCondition
  = 'on' _ NamedType

InlineFragment
  = '...' _ TypeCondition? Directives? SelectionSet

// 2.9 Input Values
Value
  = Variable
  / FloatValue
  / IntValue
  / StringValue
  / BooleanValue
  / NullValue
  / EnumValue
  / ListValue
  / ObjectValue

// 2.9.1 Int Value
IntValue
  = IntegerPart
IntegerPart
  = NegativeSign? '0'
  / NegativeSign? NonZeroDigit Digit*
NegativeSign
  = '-'
Digit
  = [0123456789]
NonZeroDigit
  = [123456789]

// 2.9.2 Float Value
FloatValue
  = IntegerPart FractionalPart ExponentPart
  / IntegerPart ExponentPart
  / IntegerPart FractionalPart

FractionalPart
  = '.' Digit+
ExponentPart
  = ExponentIndicator Sign? Digit+
ExponentIndicator
  = [eE]
Sign
  = [+-]

// 2.9.3 Boolean Value
BooleanValue
  = 'true'/'false'

// 2.9.4 String Value
StringValue
  = '""'
  / '"' StringCharacter+ '"'

StringCharacter
  = [\u0009\u0020\u0021\u0023-\u005B\u005D-\uFFFF] // SourceCharacter bit not " \u0022 or \ \u005C or LineTerminator
  / '\\u' EscapedUnicode
  / '\\' EscapedCharacter

EscapedUnicode
  = [0-9A-Fa-f]{4}

EscapedCharacter
  = [\"\\/bfnrt]

// 2.9.5 Null Value
NullValue
  = 'null'

// 2.9.6 Enum Value
EnumValue
  = Name // TODO Name but not `true`, `false` or `null`

// 2.9.7 List Value
ListValue
  = '[' _ ']'
  / '[' _ (Value SP)+ _ ']'

// 2.9.8 Input Object Values
ObjectValue
  = '{' _ '}'
  / '{' _ (ObjectField SP)+ _ '}'
ObjectField
  = Name _ ':' _ Value

// 2.10 Variables
Variable
  = '$' Name
VariableDefinitions
  = '(' _ VariableDefinition _ ')'
VariableDefinition
  = Variable _ ':' _ Type DefaultValue?
DefaultValue
  = Value

// 2.11 Input Types
Type
  = NonNullType
  / NamedType
  / ListType

NamedType
  = Name

ListType
  = '[' _ Type _ ']'

NonNullType
  = NamedType '!'
  / ListType '!'

// 2.12
Directives
  = (Directive SP)+
Directive
  = '@' Name Arguments?

// TypeSystemDefinition
TypeSystemDefinition
  = SchemaDefinition
  / TypeDefinition
  / TypeExtension
  / DirectiveDefinition

SchemaDefinition
  = 'schema' _ Directives? _ '{' _ (OperationTypeDefinition SP)+ _ '}'

OperationTypeDefinition = OperationType _ ':' _ NamedType
Description = StringValue

TypeDefinition
  = ScalarTypeDefinition
  / ObjectTypeDefinition
  / InterfaceTypeDefinition
  / UnionTypeDefinition
  / EnumTypeDefinition
  / InputObjectTypeDefinition

TypeExtension
  = ScalarTypeExtension
  / ObjectTypeExtension
  / InterfaceTypeExtension
  / UnionTypeExtension
  / EnumTypeExtension
  / InputObjectTypeExtension
ScalarTypeDefinition = Description? _ 'scalar' _ Name _ Directives?

ScalarTypeExtension = 'extend' _ 'scalar' _ Name _ Directives

ObjectTypeDefinition = Description? _ 'type' _ Name _ ImplementsInterfaces? _ Directives? _ FieldsDefinition?

ObjectTypeExtension
  = 'extend' _ 'type' _ Name _ ImplementsInterfaces? _ Directives? FieldsDefinition
  / 'extend' _ 'type' _ Name _ ImplementsInterfaces? _ Directives
  / 'extend' _ 'type' _ Name _ ImplementsInterfaces
// Recursion  'implements' _ '&'? _ NamedType / ImplementsInterfaces _ '&' _ NamedType
ImplementsInterfaces
  = 'implements' _ '&'? _ (NamedType _ '&' _)* _ NamedType

FieldsDefinition = '{' _ (FieldDefinition SP)+ _ '}'

FieldDefinition = Description? _ Name _ ArgumentsDefinition? _ ':' _ Type _ Directives?

ArgumentsDefinition = '(' (InputValueDefinition SP)* ')'

InputValueDefinition = Description? _ Name _ ':' _ Type _ DefaultValue? _ Directives?

InterfaceTypeDefinition = Description? _ 'interface' _ Name _ Directives? _ FieldsDefinition?

InterfaceTypeExtension
  = 'extend' _ 'interface' _ Name _ Directives? _ FieldsDefinition
  / 'extend' _ 'interface' _ Name _ Directives
UnionTypeDefinition = Description? _ 'union' _ Name _ Directives? _ UnionMemberTypes?

// Recursion '=' _ '|'? _ NamedType / UnionMemberTypes '|' NamedType
UnionMemberTypes
  = '=' _ '|'? _ (NamedType _ '|' _)* NamedType

UnionTypeExtension
  = 'extend' _ 'union' _ Name _ Directives? _ UnionMemberTypes
  / 'extend' _ 'union' _ Name _ Directives
EnumTypeDefinition = Description? _ 'enum' _ Name _ Directives? _ EnumValuesDefinition?

EnumValuesDefinition = '{' (EnumValueDefinition SP)+ '}'

EnumValueDefinition = Description? _ EnumValue _ Directives?

EnumTypeExtension
  = 'extend' _ 'enum' _ Name _ Directives? _ EnumValuesDefinition
  / 'extend' _ 'enum' _ Name _ Directives

InputObjectTypeDefinition = Description? _ 'input' _ Name _ Directives? _ InputFieldsDefinition?

InputFieldsDefinition = '{' (InputValueDefinition SP)+ '}'

InputObjectTypeExtension
  = 'extend' _ 'input' _ Name _ Directives? _ InputFieldsDefinition
  / 'extend' _ 'input' _ Name _ Directives
DirectiveDefinition = Description? _ 'directive' _ '@' _ Name _ ArgumentsDefinition? _ 'on' _ DirectiveLocations

// Recursion '|'? _ DirectiveLocation / DirectiveLocations _ '|' _ DirectiveLocation
DirectiveLocations
  = '|'? _ (DirectiveLocation _ '|' _ )* DirectiveLocation


DirectiveLocation
  = ExecutableDirectiveLocation
  / TypeSystemDirectiveLocation

ExecutableDirectiveLocation
  = 'QUERY'
  / 'MUTATION'
  / 'SUBSCRIPTION'
  / 'FIELD'
  / 'FRAGMENT_DEFINITION'
  / 'FRAGMENT_SPREAD'
  / 'INLINE_FRAGMENT'

TypeSystemDirectiveLocation
  = 'SCHEMA'
  / 'SCALAR'
  / 'OBJECT'
  / 'FIELD_DEFINITION'
  / 'ARGUMENT_DEFINITION'
  / 'INTERFACE'
  / 'UNION'
  / 'ENUM'
  / 'ENUM_VALUE'
  / 'INPUT_OBJECT'
  / 'INPUT_FIELD_DEFINITION'
