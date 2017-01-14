import { Teardown, AsyncTeardown, TestFixture, Expect, Test } from "../../../../core/alsatian-core";

@TestFixture("teardown tests")
export class TeardownTests {

   private _teardownComplete: boolean = false;
   private _asyncTeardownComplete: boolean = false;

   @Teardown
   private _teardown() {
       this._teardownComplete = true;
   }

   @AsyncTeardown
   private async _asyncTeardown(): Promise<void> {
       return new Promise<void>((resolve, reject) => {
           this._asyncTeardownComplete = true;
           resolve();
       });
   }

   @Test("teardown not called before first test")
   public async firstTestTeardownNotCalled() {
       Expect(this._teardownComplete).toBe(false);
       Expect(this._asyncTeardownComplete).toBe(false);
   }

   @Test("teardown has been called after first test and before second")
   public async teardownNowHasBeenCalled() {
       Expect(this._teardownComplete).toBe(true);
       Expect(this._asyncTeardownComplete).toBe(true);
   }
}
   