const GreeterContract = artifacts.require("Greeter");

let deployed = {};

contract("Greeter", (accounts) => {
    let instance;
    beforeEach(async () => {
        instance = await GreeterContract.deployed(); // provides the same deployed contract
        // instance = await GreeterContract.new(); // provides new contracts
        
        if(!deployed[instance.address]){
            deployed[instance.address] = 0;
        }
        deployed[instance.address] += 1;
    });

    after(() => {
        let contracts = Object.keys(deployed);
        console.log(`** [${contracts.length}] GreeterContract deployed **`);
        contracts.forEach(a => console.log(`address : ${a} / called [${deployed[a]}] times`));
    });

    it("has been deployed successfully", async () => {
        assert(instance, "contract was not deployed :( ");
    });

    describe("greet()", () => {
        const expected = "Hello, World!";
        it(`returns '${expected}'`, async () => {
            const grt = await instance.greet();
            assert.equal(grt, expected);
        });
    });

    describe("fallback()", () => {
        it("should revert", async () => {
            try {
                await instance.send(web3.utils.toWei("1", "ether"));
            } catch (err) {
                assert(err.message, "fallback() should throw an error message");
                return;
            }
            assert(false, "should never occur");
        });
    });

    describe("owner()", () => {
        it("returns the owner's address", async () => {
            const owner = await instance.owner();
            const a0 = accounts[0];

            assert(owner, "owner exists");
            assert.equal(owner, a0);
        });
    });

    describe("setGreeting(string)", () => {
        it("owner", async () => {
            const expected = "Hi there!";
            await instance.setGreeting(expected);
            const grt = await instance.greet();
            assert.equal(grt, expected);
        });

        it("restricted", async () => {
            const grt = "Another greeting";
            const g1 = await instance.greet();
            try {
                await instance.setGreeting(grt, { from: accounts[1] });
            } catch (err) {
                assert(err.message, "setGreeting() should throw an error message");
            }
            const g2 = await instance.greet();
            assert.equal(g1, g2);
            assert.notEqual(g2, grt);
        });
    });
});

