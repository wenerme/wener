http://jazzy.id.au/default/2008/10/30/list_of_suppresswarnings_arguments.html
http://stackoverflow.com/questions/1205995/what-is-the-list-of-valid-suppresswarnings-warning-names-in-java



Warning Description	|	Warning Name
- | -
"Magic character"	|	MagicCharacter
"Magic number"	|	MagicNumber
'Comparator.compare()' method does not use parameter	|	ComparatorMethodParameterNotUsed
'Connection.prepare*()' call with non-constant string	|	JDBCPrepareStatementWithNonConstantString
'Iterator.hasNext()' which calls 'next()'	|	IteratorHasNextCallsIteratorNext
'Iterator.next()' which can't throw 'NoSuchElementException'	|	IteratorNextCanNotThrowNoSuchElementException
'Statement.execute()' call with non-constant string	|	JDBCExecuteWithNonConstantString
'String.equals("")'	|	StringEqualsEmptyString
'StringBuffer' may be 'StringBuilder' (JDK 5.0 only)	|	StringBufferMayBeStringBuilder
'StringBuffer.toString()' in concatenation	|	StringBufferToStringInConcatenation
'assert' statement	|	AssertStatement
'assertEquals()' between objects of inconvertible types	|	AssertEqualsBetweenInconvertibleTypes
'await()' not in loop	|	AwaitNotInLoop
'await()' without corresponding 'signal()'	|	AwaitWithoutCorrespondingSignal
'break' statement	|	BreakStatement
'break' statement with label	|	BreakStatementWithLabel
'catch' generic class	|	CatchGenericClass
'clone()' does not call 'super.clone()'	|	CloneDoesntCallSuperClone
'clone()' does not declare 'CloneNotSupportedException'	|	CloneDoesntDeclareCloneNotSupportedException
'clone()' instantiates objects with constructor	|	CloneCallsConstructors
'clone()' method in non-Cloneable class	|	CloneInNonCloneableClass
'compareto()' instead of 'compareTo()'	|	MisspelledCompareTo
'continue' or 'break' inside 'finally' block	|	ContinueOrBreakFromFinallyBlock
'continue' statement	|	ContinueStatement
'continue' statement with label	|	ContinueStatementWithLabel
'default' not last case in 'switch'	|	DefaultNotLastCaseInSwitch
'equal()' instead of 'equals()'	|	MisspelledEquals
'equals()' between objects of inconvertible types	|	EqualsBetweenInconvertibleTypes
'equals()' called on array type	|	ArrayEquals
'equals()' called on java.math.BigDecimal	|	BigDecimalEquals
'equals()' method which does not check class of parameter	|	EqualsWhichDoesntCheckParameterClass
'equals()' or 'hashCode()' called on java.net.URL object	|	EqualsHashCodeCalledOnUrl
'final' class	|	FinalClass
'final' method	|	FinalMethod
'final' method in 'final' class	|	FinalMethodInFinalClass
'finalize()' called explicitly	|	FinalizeCalledExplicitly
'finalize()' declaration	|	FinalizeDeclaration
'finalize()' does not call 'super.finalize()'	|	FinalizeDoesntCallSuperFinalize
'finalize()' not declared 'protected'	|	FinalizeNotProtected
'finally' block which can not complete normally	|	finally
'for' loop may be replaced by 'while' loop	|	ForLoopReplaceableByWhile
'for' loop replaceable by 'for each'	|	ForLoopReplaceableByForEach
'for' loop where update or condition does not use loop variable	|	ForLoopThatDoesntUseLoopVariable
'for' loop with missing components	|	ForLoopWithMissingComponent
'hashcode()' instead of 'hashCode()'	|	MisspelledHashcode
'if' statement with identical branches	|	IfStatementWithIdenticalBranches
'if' statement with negated condition	|	IfStatementWithNegatedCondition
'if' statement with too many branches	|	IfStatementWithTooManyBranches
'indexOf()' expression is replaceable by 'contains()'	|	ListIndexOfReplaceableByContains
'instanceof' a concrete class	|	InstanceofInterfaces
'instanceof' check for 'this'	|	InstanceofThis
'instanceof' on 'catch' parameter	|	InstanceofCatchParameter
'instanceof' with incompatible interface	|	InstanceofIncompatibleInterface
'notify()' or 'notifyAll()' called on java.util.concurrent.locks.Condition object	|	NotifyCalledOnCondition
'notify()' or 'notifyAll()' while not synced	|	NotifyNotInSynchronizedContext
'notify()' or 'notifyAll()' without corresponding state change	|	NakedNotify
'notify()' without corresponding 'wait()'	|	NotifyWithoutCorrespondingWait
'private' method declared 'final'	|	FinalPrivateMethod
'protected' member in 'final' class	|	ProtectedMemberInFinalClass
'public' constructor in non-public class	|	PublicConstructorInNonPublicClass
'readObject()' or 'writeObject()' not declared 'private'	|	NonPrivateSerializationMethod
'readResolve()' or 'writeReplace()' not declared 'protected'	|	ReadResolveAndWriteReplaceProtected
'return' inside 'finally' block	|	ReturnInsideFinallyBlock
'serialPersistentFields' field not declared 'private static final ObjectStreamField[]'	|	SerialPersistentFieldsWithWrongSignature
'serialVersionUID' field not declared 'private static final long'	|	SerialVersionUIDWithWrongSignature
'setUp()' does not call 'super.setUp()'	|	SetUpDoesntCallSuperSetUp
'setUp()' with incorrect signature	|	SetUpWithIncorrectSignature
'setup()' instead of 'setUp()'	|	MisspelledSetUp
'signal()' without corresponding 'await()'	|	SignalWithoutCorrespondingAwait
'size() == 0' replaceable by 'isEmpty()'	|	SizeReplaceableByIsEmpty
'static' method declared 'final'	|	FinalStaticMethod
'static', non-'final' field	|	StaticNonFinalField
'suite()' method not declared 'static'	|	SuiteNotDeclaredStatic
'switch' statement	|	SwitchStatement
'switch' statement with too few branches	|	SwitchStatementWithTooFewBranches
'switch' statement with too low of a branch density	|	SwitchStatementDensity
'switch' statement with too many branches	|	SwitchStatementWithTooManyBranches
'switch' statement without 'default' branch	|	SwitchStatementWithoutDefaultBranch
'synchronized' method	|	SynchronizedMethod
'tearDown()' does not call 'super.tearDown()'	|	TearDownDoesntCallSuperTearDown
'tearDown()' with incorrect signature	|	TearDownWithIncorrectSignature
'teardown()' instead of 'tearDown()'	|	MisspelledTearDown
'this' reference escaped in object construction	|	ThisEscapedInObjectConstruction
'throw' caught by containing 'try' statement	|	ThrowCaughtLocally
'throw' inside 'catch' block which ignores the caught exception	|	ThrowInsideCatchBlockWhichIgnoresCaughtException
'throw' inside 'finally' block	|	ThrowFromFinallyBlock
'tostring()' instead of 'toString()'	|	MisspelledToString
'wait()' called on java.util.concurrent.locks.Condition object	|	WaitCalledOnCondition
'wait()' not in loop	|	WaitNotInLoop
'wait()' or 'await()' without timeout	|	WaitOrAwaitWithoutTimeout
'wait()' while holding two locks	|	WaitWhileHoldingTwoLocks
'wait()' while not synced	|	WaitWhileNotSynced
'wait()' without corresponding 'notify()'	|	WaitWithoutCorrespondingNotify
'while' loop replaceable by 'for each'	|	WhileLoopReplaceableByForEach
* import	|	OnDemandImport
Abstract class extends concrete class	|	AbstractClassExtendsConcreteClass
Abstract class which has no concrete subclass	|	AbstractClassNeverImplemented
Abstract class which has only one direct inheritor	|	AbstractClassWithOnlyOneDirectInheritor
Abstract class without abstract methods	|	AbstractClassWithoutAbstractMethods
Abstract method call in constructor	|	AbstractMethodCallInConstructor
Abstract method overrides abstract method	|	AbstractMethodOverridesAbstractMethod
Abstract method overrides concrete method	|	AbstractMethodOverridesConcreteMethod
Abstract method with missing implementations	|	AbstractMethodWithMissingImplementations
Access of system properties	|	AccessOfSystemProperties
Access to non thread-safe static field from instance	|	AccessToNonThreadSafeStaticFieldFromInstance
Access to static field locked on instance data	|	AccessToStaticFieldLockedOnInstance
Accessing a non-public field of another object	|	AccessingNonPublicFieldOfAnotherObject
Annotation	|	Annotation
Annotation class	|	AnnotationClass
Annotation naming convention	|	AnnotationNamingConvention
Anonymous class variable hides variable in containing method	|	AnonymousClassVariableHidesContainingMethodVariable
Anonymous inner class	|	AnonymousInnerClass
Anonymous inner class may be a named static inner class	|	AnonymousInnerClassMayBeStatic
Anonymous inner class with too many methods	|	AnonymousInnerClassWithTooManyMethods
Arithmetic operation on volatile field	|	ArithmeticOnVolatileField
Array.length in loop condition	|	ArrayLengthInLoopCondition
Assignment replaceable with operator assignment	|	AssignmentReplaceableWithOperatorAssignment
Assignment to 'for' loop parameter	|	AssignmentToForLoopParameter
Assignment to 'null'	|	AssignmentToNull
Assignment to Collection or array field from parameter	|	AssignmentToCollectionOrArrayFieldFromParameter
Assignment to Date or Calendar field from parameter	|	AssignmentToDateFieldFromParameter
Assignment to catch block parameter	|	AssignmentToCatchBlockParameter
Assignment to method parameter	|	AssignmentToMethodParameter
Assignment to static field from instance method	|	AssignmentToStaticFieldFromInstanceMethod
Assignment used as condition	|	AssignmentUsedAsCondition
Auto-boxing	|	AutoBoxing
Auto-unboxing	|	AutoUnboxing
Boolean constructor call	|	BooleanConstructorCall
Boolean method name must start with question word	|	BooleanMethodNameMustStartWithQuestion
Busy wait	|	BusyWait
C-style array declaration	|	CStyleArrayDeclaration
Call to 'Collection.toArray()' with zero-length array argument	|	ToArrayCallWithZeroLengthArrayArgument
Call to 'Date.toString()'	|	CallToDateToString
Call to 'Runtime.exec()'	|	CallToRuntimeExecWithNonConstantString
Call to 'String.compareTo()'	|	CallToStringCompareTo
Call to 'String.concat()' can be replaced by '+'	|	CallToStringConcatCanBeReplacedByOperator
Call to 'String.equals()'	|	CallToStringEquals
Call to 'String.equalsIgnoreCase()'	|	CallToStringEqualsIgnoreCase
Call to 'String.toUpperCase()' or 'toLowerCase()' without a Locale	|	StringToUpperCaseOrToLowerCaseWithoutLocale
Call to 'System.exit()' or related methods	|	CallToSystemExit
Call to 'System.getenv()'	|	CallToSystemGetenv
Call to 'System.loadLibrary()' with non-constant string	|	LoadLibraryWithNonConstantString
Call to 'System.runFinalizersOnExit()'	|	CallToSystemRunFinalizersOnExit
Call to 'System.setSecurityManager()'	|	CallToSystemSetSecurityManager
Call to 'Thread.dumpStack()'	|	CallToThreadDumpStack
Call to 'Thread.run()'	|	CallToThreadRun
Call to 'Thread.setPriority()'	|	CallToThreadSetPriority
Call to 'Thread.sleep()' while synchronized	|	SleepWhileHoldingLock
Call to 'Thread.start()' during object construction	|	CallToThreadStartDuringObjectConstruction
Call to 'Thread.stop()', 'suspend()' or 'resume()'	|	CallToThreadStopSuspendOrResumeManager
Call to 'Thread.yield()'	|	CallToThreadYield
Call to 'Time.toString()'	|	CallToTimeToString
Call to 'intern()' on String constant	|	ConstantStringIntern
Call to 'notify()' instead of 'notifyAll()'	|	CallToNotifyInsteadOfNotifyAll
Call to 'printStackTrace()'	|	CallToPrintStackTrace
Call to 'signal()' instead of 'signalAll()'	|	CallToSignalInsteadOfSignalAll
Call to Numeric 'toString()'	|	CallToNumericToString
Call to String.replaceAll(".", ...)	|	ReplaceAllDot
Call to a native method while locked	|	CallToNativeMethodWhileLocked
Call to default 'toString()'	|	ObjectToString
Call to simple getter from within class	|	CallToSimpleGetterFromWithinClass
Call to simple setter from within class	|	CallToSimpleSetterFromWithinClass
Calls to 'System.gc()' or 'Runtime.gc()'	|	CallToSystemGC
Cast conflicts with 'instanceof'	|	CastConflictsWithInstanceof
Cast to a concrete class	|	CastToConcreteClass
Casting to incompatible interface	|	CastToIncompatibleInterface
Caught exception is immediately rethrown	|	CaughtExceptionImmediatelyRethrown
Chain of 'instanceof' checks	|	ChainOfInstanceofChecks
Chained equality comparisons	|	ChainedEqualityComparisons
Chained method calls	|	ChainedMethodCall
Channel opened but not safely closed	|	ChannelOpenedButNotSafelyClosed
Character comparison	|	CharacterComparison
Checked exception class	|	CheckedExceptionClass
Class escapes defined scope	|	ClassEscapesDefinedScope
Class explicitly extends a Collection class	|	ClassExtendsConcreteCollection
Class explicitly extends java.lang.Object	|	ClassExplicitlyExtendsObject
Class explicitly extends java.lang.Thread	|	ClassExplicitlyExtendsThread
Class extends annotation interface	|	ClassExplicitlyAnnotation
Class extends utility class	|	ExtendsUtilityClass
Class may be interface	|	ClassMayBeInterface
Class name differs from file name	|	ClassNameDiffersFromFileName
Class name prefixed with package name	|	ClassNamePrefixedWithPackageName
Class name same as ancestor name	|	ClassNameSameAsAncestorName
Class naming convention	|	ClassNamingConvention
Class references one of its subclasses	|	ClassReferencesSubclass
Class too deep in inheritance tree	|	ClassTooDeepInInheritanceTree
Class with multiple loggers	|	ClassWithMultipleLoggers
Class with too many constructors	|	ClassWithTooManyConstructors
Class with too many fields	|	ClassWithTooManyFields
Class with too many methods	|	ClassWithTooManyMethods
Class without 'toString()'	|	ClassWithoutToString
Class without constructor	|	ClassWithoutConstructor
Class without logger	|	ClassWithoutLogger
Class without no-arg constructor	|	ClassWithoutNoArgConstructor
Class without package statement	|	ClassWithoutPackageStatement
ClassLoader instantiation	|	ClassLoaderInstantiation
Cloneable class in secure context	|	CloneableClassInSecureContext
Cloneable class without 'clone()'	|	CloneableClassWithoutClone
Collection added to self	|	CollectionAddedToSelf
Collection declared by class, not interface	|	CollectionDeclaredAsConcreteClass
Collection without initial capacity	|	CollectionWithoutInitialCapacity
Comparable implemented but 'equals()' not overridden	|	ComparableImplementedButEqualsNotOverridden
Comparator class not declared Serializable	|	ComparatorNotSerializable
Comparison of 'short' and 'char' values	|	ComparisonOfShortAndChar
Comparison to Double.NaN or Float.NaN	|	ComparisonToNaN
Concatenation with empty string	|	ConcatenationWithEmptyString
Conditional expression (?:)	|	ConditionalExpression
Conditional expression with identical branches	|	ConditionalExpressionWithIdenticalBranches
Conditional expression with negated condition	|	ConditionalExpressionWithNegatedCondition
Conditional that can be simplified to && or ||	|	SimplifiableConditionalExpression
Confusing 'else' branch	|	ConfusingElseBranch
Confusing 'main()' method	|	ConfusingMainMethod
Confusing 'null' argument to var-arg method	|	NullArgumentToVariableArgMethod
Confusing floating-point literal	|	ConfusingFloatingPointLiteral
Confusing octal escape sequence	|	ConfusingOctalEscapeSequence
Confusing primitive array argument to var-arg method	|	PrimitiveArrayArgumentToVariableArgMethod
Connection opened but not safely closed	|	ConnectionOpenedButNotSafelyClosed
Constant StringBuffer may be String	|	StringBufferReplaceableByString
Constant call to java.lang.Math or StrictMath	|	ConstantMathCall
Constant conditional expression	|	ConstantConditionalExpression
Constant declared in abstract class	|	ConstantDeclaredInAbstractClass
Constant declared in interface	|	ConstantDeclaredInInterface
Constant if statement	|	ConstantIfStatement
Constant naming convention	|	ConstantNamingConvention
Constant on left side of comparison	|	ConstantOnLeftSideOfComparison
Constant on right side of comparison	|	ConstantOnRightSideOfComparison
Constructor not 'protected' in 'abstract' class	|	ConstructorNotProtectedInAbstractClass
Constructor with too many parameters	|	ConstructorWithTooManyParameters
Control flow statement without braces	|	ControlFlowStatementWithoutBraces
Covariant 'compareTo()'	|	CovariantCompareTo
Covariant 'equals()'	|	CovariantEquals
Custom ClassLoader	|	CustomClassloader
Custom SecurityManager	|	CustomSecurityManager
Deserializable class in secure context	|	DeserializableClassInSecureContext
Design for extension	|	DesignForExtension
Division by zero	|	divzero
Double negation	|	DoubleNegation
Double-checked locking	|	DoubleCheckedLocking
Duplicate condition in 'if' statement	|	DuplicateCondition
Duplicate condition on '&&' or '||'	|	DuplicateBooleanBranch
Empty 'catch' block	|	EmptyCatchBlock
Empty 'finally' block	|	EmptyFinallyBlock
Empty 'synchronized' statement	|	EmptySynchronizedStatement
Empty 'try' block	|	EmptyTryBlock
Empty class	|	EmptyClass
Empty class initializer	|	EmptyClassInitializer
Enum 'switch' statement that misses case	|	EnumSwitchStatementWhichMissesCases
Enumerated class	|	EnumClass
Enumerated class naming convention	|	EnumeratedClassNamingConvention
Enumerated constant naming convention	|	EnumeratedConstantNamingConvention
Enumeration can be iteration	|	EnumerationCanBeIteration
Exception class name does not end with 'Exception'	|	ExceptionClassNameDoesntEndWithException
Extended 'for' statement	|	ForeachStatement
Externalizable class with 'readObject()' or 'writeObject()'	|	ExternalizableClassWithSerializationMethods
Fallthrough in 'switch' statement	|	fallthrough
Feature envy	|	FeatureEnvy
Field accessed in both synchronized and unsynchronized contexts	|	FieldAccessedSynchronizedAndUnsynchronized
Field has setter but no getter	|	FieldHasSetterButNoGetter
Field may be 'static'	|	FieldMayBeStatic
Field name hides field in superclass	|	FieldNameHidesFieldInSuperclass
Field repeatedly accessed in method	|	FieldRepeatedlyAccessedInMethod
Floating point equality comparison	|	FloatingPointEquality
Hardcoded file separator	|	HardcodedFileSeparator
Hardcoded line separator	|	HardcodedLineSeparator
Hibernate resource opened but not safely closed	|	HibernateResourceOpenedButNotSafelyClosed
I/O resource opened but not safely closed	|	IOResourceOpenedButNotSafelyClosed
If statement may be replaced by && or || expression	|	SimplifiableIfStatement
Implicit call to 'super()'	|	ImplicitCallToSuper
Implicit call to array '.toString()'	|	ImplicitArrayToString
Implicit numeric conversion	|	ImplicitNumericConversion
Import from same package	|	SamePackageImport
Incompatible bitwise mask operation	|	IncompatibleBitwiseMaskOperation
Infinite loop statement	|	InfiniteLoopStatement
Infinite recursion	|	InfiniteRecursion
Inner class field hides outer class field	|	InnerClassFieldHidesOuterClassField
Inner class may be 'static'	|	InnerClassMayBeStatic
Inner class of interface	|	InnerClassOfInterface
Inner class too deeply nested	|	InnerClassTooDeeplyNested
Insecure random number generation	|	UnsecureRandomNumberGeneration
Inspection suppression annotation	|	SuppressionAnnotation
Instance method naming convention	|	InstanceMethodNamingConvention
Instance variable may not be initialized	|	InstanceVariableMayNotBeInitialized
Instance variable may not be initialized by 'readObject()'	|	InstanceVariableMayNotBeInitializedByReadObject
Instance variable naming convention	|	InstanceVariableNamingConvention
Instance variable of concrete class	|	InstanceVariableOfConcreteClass
Instance variable used before initialized	|	InstanceVariableUsedBeforeInitialized
Instantiating a SimpleDateFormat without a Locale	|	SimpleDateFormatWithoutLocale
Instantiating a Thread with default 'run()' method	|	InstantiatingAThreadWithDefaultRunMethod
Instantiating object to get Class object	|	InstantiatingObjectToGetClassObject
Instantiation of utility class	|	InstantiationOfUtilityClass
Integer division in floating point context	|	IntegerDivisionInFloatingPointContext
Integer multiplication or shift implicitly cast to long	|	IntegerMultiplicationImplicitCastToLong
Interface naming convention	|	InterfaceNamingConvention
Interface which has no concrete subclass	|	InterfaceNeverImplemented
Interface which has only one direct inheritor	|	InterfaceWithOnlyOneDirectInheritor
JDBC resource opened but not safely closed	|	JDBCResourceOpenedButNotSafelyClosed
JNDI resource opened but not safely closed	|	JNDIResourceOpenedButNotSafelyClosed
JUnit TestCase in product source	|	JUnitTestCaseInProductSource
JUnit TestCase with non-trivial constructors	|	JUnitTestCaseWithNonTrivialConstructors
JUnit abstract test class naming convention	|	JUnitAbstractTestClassNamingConvention
JUnit test case with no tests	|	JUnitTestCaseWithNoTests
JUnit test class naming convention	|	JUnitTestClassNamingConvention
JUnit test method in product source	|	JUnitTestMethodInProductSource
JUnit test method without any assertions	|	JUnitTestMethodWithNoAssertions
Labeled statement	|	LabeledStatement
Large array allocation with no OutOfMemoryError check	|	CheckForOutOfMemoryOnLargeArrayAllocation
Limited-scope inner class	|	LimitedScopeInnerClass
Local variable hides member variable	|	LocalVariableHidesMemberVariable
Local variable naming convention	|	LocalVariableNamingConvention
Local variable of concrete class	|	LocalVariableOfConcreteClass
Local variable used and declared in different 'switch' branches	|	LocalVariableUsedAndDeclaredInDifferentSwitchBranches
Lock acquired but not safely unlocked	|	LockAcquiredButNotSafelyReleased
Long literal ending with 'l' instead of 'L'	|	LongLiteralEndingWithLowercaseL
Loop statement that does not loop	|	LoopStatementThatDoesntLoop
Loop variable not updated inside loop	|	LoopConditionNotUpdatedInsideLoop
Loop with implicit termination condition	|	LoopWithImplicitTerminationCondition
Malformed @Before or @After method	|	BeforeOrAfterWithIncorrectSignature
Malformed @BeforeClass or @AfterClass method	|	BeforeOrAfterWithIncorrectSignature
Malformed XPath expression	|	MalformedXPath
Malformed format string	|	MalformedFormatString
Malformed regular expression	|	MalformedRegex
Manual array copy	|	ManualArrayCopy
Manual array to collection copy	|	ManualArrayToCollectionCopy
Map or Set may contain java.net.URL objects	|	CollectionContainsUrl
Map replaceable by EnumMap	|	MapReplaceableByEnumMap
Marker interface	|	MarkerInterface
Message missing on JUnit assertion	|	MessageMissingOnJUnitAssertion
Method call in loop condition	|	MethodCallInLoopCondition
Method call violates Law of Demeter	|	LawOfDemeter
Method is identical to its super method	|	RedundantMethodOverride
Method may be 'static'	|	MethodMayBeStatic
Method name same as class name	|	MethodNameSameAsClassName
Method name same as parent class name	|	MethodNameSameAsParentName
Method names differing only by case	|	MethodNamesDifferingOnlyByCase
Method overloads method of superclass	|	MethodOverloadsMethodOfSuperclass
Method overrides package local method of superclass located in other package	|	MethodOverridesPrivateMethodOfSuperclass
Method overrides private method of superclass	|	MethodOverridesPrivateMethodOfSuperclass
Method overrides static method of superclass	|	MethodOverridesStaticMethodOfSuperclass
Method parameter naming convention	|	MethodParameterNamingConvention
Method parameter of concrete class	|	MethodParameterOfConcreteClass
Method return of concrete class	|	MethodReturnOfConcreteClass
Method with more than three negations	|	MethodWithMoreThanThreeNegations
Method with multiple loops	|	MethodWithMultipleLoops
Method with multiple return points.	|	MethodWithMultipleReturnPoints
Method with synchronized block could be synchronized method	|	MethodMayBeSynchronized
Method with too many exceptions declared	|	MethodWithTooExceptionsDeclared
Method with too many parameters	|	MethodWithTooManyParameters
Mismatched query and update of collection	|	MismatchedQueryAndUpdateOfCollection
Mismatched read and write of array	|	MismatchedReadAndWriteOfArray
Misordered 'assertEquals()' parameters	|	MisorderedAssertEqualsParameters
Missing @Deprecated annotation	|	MissingDeprecatedAnnotation
Missing @Override annotation	|	override
Missorted modifers	|	MissortedModifiers
Multiple top level classes in single file	|	MultipleTopLevelClassesInFile
Multiple variables in one declaration	|	MultipleVariablesInDeclaration
Multiply or divide by power of two	|	MultiplyOrDivideByPowerOfTwo
Native method	|	NativeMethod
Nested 'switch' statement	|	NestedSwitchStatement
Nested 'synchronized' statement	|	NestedSynchronizedStatement
Nested 'try' statement	|	NestedTryStatement
Nested assignment	|	NestedAssignment
Nested conditional expression	|	NestedConditionalExpression
Nested method call	|	NestedMethodCall
No-op method in abstract class	|	NoopMethodInAbstractClass
Non-boolean method name must not start with question word	|	NonBooleanMethodNameMayNotStartWithQuestion
Non-constant String should be StringBuffer	|	NonConstantStringShouldBeStringBuffer
Non-constant field with upper-case name	|	NonConstantFieldWithUpperCaseName
Non-constant logger	|	NonConstantLogger
Non-exception class name ends with 'Exception'	|	NonExceptionNameEndsWithException
Non-final 'clone()' in secure context	|	NonFinalClone
Non-final field of exception class	|	NonFinalFieldOfException
Non-final field referenced in 'compareTo()'	|	CompareToUsesNonFinalVariable
Non-final field referenced in 'equals()'	|	NonFinalFieldReferenceInEquals
Non-final field referenced in 'hashCode()'	|	NonFinalFieldReferencedInHashCode
Non-final static variable is used during class initialization	|	NonFinalStaticVariableUsedInClassInitialization
Non-private field accessed in synchronized context	|	NonPrivateFieldAccessedInSynchronizedContext
Non-reproducible call to java.lang.Math	|	NonReproducibleMathCall
Non-serializable class with 'readObject()' or 'writeObject()'	|	NonSerializableClassWithSerializationMethods
Non-serializable class with 'serialVersionUID'	|	NonSerializableClassWithSerialVersionUID
Non-serializable field in a Serializable class	|	NonSerializableFieldInSerializableClass
Non-serializable object bound to HttpSession	|	NonSerializableObjectBoundToHttpSession
Non-serializable object passed to ObjectOutputStream	|	NonSerializableObjectPassedToObjectStream
Non-short-circuit boolean expression	|	NonShortCircuitBooleanExpression
Non-static initializer	|	NonStaticInitializer
Non-static inner class in secure context	|	NonStaticInnerClassInSecureContext
Non-synchronized method overrides synchronized method	|	NonSynchronizedMethodOverridesSynchronizedMethod
Number comparison using '==', instead of 'equals()'	|	NumberEquality
Number constructor call with primitive argument	|	CachedNumberConstructorCall
Numeric cast that loses precision	|	NumericCastThatLosesPrecision
Object allocation in loop	|	ObjectAllocationInLoop
Object comparison using ==, instead of 'equals()'	|	ObjectEquality
Object.equals(null)	|	ObjectEqualsNull
Octal and decimal integers in same array	|	OctalAndDecimalIntegersInSameArray
Octal integer	|	OctalInteger
Overloaded methods with same number of parameters	|	OverloadedMethodsWithSameNumberOfParameters
Overloaded variable argument method	|	OverloadedVarargsMethod
Overly broad 'catch' block	|	OverlyBroadCatchBlock
Overly complex anonymous inner class	|	OverlyComplexAnonymousInnerClass
Overly complex arithmetic expression	|	OverlyComplexArithmeticExpression
Overly complex boolean expression	|	OverlyComplexBooleanExpression
Overly complex class	|	OverlyComplexClass
Overly complex method	|	OverlyComplexMethod
Overly coupled class	|	OverlyCoupledClass
Overly coupled method	|	OverlyCoupledMethod
Overly large initializer for array of primitive type	|	OverlyLargePrimitiveArrayInitializer
Overly long method	|	OverlyLongMethod
Overly nested method	|	OverlyNestedMethod
Overly-strong type cast	|	OverlyStrongTypeCast
Overridable method call during object construction	|	OverridableMethodCallDuringObjectConstruction
Overridden method call during object construction	|	OverriddenMethodCallDuringObjectConstruction
Package-visible field	|	PackageVisibleField
Package-visible inner class	|	PackageVisibleInnerClass
Parameter hides member variable	|	ParameterHidesMemberVariable
Parameter name differs from parameter in overridden method	|	ParameterNameDiffersFromOverriddenParameter
Pointless 'indexOf()' comparison	|	PointlessIndexOfComparison
Pointless arithmetic expression	|	PointlessArithmeticExpression
Pointless bitwise expression	|	PointlessBitwiseExpression
Pointless boolean expression	|	PointlessBooleanExpression
Private member access between outer and inner classes	|	PrivateMemberAccessBetweenOuterAndInnerClass
Private method only used from inner class	|	MethodOnlyUsedFromInnerClass
Prohibited exception caught	|	ProhibitedExceptionCaught
Prohibited exception declared	|	ProhibitedExceptionDeclared
Prohibited exception thrown	|	ProhibitedExceptionThrown
Protected field	|	ProtectedField
Protected inner class	|	ProtectedInnerClass
Public field	|	PublicField
Public inner class	|	PublicInnerClass
Public method not exposed in interface	|	PublicMethodNotExposedInInterface
Public method without logging	|	PublicMethodWithoutLogging
Public static array field	|	PublicStaticArrayField
Public static collection field	|	PublicStaticCollectionField
Questionable name	|	QuestionableName
Raw use of parameterized class	|	RawUseOfParameterizedType
RecordStore opened but not safely closed	|	RecordStoreOpenedButNotSafelyClosed
Redundant '.substring(0)'	|	SubstringZero
Redundant 'String.toString()'	|	RedundantStringToString
Redundant 'if' statement	|	RedundantIfStatement
Redundant String constructor call	|	RedundantStringConstructorCall
Redundant conditional expression	|	RedundantConditionalExpression
Redundant field initialization	|	RedundantFieldInitialization
Redundant import	|	RedundantImport
Redundant interface declaration	|	RedundantInterfaceDeclaration
Redundant local variable	|	UnnecessaryLocalVariable
Redundant no-arg constructor	|	RedundantNoArgConstructor
Reflective access to a source-only annotation	|	ReflectionForUnavailableAnnotation
Refused bequest	|	RefusedBequest
Result of method call ignored	|	ResultOfMethodCallIgnored
Result of object allocation ignored	|	ResultOfObjectAllocationIgnored
Return of 'null'	|	ReturnOfNull
Return of 'this'	|	ReturnOfThis
Return of Collection or array field	|	ReturnOfCollectionOrArrayField
Return of Date or Calendar field	|	ReturnOfDateField
Reuse of local variable	|	ReuseOfLocalVariable
Scope of variable is too broad	|	TooBroadScope
Serializable class in secure context	|	SerializableClassInSecureContext
Serializable class with unconstructable ancestor	|	SerializableClassWithUnconstructableAncestor
Serializable class without 'readObject()' and 'writeObject()'	|	SerializableHasSerializationMethods
Serializable class without 'serialVersionUID'	|	serial
Serializable non-static inner class with non-Serializable outer class	|	SerializableInnerClassWithNonSerializableOuterClass
Serializable non-static inner class without 'serialVersionUID'	|	SerializableNonStaticInnerClassWithoutSerialVersionUID
Set replaceable by EnumSet	|	SetReplaceableByEnumSet
Shift operation by inappropriate constant	|	ShiftOutOfRange
Simplifiable JUnit assertion	|	SimplifiableJUnitAssertion
Single character 'startsWith()' or 'endsWith()'	|	SingleCharacterStartsWith
Single character string concatenation	|	SingleCharacterStringConcatenation
Single character string parameter in 'String.indexOf()' call	|	SingleCharacterStringConcatenation
Single class import	|	SingleClassImport
Singleton	|	Singleton
Socket opened but not safely closed	|	SocketOpenedButNotSafelyClosed
Standard variable names	|	StandardVariableNames
Statement with empty body	|	StatementWithEmptyBody
Static collection	|	StaticCollection
Static field referenced via subclass	|	StaticFieldReferencedViaSubclass
Static import	|	StaticImport
Static inheritance	|	StaticInheritance
Static method naming convention	|	StaticMethodNamingConvention
Static method only used from one other class	|	StaticMethodOnlyUsedInOneClass
Static method referenced via subclass	|	StaticMethodReferencedViaSubclass
Static variable may not be initialized	|	StaticVariableMayNotBeInitialized
Static variable naming convention	|	StaticVariableNamingConvention
Static variable of concrete class	|	StaticVariableOfConcreteClass
Static variable used before initialization	|	StaticVariableUsedBeforeInitialization
String comparison using '==', instead of 'equals()'	|	StringEquality
String concatenation	|	StringConcatenation
String concatenation in loop	|	StringContatenationInLoop
String concatenation inside 'StringBuffer.append()'	|	StringConcatenationInsideStringBufferAppend
StringBuffer constructor call with 'char' argument	|	NewStringBufferWithCharArgument
StringBuffer field	|	StringBufferField
StringBuffer or StringBuilder without initial capacity	|	StringBufferWithoutInitialCapacity
Subtraction in compareTo()	|	SubtractionInCompareTo
Suspicious 'Collections.toArray()' call	|	SuspiciousToArrayCall
Suspicious 'System.arraycopy()' call	|	SuspiciousSystemArraycopy
Suspicious indentation after control statement without braces	|	SuspiciousIndentAfterControlStatement
Suspicious test for oddness	|	BadOddness
Synchronization on 'this'	|	SynchronizeOnThis
Synchronization on a Lock object	|	SynchroniziationOnLockObject
Synchronization on a non-final field	|	SynchronizeOnNonFinalField
Synchronization on an object initialized with a literal	|	SynchronizedOnLiteralObject
TODO comment	|	TodoComment
Tail recursion	|	TailRecursion
Test method with incorrect signature	|	TestMethodWithIncorrectSignature
Text label in 'switch' statement	|	TextLabelInSwitchStatement
Throwable instance not thrown	|	ThrowableInstanceNeverThrown
Transient field in non-serializable class	|	TransientFieldInNonSerializableClass
Transient field is not initialized on deserialization	|	TransientFieldNotInitialized
Type may be weakened	|	TypeMayBeWeakened
Type parameter explicitly extends 'java.lang.Object'	|	TypeParameterExplicitlyExtendsObject
Type parameter extends final class	|	TypeParameterExtendsFinalClass
Type parameter hides visible type	|	TypeParameterHidesVisibleType
Type parameter naming convention	|	TypeParameterNamingConvention
Unary plus	|	UnaryPlus
Unchecked exception class	|	UncheckedExceptionClass
Unconditional 'wait()' call	|	UnconditionalWait
Unconstructable JUnit TestCase	|	UnconstructableJUnitTestCase
Unnecessarily qualified static usage	|	UnnecessarilyQualifiedStaticUsage
Unnecessary 'continue' statement	|	UnnecessaryContinue
Unnecessary 'default' for enum switch statement	|	UnnecessaryDefault
Unnecessary 'final' for local variable	|	UnnecessaryFinalOnLocalVariable
Unnecessary 'final' for method parameter	|	UnnecessaryFinalForMethodParameter
Unnecessary 'return' statement	|	UnnecessaryReturnStatement
Unnecessary 'this' qualifier	|	UnnecessaryThis
Unnecessary boxing	|	UnnecessaryBoxing
Unnecessary call to 'super()'	|	UnnecessaryCallToSuper
Unnecessary code block	|	UnnecessaryCodeBlock
Unnecessary enum modifier	|	UnnecessaryEnumModifier
Unnecessary fully qualified name	|	UnnecessaryFullyQualifiedName
Unnecessary interface modifier	|	UnnecessaryInterfaceModifier
Unnecessary label on 'break' statement	|	UnnecessaryLabelOnBreakStatement
Unnecessary label on 'continue' statement	|	UnnecessaryLabelOnContinueStatement
Unnecessary parentheses	|	UnnecessaryParentheses
Unnecessary qualifier for 'this'	|	UnnecessaryQualifierForThis
Unnecessary semicolon	|	UnnecessarySemicolon
Unnecessary temporary object in conversion from String	|	UnnecessaryTemporaryOnConversionFromString
Unnecessary temporary object in conversion to String	|	UnnecessaryTemporaryOnConversionToString
Unnecessary unary minus	|	UnnecessaryUnaryMinus
Unnecessary unboxing	|	UnnecessaryUnboxing
Unpredictable BigDecimal constructor call	|	UnpredictableBigDecimalConstructorCall
Unqualified instance field access	|	UnqualifiedFieldAccess
Unqualified static usage	|	UnqualifiedStaticUsage
Unsafe lazy initialization of static field	|	NonThreadSafeLazyInitialization
Unused 'catch' parameter	|	UnusedCatchParameter
Unused import	|	UnusedImport
Unused label	|	UnusedLabel
Use of '$' in identifier	|	DollarSignInName
Use of 'assert' as identifier	|	AssertAsIdentifier
Use of 'enum' as identifier	|	EnumAsIdentifier
Use of AWT peer class	|	UseOfAWTPeerClass
Use of DriverManager to get JDBC connection	|	CallToDriverManagerGetConnection
Use of Properties object as a Hashtable	|	UseOfPropertiesAsHashtable
Use of StringTokenizer	|	UseOfStringTokenizer
Use of System.out or System.err	|	UseOfSystemOutOrSystemErr
Use of archaic system property accessors	|	UseOfArchaicSystemPropertyAccessors
Use of concrete JDBC driver class	|	UseOfJDBCDriverClass
Use of index 0 in JDBC ResultSet	|	UseOfIndexZeroInJDBCResultSet
Use of java.lang.ProcessBuilder class	|	UseOfProcessBuilder
Use of java.lang.reflect	|	JavaLangReflect
Use of obsolete collection type	|	UseOfObsoleteCollectionType
Use of sun.* classes	|	UseOfSunClasses
Using 'Random.nextDouble()' to get random integer	|	UsingRandomNextDoubleForRandomInteger
Utility class	|	UtilityClass
Utility class with public constructor	|	UtilityClassWithPublicConstructor
Utility class without private constructor	|	UtilityClassWithoutPrivateConstructor
Value of ++ or -- used	|	ValueOfIncrementOrDecrementUsed
Variable argument method	|	VariableArgumentMethod
Variables of different types in one declaration	|	VariablesOfDifferentTypesInDeclaration
Volatile array field	|	VolatileArrayField
Volatile long or double field	|	VolatileLongOrDoubleField
While loop spins on field	|	WhileLoopSpinsOnField
Zero-length array allocation	|	ZeroLengthArrayAllocation
expression.equals("literal") rather than "literal".equals(expression)	|	LiteralAsArgToStringEquals
java.lang import	|	JavaLangImport
java.lang.Error not rethrown	|	ErrorNotRethrown
java.lang.ThreadDeath not rethrown	|	ThreadDeathNotRethrown


