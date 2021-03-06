import { Expect, Test, TestFixture } from "../../../../../core/alsatian-core";

@TestFixture("To Be Tests")
export class ToBeTests {

  @Test()
  twoPlusTwoMakeFour() {
    Expect(2 + 2).toBe(4);
  }

  @Test()
  twoPlusTwoDoNotMakeFive() {
    Expect(2 + 2).not.toBe(5);
  }

  @Test()
  twoPlusTwoDoNotMakeFour() {
    Expect(2 + 2).not.toBe(4);
  }

  @Test()
  twoPlusTwoMakeFive() {
    Expect(2 + 2).toBe(5);
  }
}
