const GreeterContract = artifacts.require("Greeter");

contract("Greeter", () => {
    it("has been deployed successfully",async () => {
        const c = await GreeterContract.deployed();
        assert(c, "contract was not deployed :( ");
    });
});