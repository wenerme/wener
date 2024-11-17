/*
BeBasic VM Assembly

examples:

LD byte 1,b
*/
{{

const AsmCodes = {
  Register: 0,
  RegisterDeferred: 1,
  Immediate: 2,
  Direct: 3,
  RP: 0,
  RF: 1,
  RS: 2,
  RB: 3,
  R0: 4,
  R1: 5,
  R2: 6,
  R3: 7,
  DWORD: 0,
  WORD: 1,
  BYTE: 2,
  FLOAT: 3,
  INT: 4,
  // pseudo
  CHAR: 2,
  BIN: 2,
};

}}

{
function _inst(op) {
  // 	, location: location()
  op.op = op.op.replace(/'^.'/, "").toUpperCase();
  _operand(op.a);
  _operand(op.b);
  if (op.dataTypeName) {
    op.dataTypeName = op.dataTypeName.toUpperCase();
    op.dataType = AsmCodes[op.dataTypeName];
  }
  if (op.calculateTypeName) {
    op.calculateTypeName = op.calculateTypeName.toUpperCase();
    op.calculateType = AsmCodes[op.calculateTypeName];
  }
  if (op.compareTypeName) {
    op.compareTypeName = op.compareTypeName.toUpperCase();
    op.compareType = AsmCodes[op.compareTypeName];
  }
  return op;
}

function _operand(v) {
  if (!v) return;
  if (/^r[pfsb123]$/i.test(v.symbol)) {
    v.modeName = v.modeName === "Symbol" ? "Register" : "RegisterDeferred";
    v.symbol = v.symbol.toUpperCase();
    v.value = AsmCodes[v.symbol];
  } else if (v.symbol) {
    v.modeName = v.modeName === "Symbol" ? "Immediate" : "Direct";
  }
  v.mode = AsmCodes[v.modeName];
}
}

Grammar = all:(@Assembly (NL/EOF) / __ EOF {return null} / _ NL {return null})* EOF {return all.filter(Boolean)}

Assembly = _ asm:(@Comment / @Pseudo / @Inst / @Label) _ comment:Comment? {comment && (asm.comment = comment.comment);return asm}

Label = symbol:Identifier _ ':' {return _inst({op:'Label',symbol})}
Comment = ( ';' / "'" ) comment:$(!NL .)* {return _inst({op:'Comment',comment: comment.trim()})}


Inst
	= op:$('EXIT'i / 'NOP'i / 'RET'i) {return _inst({op})}
    / op:$('CALL'i / 'PUSH'i / 'POP'i / 'JMP'i) __ a:Operand  {return _inst({op,a})}
    / op:('IN'i/'OUT'i) __ a:Operand _ ',' _ b:Operand {return _inst({op,a,b})}
    / op:'CAL'i __ dataTypeName:DataType __ calculateTypeName:CalculateType __ a:Operand _ ',' _ b:Operand {return _inst({op,dataTypeName,calculateTypeName,a,b})}
	/ op:('LD'i/'CMP'i) __ dataTypeName:DataType __ a:Operand _ ',' _ b:Operand {return _inst({op,dataTypeName,a,b})}
    / op:'JPC'i __ compareTypeName:CompareType __ a:Operand {return _inst({op,compareTypeName,a})}

Pseudo
	= op:'DATA'i __ symbol:Identifier dataTypeName:(__ @PseudoDataType)? __ a:PseudoDataValue b:(_','_ @PseudoDataValue)* {return _inst({op,dataTypeName,symbol,values:[a,...b]})}
    / op:'.BLOCK'i _ a:int _ b:int {return _inst({op,a,b})}

DataType = "DWORD"i / "WORD"i / "BYTE"i / "FLOAT"i / "INT"i
PseudoDataType = DataType / "CHAR"i / "BIN"i
CalculateType = 'ADD'i / 'SUB'i / 'MUL'i / 'DIV'i / 'MOD'i
CompareType = 'BE'i / 'AE'i / 'NZ'i / 'Z'i / 'B'i / 'A'i


Operand = symbol:Identifier {return {symbol,modeName:'Symbol'}} / '[' _ symbol:Identifier _ ']' {return {symbol,modeName:'SymbolDeferred'}}  / v:int  {return {value:v,modeName:'Immediate'}} / '[' _ v:int _ ']'  {return {value:v,modeName:'Direct'}}

Identifier = head:[a-zA-Z] tail:[0-9a-zA-Z]*  {return head + tail.join('')}

PseudoDataValue = int / float / string / hex

hex	    = '%' hex:$[0-9a-fA-F]+ '%' {return {type: 'hex', hex: hex.toUpperCase()}}
int     = '-'? [0-9]+ {return parseInt(text())}
float   = [0-9]* '.'[0-9]+  {return parseFloat(text())}
string
  = "'" v:([^']*) "'" {return v.join('')}
  / '"' v:[^"]* '"'   {return v.join('')}

_ "whitespace" 	= white* {return ''}
__ "whitespace" = white+ {return ' '}
white
  =  [ \t]
EOF = !.
NL 	= '\n'
