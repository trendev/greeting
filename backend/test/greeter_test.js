const GreeterContract = artifacts.require("Greeter");

contract("Greeter", (accounts) => {
    it("has been deployed successfully", async () => {
        const ctr = await GreeterContract.deployed();
        assert(ctr, "contract was not deployed :( ");
    });

    describe("greet()", () => {
        const expected = "Hello, World!";
        it(`returns '${expected}'`, async () => {
            const greeter = await GreeterContract.deployed();
            const grt = await greeter.greet();
            assert.equal(grt, expected);
        });
    });

    describe("owner()", () => {
        it("returns the owner's address", async () => {
            const greeter = await GreeterContract.deployed();
            const owner = await greeter.owner();
            const a0 = accounts[0];

            assert(owner, "owner exists");
            assert.equal(owner, a0);
        });
    });
});

contract("Greeter: update greeting", (accounts) => {
    describe("setGreeting(string)", () => {
        it("owner sets greeting to passed in string", async () => {
            const greeter = await GreeterContract.deployed();
            const expected = "Hi there!";
            await greeter.setGreeting(expected);
            const grt = await greeter.greet();
            assert.equal(grt, expected);
        });

        it("unauthorized address cannot set greeting to passed in string", async () => {
            const greeter = await GreeterContract.deployed();
            const grt = "Another greeting";
            const g1 = await greeter.greet();
            try {
                await greeter.setGreeting(grt, { from: accounts[1] });
            } catch (err) {
                const errmsg = "Ownable: caller is not the owner";
                assert.equal(err.reason, errmsg);
            }
            const g2 = await greeter.greet();
            assert.equal(g1, g2);
            assert.notEqual(g2, grt);
        });
    });
});