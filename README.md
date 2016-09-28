# alsatian
[![NPM Version](https://img.shields.io/npm/v/alsatian.svg)](https://www.npmjs.com/package/alsatian)
[![NPM Version](https://img.shields.io/github/license/alsatian-test/alsatian.svg)](https://www.github.com/alsatian-test/alsatian/blob/master/license)
[![Build Status](https://travis-ci.org/alsatian-test/alsatian.svg?branch=master)](https://travis-ci.org/alsatian-test/alsatian)
[![Code Climate](https://codeclimate.com/github/alsatian-test/alsatian/badges/gpa.svg)](https://codeclimate.com/github/alsatian-test/alsatian)
[![Coverage Status](https://coveralls.io/repos/github/alsatian-test/alsatian/badge.svg?branch=master)](https://coveralls.io/github/alsatian-test/alsatian?branch=master)
[![Issue Count](https://codeclimate.com/github/alsatian-test/alsatian/badges/issue_count.svg)](https://codeclimate.com/github/alsatian-test/alsatian)
[![bitHound Code](https://www.bithound.io/github/alsatian-test/alsatian/badges/code.svg)](https://www.bithound.io/github/alsatian-test/alsatian)
[![bitHound Dependencies](https://www.bithound.io/github/alsatian-test/alsatian/badges/dependencies.svg)](https://www.bithound.io/github/alsatian-test/alsatian/master/dependencies/npm)
[![Known Vulnerabilities](https://snyk.io/test/github/alsatian-test/alsatian/badge.svg)](https://snyk.io/test/github/alsatian-test/alsatian)

TypeScript testing framework with test cases, compatible with istanbul and tap reporters.

## In ALPHA

Currently alsatian is in alpha and I am very keen to hear feedback as to how you'd want to use alsatian, changes to the API, additional features etc. any ideas are absolutely welcome. Raise an issue and I will get back to you asap.

I don't foresee the API changing dramatically as it is inspired by well used standards (JUnit/NUnit) but am completely open to new ideas as the goal is to make testing easy!

## Installing

Good news everybody, we're on NPM.
```
npm install alsatian
```

## Running alsatian

Alsatian has a CLI for easy use with your package.json or your favourite cli tool

```
alsatian [list of globs]

alsatian ./test/**/*.spec.js ./special-test.js
```

### CLI Options

You can change how Alsatian runs your tests using the available options

#### Timeout

The timeout option changes the length of time that a test may run for in milliseconds (the default is 500ms). The examples below will change this to 5000ms.

```
alsatian --timeout 5000
alsatian -t 5000
```

## Using alsatian

Create your first spec file

```
import { Expect, Test } from "alsatian";

export class ExampleTestFixture {

  @Test()
  public exampleTest() {
    Expect(1 + 1).toBe(2);
  }
}
```

Then check all is well

```
> alsatian ./path/to/example.spec
TAP version 13
1..1
ok 1 - exampleTest
```

### Naming Tests

By default, tests will be named the same as their functions and this will be what is output by alsatian. However, you can give the test a more meaningful name simply by supplying the ```Test``` annotation with whatever you desire.

```
import { Expect, Test } from "alsatian";

export class ExampleTestFixture {

  @Test("Confirm 1 + 1 is 2")
  public test1() {
    Expect(1 + 1).toBe(2);
  }
}
```

Then check all is well

```
> alsatian ./path/to/example.spec
TAP version 13
1..1
ok 1 - Confirm 1 + 1 is 2
```

### Test Cases

You can pass arguments to your tests simply by using the ```TestCase``` annotation

```
import { Expect, TestCase } from "alsatian";

export class ExampleTestFixture {

  @TestCase(1, 2)
  @TestCase(4, 5)
  public exampleTest(preIteratedValue: number, expected: number) {
    Expect(preIteratedValue++).toBe(expected);
  }
}
```

### Matchers

Now you've set up some tests, it's time to check your code is working. Let's start easy.

#### toBe

To be or not to be, that is the question! Simply put this checks whether actual === expected

```
Expect(1 + 1).toBe(2);
Expect(1 + 1).not.toBe(3);
```

#### toEqual

Next we can check if it's pretty much the same actual == expected

```
Expect("1").toEqual(1);
Expect(1 + 1).not.toEqual("3");
```

#### toMatch

Now a cheeky little regular expression if you don't mind

```
Expect("something").toMatch(/some/);
Expect("another thing").not.toMatch(/something/);
```

#### toBeDefined

Is it there or not? actual !== undefined

```
Expect("something").toBeDefined();
Expect(undefined).not.toBeDefined();
```

#### toBeNull

Is it something or not? actual !== null

```
Expect(null).toBeNull();
Expect("something").not.toBeNull();
```

#### toBeTruthy

Is it trueish? actual == trueish

```
Expect(1).toBeTruthy();
Expect(0).not.toBeTruthy();
```

#### toContain

Does the string contain another string or an array contain an item?

```
Expect("something").toContain("thing");
Expect([1, 2, 3]).toContain(2);
Expect("another thing").not.toContain("something");
Expect([1, 2, 3]).not.toContain(4);
```

#### toBeGreaterThan

Which one's larger (hopefully the actual)

```
Expect(2).toBeGreaterThan(1);
Expect(1).not.toBeGreaterThan(2);
```

#### toBeLessThan

For when you don't want things to get out of control, check it's not too big

```
Expect(1).toBeLessThan(2);
Expect(2).not.toBeLessThan(1);
```

#### toThrow

Check whether a function throws an error

```
Expect(() => throw new Error()).toThrow();
Expect(() => {}).not.toThrow();
```

#### toThrowError

Check whether a function throws a specific error with a given message

```
Expect(() => throw new TypeError("things went wrong")).toThrowError(TypeError, "things went wrong");
Expect(() => throw new Error("some error we don't care about")).not.toThrow(TypeError, "super nasty error");
```

### Spying

When we want to check functions are called, this is simple first we need to turn it into a spy...

```
import { SpyOn } from "alsatian";

let some = {
  function: () => {}
};

SpyOn(some, "function");

```

... then check it's been called ...

```
Expect(some.function).toHaveBeenCalled();
```

... or check it's been called with certain arguments ...

```
Expect(some.function).toHaveBeenCalledWith(this, "and that");
```

... you can stub it out ...

```
SpyOn(some, "function").andStub();
```

... you can make it call something else ...

```
SpyOn(some, "function").andCall(() => console.log("I are called"));
```

... or make it return whatever you desire ...

```
SpyOn(some, "function").andReturn(42);
```

... and even return it to how it started

```
SpyOn(some, "function");

some.function.restore();

// OR

const spy = SpyOn(some, "function");

spy.restore();
```

#### Creating a spy from thin air

You may want to just create a fake spy property this is easy to do and has all the same functionality as a Spy created through ```SpyOn```

```
import { FunctionSpy } from "alsatian";

const spy = new FunctionSpy();
```

#### Spying on a property

Similarly to spying on functions you can also spy on properties as below ...

```
import { SpyOnProperty } from "alsatian";

class Test {

   private _property: number = 42;

   get property() {
      return this._property;
   }

   set property(value: number) {
      this._property = value;
   }
}

const test = new Test();

SpyOnProperty(test, "property");

```

... then check it's been set ...

```
const propertySpy = SpyOnProperty(test, "property");

// unlike function spies expect calls on property spies
// only works using the returned spy from SpyOnProperty
// and not the property itself
Expect(propertySpy).toHaveBeenSet();
```

... or check it's been set to a specific value ...

```
Expect(propertySpy).toHaveBeenSetTo(42);
```

... add a fake getter ...

```
SpyOnProperty(test, "property").andCallGetter(() => { return "something"; });

```

... or setter ...

```
SpyOnProperty(test, "property").andCallSetter((value: any) => { doSomethingWith(value); });

```

... return a set value ...

```
SpyOnProperty(test, "property").andReturnValue(42);

```

... and restore it to how it was before

```
const properySpy = SpyOnProperty(test, "property");

properySp.restore();
```

### Async Tests

You can also have asynchronous tests using the ```AsyncTest``` annotation,

```
import { Expect, AsyncTest } from "alsatian";

export class ExampleTestFixture {

  @AsyncTest()
  public asyncTest() {

    return new Promise((resolve, reject) => {
      waitForSomethingToHappen((result: number) => {
         Expect(result).toBe(1);
         resolve();
      });
    });
  }
}
```

### Ignoring Tests

You can stop tests from being run by using the ```IgnoreTest``` annotation

```
import { Expect, Test, IgnoreTest } from "alsatian";

export class ExampleTestFixture {

  @Test()
  @IgnoreTest()
  public ignoredTest() {
    Expect(1).toBe(1);
  }
}
```

or you can stop all tests in a given fixture from running using the ```IgnoreTests``` annotation

```
import { Expect, Test, IgnoreTests } from "alsatian";

@IgnoreTests()
export class ExampleTestFixture {

  @Test()
  public thisTestWillNotBeRun() {
    Expect(1).toBe(1);
  }

  @Test()
  public neitherWillThisOne() {
   Expect(1).toBe(1);
  }
}
```

You can provide a reason to both of these, which will put it into the TAP output.

```
import { Expect, Test, IgnoreTest } from "alsatian";

export class ExampleTestFixture {

  @Test()
  @IgnoreTest("This test is useless, ignore for now.")
  public ignoredTest() {
    Expect(1).toBe(1);
  }
}
```

### Focusing Tests

You can run a single test or select tests using the ```FocusTest``` annotation

```
import { Expect, Test, FocusTest } from "alsatian";

export class ExampleTestFixture {

  @Test()
  @FocusTest
  public thisTestWillBeRun() {
    Expect(1).toBe(1);
  }

  @Test()
  public thisTestWillNotBeRun() {
    Expect(1).toBe(1);
  }
}
```

or you can run only tests in this fixture using the ```FocusTests``` annotation

```
import { Expect, Test, FocusTests } from "alsatian";

@FocusTests
export class ExampleTestFixture {

  @Test()
  public thisTestWillBeRun() {
    Expect(1).toBe(1);
  }

  @Test()
  public soWillThisTest() {
    Expect(1).toBe(1);
  }
}
```

### Setup

You can get a function to be run before every function in the fixture using the ```Setup``` decorators

```
import { Expect, Test, Setup } from "alsatian";

export class ExampleTestFixture {

  @Setup
  public thisFunctionWillBeRunBeforeAllTests() {
    // do some setup work
  }

  @Test()
  public exampleTest() {
   Expect(1).toBe(1);
  }
}
```

### Teardown

You can also run functions after every test has completed using the ```Teardown``` decorators

```
import { Expect, Test, Teardown } from "alsatian";

export class ExampleTestFixture {

  @Teardown
  public thisFunctionWillBeRunAfterAllTests() {
    // do some teardown work
  }

  @Test()
  public exampleTest() {
   Expect(1).toBe(1);
  }
}
```
