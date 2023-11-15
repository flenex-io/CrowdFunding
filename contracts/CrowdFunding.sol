// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract CrowdFunding {
    struct Contributor {
        string name;
        uint256 timestamp;
        address from;
    }

    Contributor[] public contributors;
    address payable public owner =
        payable(0xF3bA650f3BB16dc176aa30fa2EB07Ec0cb7E1B26);

    function sendDonation(string memory name) public payable {
        require(msg.value > 0 ether, "Please pay greater than 0 ether");
        require(bytes(name).length > 0, "Please provide your name");

        owner.transfer(msg.value);
        contributors.push(Contributor(name, block.timestamp, msg.sender));
    }

    function getContributors() public view returns (Contributor[] memory) {
        return contributors;
    }
}
