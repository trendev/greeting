// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

// Import Ownable from the OpenZeppelin Contracts library
import "@openzeppelin/contracts/access/Ownable.sol";

contract Greeter is Ownable {
    string private _greeting = "Hello, World!";

    function greet() external view returns (string memory) {
        return _greeting;
    }

    function setGreeting(string calldata greeting) external onlyOwner {
        _greeting = greeting;
    }

    fallback() external {
        // dont receive ether via fallback method (by not having 'payable' modifier on this function).
    }

    function isContract(address a) public view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(a)
        }
        return size > 0;
    }
}
