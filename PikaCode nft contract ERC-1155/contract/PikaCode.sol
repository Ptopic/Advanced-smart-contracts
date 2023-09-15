// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
// Payment splitter
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract PikaCode is ERC1155, Ownable, Pausable, ERC1155Supply, PaymentSplitter {
    uint public PRICE = 0.02 ether; 
    uint public ALLOWLIST_PRICE = 0.01 ether;
    uint public MAX_SUPPLY = 1000;
    uint public NFT_COUNT = 2;
    uint public MAX_PER_WALLET = 5;

    bool public allowListMintOpen = false;
    bool public publicMintOpen = false;

    mapping(address => bool) allowList;

    mapping(address => uint) puchasesPerWallet;
    constructor(address[] memory _payees, uint[] memory _shares)
        ERC1155("ipfs://QmaoT5TbX6zQAvGyZUuVaX9183s61zHpckfKNe6orytDzx")
        // Release button in remix ui
        PaymentSplitter(_payees, _shares)
    {}

    // Set allow list 
    function setAllowList(address[] calldata addresses) external onlyOwner {
        for(uint i = 0; i < addresses.length; i++) {
            allowList[addresses[i]] = true;
        }
    }
    // Function to edit mint window variables
    function editMintWindows(bool _allowListMintOpen, bool _publicMintOpen) external onlyOwner {
        allowListMintOpen = _allowListMintOpen;
        publicMintOpen = _publicMintOpen;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // Clean up code
    function mint(uint id, uint amount) internal {
        require(puchasesPerWallet[msg.sender] <= MAX_PER_WALLET, "Wallet limit of 5 reached");
        require(id <= NFT_COUNT, "Sorry looks like you are trying to mind a NFT that doesnt exist");
        require(totalSupply(id) + amount <= MAX_SUPPLY, "Sorry we have minted out");
        _mint(msg.sender, id, amount, "");
        // save mint data
        puchasesPerWallet[msg.sender] += amount;
    }

    // AllowList mint
    function allowListMint(uint id, uint amount) public payable {
        require(puchasesPerWallet[msg.sender] <= MAX_PER_WALLET, "Wallet limit of 5 reached");
        require(allowListMintOpen, "Allow list mint is closed");
        require(allowList[msg.sender], "You are not on the allow list");
        require(msg.value == ALLOWLIST_PRICE * amount, "Not enough ether snet");
        mint(id, amount);
    }
    // Add supply tracking
    function publicMint(uint256 id, uint256 amount)
        public
        payable
    {
        require(publicMintOpen, "Public mint is closed");
        require(msg.value == PRICE * amount, "Not enough ether sent!");
        mint(id, amount);
    }

    function uri(uint _id) public view virtual override returns(string memory) {
        require(exists(_id), "URI: Not existing token");


        return string(abi.encodePacked(super.uri(_id), "/", Strings.toString(_id), ".json"));
    }

    // withdraw balance
    function withdraw(address _address) external  onlyOwner {
        uint balance = address(this).balance;
        payable(_address).transfer(balance);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}