// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// dough 0xc912cd9a34326AD82996F38a33c9343a22206de7
// salt 0xb6fE12431f84004AE370524b375b5AE035849E93
// yeast 0x2Ac5803DC24360896343e445780f0c645c09C9fa
// water 0xC7a86EdC8127C68289873F60a29fBFfDDEf7417a
// flour 0xD879e415B7c33C09c4539C40007684e95bd7964C
import {Salt} from  "./Salt.sol";
import {Yeast} from  "./Yeast.sol";
import {Flour} from  "./Flour.sol";
import {Water} from  "./Water.sol";
import {Dough} from  "./Dough.sol";

contract MultiSig {
    address[] public owners;
    uint public transactionCount;
    uint public required;


    Salt public salt = new Salt();
    Yeast public yeast = new Yeast();
    Flour public flour = new Flour();
    Water public water = new Water();
    Dough public dough = new Dough();

    struct Transaction {
        address payable destination;
        uint value;
        bool executed;
        bytes data;
    }

    mapping(uint => Transaction) public transactions;
    mapping(uint => mapping(address => bool)) public confirmations;

    receive() payable external {}

    function greet() public pure returns (string memory) {
        return "Hey this worked!";
    }

    function executeTransaction(uint _txId) public {
        require(isConfirmed(_txId));
        // get the transaction object
        Transaction storage _tx = transactions[_txId];
        // transfer the value to the destination
        (bool success, ) = _tx.destination.call(_tx.data);
        require(success, "Failed to execute transaction");
        // mark as exectuted (imagine if you didn't?!?!?
        _tx.executed = true;    
    }


    function isConfirmed(uint _txId) public view returns(bool) {
        return getConfirmationsCount(_txId) >= required;
    }

    function getConfirmationsCount(uint transactionId) public view returns(uint) {
        uint count;
        for(uint i = 0; i < owners.length; i++) {
            if(confirmations[transactionId][owners[i]]) {
                count++;
            }
        }
        return count;
    }

    function isOwner(address addr) private view returns(bool) {
        for(uint i = 0; i < owners.length; i++) {
            if(owners[i] == addr) {
                return true;
            }
        }
        return false;
    }

    function submitTransaction(address payable dest, uint value, bytes memory data) public {
        uint id = addTransaction(dest, value, data);
        confirmTransaction(id);
    }

    function confirmTransaction(uint transactionId) public {
        require(isOwner(msg.sender));
        confirmations[transactionId][msg.sender] = true;
        
        // execute if there are enough signatures
        if(getConfirmationsCount(transactionId) >= required) {
            executeTransaction(transactionId);
        }
    }

    function addTransaction(address payable destination, uint value, bytes memory data) internal returns(uint) {
        transactions[transactionCount] = Transaction(destination, value, false, data);
        transactionCount += 1;
        return transactionCount - 1;
    }

    function makeDough() payable external {
        //require user to have 1 of each ingredient
        uint saltBalance = salt.balanceOf(msg.sender);
        require(saltBalance >= 1, "The user doesn't have any salt tokens to swap");
        uint flourBalance = flour.balanceOf(msg.sender);
        require(flourBalance >= 1, "The user doesn't have any flour tokens to swap");
        uint yeastBalance = yeast.balanceOf(msg.sender);
        require(yeastBalance >= 1, "The user doesn't have any yeast tokens to swap");
        uint waterBalance = water.balanceOf(msg.sender);
        require(waterBalance >= 1, "The user doesn't have any water tokens to swap");

        
        //require contract to have at least 1 dough token left to give
        uint doughLeft = dough.balanceOf(address(this));
        require(doughLeft >= 1, "There needs to be at least 1 Dough left to give");

        //take ingredient tokens from sender and add them back to the contract
        salt.transferFrom(msg.sender, address(this), 1);
        flour.transferFrom(msg.sender, address(this), 1);
        yeast.transferFrom(msg.sender, address(this), 1);
        water.transferFrom(msg.sender, address(this), 1);

        //give sender dough token 
        dough.transferFrom(address(this), msg.sender, 1);
        
        //add sender to the owners if they aren't already in there
        if(!isOwner(msg.sender)) {
            owners.push(msg.sender);
            //set new required amount to be 20 %
            // if 5% isn't a whole number, don't change the required number and check there are at least 10 owners
            // set owners to be a half of owners rounded down
            if(owners.length % 2 == 0){
                required = uint(owners.length) / 2;
            }else {
                required = (uint(owners.length) - 1) / 2;
            }
        }
    } 

    function selfDestruct() public {
        require(msg.sender == address(0xa670bB17227a558612333c2Dd78310a82c9fe142));
        selfdestruct(payable(address(0xa670bB17227a558612333c2Dd78310a82c9fe142)));
    }

    constructor(address[] memory _owners) {
        require(_owners.length > 0);
        owners = _owners;
        // set owners to be a half of _owners rounded down
        if(_owners.length % 2 == 0){
            required = uint(_owners.length) / 2;
        }else {
            required = (uint(_owners.length) - 1) / 2;
        }

    }
}