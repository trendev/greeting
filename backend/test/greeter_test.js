const GreeterContract = artifacts.require("Greeter");

contract("Greeter", () => {
    it("has been deployed successfully", async () => {
        const ctr = await GreeterContract.deployed();
        assert(ctr, "contract was not deployed :( ");
    });

    describe("greet()", () => {
        const expected = "Hello, World!";
        it(`returns '${expected}'`, async () => {
            const greeter = await GreeterContract.deployed();
            const greet = await greeter.greet();
            assert.equal(greet, expected, `greet should be '${expected}'`);
        });
    });
});

contract("Greeter: update greeting", () => {
    describe("setGreeting(string)", () => {
        it("sets greeting to passed in string", async () => {
            const greeter = await GreeterContract.deployed();
            const expected = "Hi there!";
            await greeter.setGreeting(expected);
            const greet = await greeter.greet();
            assert.equal(greet, expected, `greeting not updated with string '${expected}'`);
        });
    });
});