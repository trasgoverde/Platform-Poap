// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";


contract TicketContract is ERC1155, AccessControl, ERC1155Supply  {
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    struct Ticket {
        uint256 tokenId;
        string eventName;
        uint256 createDate;
        uint256 startingDate;
        uint256 expirationDate;
        string description;
        uint256 maxSupply;
    }
    struct TicketId{
        uint256 tokenId;
        uint256 seat;
    }

    mapping(uint256 events => address[]) public eventAddressList;
    mapping(address => TicketId[] events) public ticketsByAccount;
    mapping(uint256 id => Ticket) public tickets;
    mapping(uint256 => string) private eventURIs;
    uint256[] public eventIds;
    

    event TicketCreated(
        string indexed eventName,
        uint256 indexed tokenId,
        uint256 indexed createDate,
        uint256 startingDate,
        uint256 expirationDate,
        string description, 
        uint256 maxSupply
    );
    event TicketMinted(address indexed account, uint256 tokenId, uint256 totalSupply);

    constructor() 
        ERC1155("") { // Llamada al constructor de ERC1155 con un argumento vacío
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(URI_SETTER_ROLE, msg.sender);
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function createTicket(
        string memory _eventName,
        uint256 _startingDate,
        uint256 _expirationDate,
        string memory _description,
        uint256 _maxSupply,
        string memory _uri
    ) public onlyRole(MINTER_ROLE) returns(uint256) {
        require(_expirationDate > block.timestamp, "La fecha de expiracion debe ser en el futuro");
        require(_startingDate < _expirationDate, "La fecha de expiracion debe ser despues de la fecha de inicio");
        require(bytes(_eventName).length > 0, "El Ticket debe tener un nombre");
        require(_maxSupply>0, "El maximo numero de minteos debe ser mayor a 0");

        uint256 id = uint256(keccak256(abi.encodePacked(_eventName, block.timestamp, _startingDate, _expirationDate)));
        if (tickets[id].createDate != 0){ // What to do if the id has already been taken
            id++;
        }

        Ticket memory newTicket = Ticket({
            tokenId: id,
            eventName: _eventName,
            createDate: block.timestamp,
            startingDate: _startingDate,
            expirationDate: _expirationDate,
            description: _description,
            maxSupply: _maxSupply
        });

        tickets[newTicket.tokenId] = newTicket;
        eventIds.push(newTicket.tokenId);
        eventURIs[newTicket.tokenId] = _uri;
        emit TicketCreated(
            newTicket.eventName, 
            newTicket.tokenId, 
            newTicket.createDate, 
            newTicket.startingDate, 
            newTicket.expirationDate, 
            newTicket.description,
            newTicket.maxSupply
        );
        return newTicket.tokenId;
    }

    function getEvents() public view returns(uint256[] memory){
        return eventIds;
    }

    function mint(
        address _account, 
        uint256 _eventId 
    ) public onlyRole(MINTER_ROLE) {

        require(tickets[_eventId].expirationDate > block.timestamp, "El ticket ha expirado o no existe");
        require(balanceOf(_account, _eventId) == 0, "Solo un ticket por persona / evento");
        require(tickets[_eventId].maxSupply > eventAddressList[_eventId].length, "Maximo numero de tickets emitidos para este evento");
        
        _mint(_account, _eventId, 1, "");

        // Registra el minteo para el evento actual
        eventAddressList[_eventId].push(_account);
        TicketId memory newTicketId = TicketId({
            tokenId: _eventId,
            seat: eventAddressList[_eventId].length
        });
        ticketsByAccount[_account].push(newTicketId);

        emit TicketMinted(_account, _eventId, totalSupply(_eventId));
    }

    // Function to set the URI for a specific token ID
    function setEventURI(uint256 eventId, string memory newURI) public onlyRole(MINTER_ROLE) {
        require(tickets[eventId].createDate > 0, "El evento no existe");
        eventURIs[eventId] = newURI;
        emit URI(newURI, eventId);
    }

    // Override the URI function
    function uri(uint256 eventId) override public view returns (string memory) {
        require(bytes(eventURIs[eventId]).length > 0, "TICKETToken: URI not set");
        return eventURIs[eventId];
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyRole(MINTER_ROLE)
    {
    }

    function getEventAddresses(uint256 _eventId) public view returns (address[] memory) {
        require(tickets[_eventId].createDate > 0, "El evento no existe");
        return eventAddressList[_eventId];
    }

    function getTicketsByAccount(address _account) public view returns(TicketId[] memory){
        return ticketsByAccount[_account];
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}