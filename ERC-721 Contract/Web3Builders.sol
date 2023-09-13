// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Web3Builders is ERC721, ERC721Enumerable, Pausable, Ownable {
    using Counters for Counters.Counter;
    // Max supply of nfts
    uint MAX_SUPPLY = 1000;

    // IS public mint or allowList mint enabled
    bool public publicMintOpen = false;
    bool public allowListMintOpen = false;

    // mapping of addresses that can allowList mint (that are on the allowList)
    mapping(address => bool) public allowList;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Web3Builders", "WE3") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmY5rPqGTN1rZxMQg2ApiSZc7JiBNs1ryDzXPZpQhC1ibm/";
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // Change public mint or allowList mint to be enabled or disabled
    function editMintWindows(bool _publicMintOpen, bool _allowListMintOpen) external  onlyOwner {
        publicMintOpen = _publicMintOpen;
        allowListMintOpen = _allowListMintOpen;
    }

    // Allow list mint
    // Add public mint and allowList mint veriables
    // require only allowlist people to mint
    function allowListMint() public payable {
        require(allowListMintOpen, "Allowlist minting closed");
        require(allowList[msg.sender], "You are not allowed to mint from allow list");
        require(msg.value == 0.001 ether, "Not enough funds");
        require(totalSupply() < MAX_SUPPLY, "Ntfs sold out");
        mint();
    }

    // Populate the allowList
    function setAllowList(address[] calldata addresses) external onlyOwner {
        for(uint i = 0; i < addresses.length; i++) {
            allowList[addresses[i]] = true;
        }
    }

    // Add payment
    // Add limit of supply
    function publicMint() public payable {
        require(publicMintOpen, "Public minting closed");
        require(msg.value == 0.01 ether, "Not enough funds");
        require(totalSupply() < MAX_SUPPLY, "Ntfs sold out");
        mint();
    }

    // Mint function
    function mint() internal {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }

    // Withdraw function
    function withdraw(address _address) external onlyOwner{
        // Get the balance of contract
        uint balance = address(this).balance;
        payable(_address).transfer(balance);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}