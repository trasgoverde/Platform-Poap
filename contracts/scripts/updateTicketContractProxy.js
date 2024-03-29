const { ethers } = require("hardhat");
const { updateProxyImplementation } = require("../utils"); // O cualquier función necesaria para la actualización

async function deployMumbai(newImplementationAddress) {
  console.log("Actualizando la dirección de implementación en el contrato TicketContractProxy...");

  // Suponiendo que tienes acceso al contrato proxy y su dirección
  const proxyAddress = process.env.PROXY_ADDRESS; // Reemplaza con la dirección real del contrato proxy
  const TicketContractProxy = await ethers.getContractAt("TicketContractProxy",proxyAddress ); // Reemplaza "TicketContractProxy" por el nombre real de tu contrato proxy

  // Actualizar la dirección de la implementación en el contrato proxy
  await updateProxyImplementation(TicketContractProxy, newImplementationAddress); // Función para actualizar, reemplaza con tu propia lógica

  console.log("¡Actualización de la implementación exitosa en el contrato TicketContractProxy!");
}



deployMumbai()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });


