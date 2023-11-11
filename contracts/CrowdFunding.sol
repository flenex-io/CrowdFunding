// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract CrowdFunding {
    struct Contributers {
        string name;
        uint256 timestamp;
        address from;
    }

    Contributers[] contributers;
    address payable owner = payable(0xF3bA650f3BB16dc176aa30fa2EB07Ec0cb7E1B26);

    function sendDonation(string memory name) public payable {
        require(msg.value > 0, "Please pay greater than 0 ether");
        owner.transfer(msg.value);
        contributers.push(Contributers(name, block.timestamp, msg.sender));
    }

    function getContributers() public view returns (Contributers[] memory) {
        return contributers;
    }
}