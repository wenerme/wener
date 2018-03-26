// BeBasic Virtual Machine Assembly Grammer
// ==============
// https://github.com/wenerme/wener/tree/master/tricks/languages/antlr/BBAsm.g4
//
// Changes
// - Allowed keywords as label
//

grammar BBAsm;

WS  :  [ \t\u000C]+ -> skip
    ;

EOL : '\r\n' | '\r' | '\n' ;

bbasm: asm+ EOF ;
asm
  : EOL
  | Comment EOL
  | expression Comment? EOL
  ;

expression
  : instruction     #InstructionExpression
  | identifier ':'  #LabelExpression
  ;

instruction
  : NOP                       #NopInstruction
  | RET                       #ReturnInstruction
  | EXIT                      #ExitInstruction
  | JMP   operand             #JumpInstruction
  | CALL  operand             #CallInstruction
  | PUSH  operand             #PushInstruction
  | POP   operand             #PopInstruction
  | IN    operand ',' operand #InInstruction
  | OUT   operand ',' operand #OutInstruction
  | CAL   DataType CalculateOperator operand ',' operand  #CalcInstruction     // CAL int ADD r0,12
  | LD    DataType operand ',' operand                    #LoadInstruction     // ld int r1, 1067320848
  | CMP   CompareOperator operand                         #CompareInstruction  // jpc a some-where
  | BLOCK intValue intValue                               #BlockInstruction    // .block 1 10
  | DATA  identifier DataType? dataValue (',' dataValue)* #DataInstruction
  ;

operand
  : Register
  | '[' Register ']'
  | identifier
  | '[' identifier ']'
  | intValue
  | '[' intValue ']'
  | floatValue
  ;

dataValue
  : intValue
  | floatValue
  | stringValue
  // TODO hexByteValue
  ;

identifier
  : Identifier
  | Register
  | CompareOperator
  | CalculateOperator
  | DataType
  ;

Register
  : R P
  | R F
  | R S
  | R B
  | R '0'
  | R '1'
  | R '2'
  | R '3'
  ;

CompareOperator
	: Z
	| B
	| B E
	| A
	| A E
	| N Z
	;

CalculateOperator
	: A D D
	| S U B
	| M U L
	| D I V
	| M O D
	;

DataType
	: D W O R D
	| W O R D
	| B Y T E
	| F L O A T
	| I N T
  | C H A R   // same as byte
  | B I N     // same as byte
 	;

NOP    : N O P;
LD     : L D;
PUSH   : P U S H;
POP    : P O P;
IN     : I N;
OUT    : O U T;
JMP    : J M P;
JPC    : J P C;
CALL   : C A L L;
RET    : R E T;
CMP    : C M P;
CAL    : C A L;
EXIT   : E X I T;
DATA   : D A T A;
BLOCK  : '.'? B L O C K;

Comment : [;'] ~[\r\n]* ;

intValue : IntegerPart ;
IntegerPart
  : NegativeSign? '0'
  | NegativeSign? NonZeroDigit Digit*
  ;
NegativeSign : '-' ;
fragment Digit : [0123456789] ;
fragment NonZeroDigit : [123456789] ;

floatValue
  : IntegerPart FractionalPart ExponentPart
  | IntegerPart ExponentPart
  | IntegerPart FractionalPart
  ;

FractionalPart : '.' Digit+ ;
ExponentPart : ExponentIndicator Sign? Digit+ ;
fragment ExponentIndicator : [eE] ;
fragment Sign : [+-] ;

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

Identifier : [_a-zA-Z] [_a-zA-Z0-9]* ;

fragment A : [aA];
fragment B : [bB];
fragment C : [cC];
fragment D : [dD];
fragment E : [eE];
fragment F : [fF];
fragment G : [gG];
fragment H : [hH];
fragment I : [iI];
fragment J : [jJ];
fragment K : [kK];
fragment L : [lL];
fragment M : [mM];
fragment N : [nN];
fragment O : [oO];
fragment P : [pP];
fragment Q : [qQ];
fragment R : [rR];
fragment S : [sS];
fragment T : [tT];
fragment U : [uU];
fragment V : [vV];
fragment W : [wW];
fragment X : [xX];
fragment Y : [yY];
fragment Z : [zZ];
