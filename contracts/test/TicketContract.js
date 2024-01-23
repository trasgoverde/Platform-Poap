var { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
var { expect } = require("chai");
var { ethers } = require("hardhat");
var { time } = require("@nomicfoundation/hardhat-network-helpers");

const { getRole, deploySC, deploySCNoUp, ex, pEth } = require("../utils");
const keccak256 = require("keccak256");

const DEFAULT_ADMIN_ROLE = getRole("DEFAULT_ADMIN_ROLE");
const MINTER_ROLE = getRole("MINTER_ROLE");
const BURNER_ROLE = getRole("BURNER_ROLE");
const URI_SETTER_ROLE = getRole("URI_SETTER_ROLE");

var owner, alice;
const timeNow = Math.floor(new Date().getTime()/1000.0);

before(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    provider = ethers.provider;

    
});

describe("Set up", function () {
    it("Publish contract", async () => {
        // Publicar TicketContract 
        TicketToken = await hre.ethers.getContractFactory("TicketContract");
        contractTicket = await hre.ethers.deployContract("TicketContract");
        // console.log("Contrato address: ", contractTicket.target);
    });
});

describe("Ticket management", function () {
    it("protects the creation of a Ticket", async () => {
        await expect(contractTicket.connect(alice).createTicket("evento", 1701232998, timeNow + 10000, "description", 100, "https://ipfs.io/ipfs/QmVFTyfbzo2v4L3R4uSgF46nmiRCwNFHniVZAZLotKy8Me?filename=5.png")).to.be.reverted;
    });
    it("eventName, and dates from TicketContractProxy cannot be empty", async () => {
        await expect(contractTicket.connect(owner).createTicket("", 1701232998, timeNow + 10000, "description", 100, "")).to.revertedWith("El Ticket debe tener un nombre");
        await expect(contractTicket.connect(owner).createTicket("Nombre del evento", 0, 0, "", 100, "")).to.revertedWith("La fecha de expiracion debe ser en el futuro");
        await expect(contractTicket.connect(owner).createTicket("Nombre del evento", timeNow + 1000, timeNow + 100, "", 100, "")).to.revertedWith("La fecha de expiracion debe ser despues de la fecha de inicio");
    });
    it("creates a Ticket", async () => {
        await expect(contractTicket.connect(owner).createTicket("evento", 1701232998, timeNow + 10000, "description", 100, "https://ipfs.io/ipfs/QmVFTyfbzo2v4L3R4uSgF46nmiRCwNFHniVZAZLotKy8Me?filename=5.png")).to.emit(contractTicket,"TicketCreated");
        var events = await contractTicket.getEvents();
        console.log(events);
        expect(events.length).to.be.greaterThan(0);
    });
    it("max supply of tickets need to be greater than 0", async () => {
        await expect(contractTicket.connect(owner).createTicket("evento", 1701232998, timeNow + 10000, "description", 0, "https://ipfs.io/ipfs/QmVFTyfbzo2v4L3R4uSgF46nmiRCwNFHniVZAZLotKy8Me?filename=5.png")).to.revertedWith("El maximo numero de minteos debe ser mayor a 0");
    });
    it("lists created tickets", async () => {
        var events = await contractTicket.getEvents();
        
        // Add a new event
        await contractTicket.connect(owner).createTicket("evento", 1701232998, timeNow + 10000, "description", 100, "https://ipfs.io/ipfs/QmVFTyfbzo2v4L3R4uSgF46nmiRCwNFHniVZAZLotKy8Me?filename=5.png");

        // Now, there should be a +1 length to the event array
        var events2 = await contractTicket.getEvents();
        expect(events.length + 1).to.equal(events2.length);
    });
    it("displays the details for a ticket", async () => {
        var events = await contractTicket.getEvents();
        var event_id = events[0];
        // console.log("id a enviar: " + event_id);
        var event = await contractTicket.tickets(event_id);

        expect(event.eventName).to.equal("evento");
        expect(event.startingDate).to.equal(1701232998);
        expect(event.expirationDate).to.equal(timeNow + 10000);
        expect(event.description).to.equal("description");
        expect(event.maxSupply).to.equal(100);
    });
});

describe("Minting tickets", function () {
    it("mint is protected by MINTER_ROLE", async () => {
        await expect(contractTicket.connect(alice).mint(alice.address, 1)).to.be.reverted;
    });
    it("cannot mint a non-existing event", async () => {
        const nonExistingId = 34938429;
        await expect(contractTicket.connect(owner).mint(alice.address, nonExistingId)).to.be.reverted;
    });
    it("allows the minter to mint", async () => {
        var events = await contractTicket.getEvents();
        console.log("eventos: " +events);
        const eventId = events[0];
        await expect(contractTicket.connect(owner).mint(alice.address, eventId)).to.emit(contractTicket,"TicketMinted");
    });
    it("cannot mint more than the max supply defined for the ticket", async () => {
        await contractTicket.createTicket(
            "evento", 1701232998, timeNow + 10000, "description", 1, "https://ipfs.io/ipfs/QmVFTyfbzo2v4L3R4uSgF46nmiRCwNFHniVZAZLotKy8Me?filename=5.png"
        );
        // console.log(eventId.data);
        var eventId = await contractTicket.getEvents();
        await contractTicket.connect(owner).mint(alice.address, eventId[eventId.length-1]);
        await expect(contractTicket.connect(owner).mint(bob.address, eventId[eventId.length-1])).to.revertedWith("Maximo numero de tickets emitidos para este evento");
    });
    it("lists tickets minted from an account", async () => {
        await contractTicket.connect(owner).createTicket("evento3", 1701232998, timeNow + 10000, "description", 100, "https://ipfs.io/ipfs/QmVFTyfbzo2v4L3R4uSgF46nmiRCwNFHniVZAZLotKy8Me?filename=5.png")
        var events = await contractTicket.getEvents();
        var eventId = events[events.length-1];
        await contractTicket.connect(owner).mint(bob.address, eventId);
        await contractTicket.connect(owner).mint(alice.address, eventId);
        var aliceTickets = await contractTicket.connect(alice).getTicketsByAccount(alice.address);
        expect(aliceTickets.length).to.equal(3);
        expect(aliceTickets[0].tokenId).to.equal(events[0]);
        expect(aliceTickets[0].seat).to.equal(1);
        expect(aliceTickets[2].seat).to.equal(2);
    });
    it("lists mints from tickets", async () => {
        var events = await contractTicket.getEvents();
        var tickets = await contractTicket.connect(alice).getEventAddresses(events[events.length-1]);
        expect(tickets.length).to.equal(2);
    });
    it("managing uris", async() => {
        var events = await contractTicket.getEvents();
        var eventId = events[0];
        var newURI = "http://test.com";
        await contractTicket.connect(owner).setEventURI(eventId, newURI);
        expect(await contractTicket.uri(eventId)).to.equal(newURI);
    });
});
