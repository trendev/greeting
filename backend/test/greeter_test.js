const GreeterContract = artifacts.require("Greeter");

contract("Greeter", (accounts) => {
    it("has been deployed successfully", async () => {
        const instance = await GreeterContract.deployed();
        assert(instance, "contract was not deployed :( ");
    });

    describe("greet()", () => {
        const expected = "Hello, World!";
        it(`returns '${expected}'`, async () => {
            const instance = await GreeterContract.deployed();
            const grt = await instance.greet();
            assert.equal(grt, expected);
        });
    });

    //instance.send(web3.utils.toWei(1, "ether"))
    describe("fallback()", () => {
        it("should revert", async () => {
            const instance = await GreeterContract.deployed();
            try {
                await instance.send(web3.utils.toWei("1", "ether"));
            } catch (err) {
                assert(err.message,"fallback() should throw an error message");
                return;
            }
            assert(false, "should never occur");
        });
    });

    describe("owner()", () => {
        it("returns the owner's address", async () => {
            const instance = await GreeterContract.deployed();
            const owner = await instance.owner();
            const a0 = accounts[0];

            assert(owner, "owner exists");
            assert.equal(owner, a0);
        });
    });
});

contract("Greeter: update greeting", (accounts) => {
    describe("setGreeting(string)", () => {
        it("owner sets greeting to passed in string", async () => {
            const instance = await GreeterContract.deployed();
            const expected = "Hi there!";
            await instance.setGreeting(expected);
            const grt = await instance.greet();
            assert.equal(grt, expected);
        });

        it("unauthorized address cannot set greeting to passed in string", async () => {
            const instance = await GreeterContract.deployed();
            const grt = "Another greeting";
            const g1 = await instance.greet();
            try {
                await instance.setGreeting(grt, { from: accounts[1] });
            } catch (err) {
                assert(err.message,"setGreeting() should throw an error message");
            }
            const g2 = await instance.greet();
            assert.equal(g1, g2);
            assert.notEqual(g2, grt);
        });
    });
});