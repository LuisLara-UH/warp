import { AST } from '../ast/ast';
import {
  ArrayTypeName,
  Assignment,
  ASTNode,
  ASTNodeConstructor,
  ASTNodeWriter,
  BinaryOperation,
  Block,
  Break,
  Conditional,
  Continue,
  DoWhileStatement,
  ElementaryTypeName,
  ElementaryTypeNameExpression,
  EmitStatement,
  EnumDefinition,
  EnumValue,
  ErrorDefinition,
  EventDefinition,
  ExpressionStatement,
  ForStatement,
  FunctionCall,
  FunctionCallOptions,
  FunctionTypeName,
  Identifier,
  IdentifierPath,
  IfStatement,
  ImportDirective,
  IndexAccess,
  IndexRangeAccess,
  InheritanceSpecifier,
  InlineAssembly,
  Literal,
  Mapping,
  MemberAccess,
  ModifierDefinition,
  ModifierInvocation,
  NewExpression,
  OverrideSpecifier,
  ParameterList,
  PlaceholderStatement,
  Return,
  RevertStatement,
  SourceUnit,
  StructDefinition,
  StructuredDocumentation,
  Throw,
  TryCatchClause,
  TryStatement,
  TupleExpression,
  UnaryOperation,
  UncheckedBlock,
  UserDefinedTypeName,
  UsingForDirective,
  VariableDeclaration,
  VariableDeclarationStatement,
  WhileStatement,
} from 'solc-typed-ast';
import {
  CairoAssert,
  CairoContract,
  CairoFunctionDefinition,
  CairoTempVarStatement,
} from '../ast/cairoNodes';
import {
  AssignmentWriter,
  BinaryOperationWriter,
  BlockWriter,
  CairoAssertWriter,
  CairoContractWriter,
  CairoFunctionDefinitionWriter,
  CairoTempVarWriter,
  ElementaryTypeNameExpressionWriter,
  EmitStatementWriter,
  EnumDefinitionWriter,
  EventDefinitionWriter,
  ExpressionStatementWriter,
  FunctionCallWriter,
  IdentifierWriter,
  IfStatementWriter,
  IndexAccessWriter,
  LiteralWriter,
  MemberAccessWriter,
  NotImplementedWriter,
  ParameterListWriter,
  ReturnWriter,
  SourceUnitWriter,
  StructDefinitionWriter,
  StructuredDocumentationWriter,
  TupleExpressionWriter,
  UncheckedBlockWriter,
  VariableDeclarationStatementWriter,
  VariableDeclarationWriter,
} from './writers';

export const CairoASTMapping = (ast: AST, throwOnUnimplemented: boolean) =>
  new Map<ASTNodeConstructor<ASTNode>, ASTNodeWriter>([
    [ArrayTypeName, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [Assignment, new AssignmentWriter(ast, throwOnUnimplemented)],
    [BinaryOperation, new BinaryOperationWriter(ast, throwOnUnimplemented)],
    [Block, new BlockWriter(ast, throwOnUnimplemented)],
    [Break, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [CairoAssert, new CairoAssertWriter(ast, throwOnUnimplemented)],
    [CairoContract, new CairoContractWriter(ast, throwOnUnimplemented)],
    [CairoFunctionDefinition, new CairoFunctionDefinitionWriter(ast, throwOnUnimplemented)],
    [CairoTempVarStatement, new CairoTempVarWriter(ast, throwOnUnimplemented)],
    [Conditional, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [Continue, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [DoWhileStatement, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [ElementaryTypeName, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [
      ElementaryTypeNameExpression,
      new ElementaryTypeNameExpressionWriter(ast, throwOnUnimplemented),
    ],
    [EmitStatement, new EmitStatementWriter(ast, throwOnUnimplemented)],
    [EnumDefinition, new EnumDefinitionWriter(ast, throwOnUnimplemented)],
    [EnumValue, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [ErrorDefinition, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [EventDefinition, new EventDefinitionWriter(ast, throwOnUnimplemented)],
    [ExpressionStatement, new ExpressionStatementWriter(ast, throwOnUnimplemented)],
    [ForStatement, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [FunctionCall, new FunctionCallWriter(ast, throwOnUnimplemented)],
    [FunctionCallOptions, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [FunctionTypeName, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [Identifier, new IdentifierWriter(ast, throwOnUnimplemented)],
    [IdentifierPath, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [IfStatement, new IfStatementWriter(ast, throwOnUnimplemented)],
    [ImportDirective, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [IndexAccess, new IndexAccessWriter(ast, throwOnUnimplemented)],
    [IndexRangeAccess, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [InheritanceSpecifier, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [InlineAssembly, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [Literal, new LiteralWriter(ast, throwOnUnimplemented)],
    [Mapping, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [MemberAccess, new MemberAccessWriter(ast, throwOnUnimplemented)],
    [ModifierDefinition, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [ModifierInvocation, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [NewExpression, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [OverrideSpecifier, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [ParameterList, new ParameterListWriter(ast, throwOnUnimplemented)],
    [PlaceholderStatement, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [Return, new ReturnWriter(ast, throwOnUnimplemented)],
    [RevertStatement, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [SourceUnit, new SourceUnitWriter(ast, throwOnUnimplemented)],
    [StructDefinition, new StructDefinitionWriter(ast, throwOnUnimplemented)],
    [StructuredDocumentation, new StructuredDocumentationWriter(ast, throwOnUnimplemented)],
    [Throw, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [TryCatchClause, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [TryStatement, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [TupleExpression, new TupleExpressionWriter(ast, throwOnUnimplemented)],
    [UnaryOperation, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [UncheckedBlock, new UncheckedBlockWriter(ast, throwOnUnimplemented)],
    [UserDefinedTypeName, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [UsingForDirective, new NotImplementedWriter(ast, throwOnUnimplemented)],
    [VariableDeclaration, new VariableDeclarationWriter(ast, throwOnUnimplemented)],
    [
      VariableDeclarationStatement,
      new VariableDeclarationStatementWriter(ast, throwOnUnimplemented),
    ],
    [WhileStatement, new NotImplementedWriter(ast, throwOnUnimplemented)],
  ]);
