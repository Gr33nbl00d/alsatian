import { TestOutputStream, TestSet } from "./";

import { buildExpect, Expect, IExpect } from "./expect";

import {
	ContainerMatcher,
	EmptyMatcher,
	FunctionMatcher,
	FunctionSpyMatcher,
	Matcher,
	NumberMatcher,
	PropertyMatcher,
	StringMatcher
} from "./matchers";

import {
	Focus,
	Ignore,
	Setup,
	SetupFixture,
	Teardown,
	TeardownFixture,
	Test,
	TestCase,
	TestCases,
	TestFixture,
	Timeout
} from "./decorators";

import {
	Any,
	createFunctionSpy,
	FunctionSpy,
	ISpiedFunction,
	RestorableFunctionSpy,
	SpyOn,
	SpyOnProperty
} from "./spying";

import {
	TestCaseResult,
	TestFixtureResults,
	TestOutcome,
	TestResults,
	TestSetResults
} from "./results";

import { MatchError, TestTimeoutError } from "./errors";

import * as METADATA_KEYS from "./decorators/_metadata-keys";

import { TestRunner, CallbackTestRunner } from "./running";

import { Logger } from "./maintenance/log";
const log = Logger.log;

export {
	Any,
	buildExpect,
	CallbackTestRunner,
	ContainerMatcher,
	EmptyMatcher,
	Expect,
	IExpect,
	Focus,
	FunctionMatcher,
	FunctionSpyMatcher,
	Ignore,
	log,
	Matcher,
	MatchError,
	METADATA_KEYS,
	NumberMatcher,
	PropertyMatcher,
	Setup,
	SetupFixture,
	ISpiedFunction,
	FunctionSpy,
	RestorableFunctionSpy,
	createFunctionSpy,
	SpyOn,
	SpyOnProperty,
	StringMatcher,
	Teardown,
	TeardownFixture,
	Test,
	TestCase,
	TestCases,
	TestCaseResult,
	TestFixture,
	TestFixtureResults,
	TestOutcome,
	TestOutputStream,
	TestResults,
	TestRunner,
	TestSetResults,
	TestSet,
	TestTimeoutError,
	Timeout
};
