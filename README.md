<div style="text-align: justify;">


# **Nombre del Proyecto: Token World Congress NFT POAP Generator**

El proyecto se enfoca en la creación de un sistema de contratos inteligentes con capacidad de actualización a través de un proxy, diseñado para facilitar la generación de NFT POAP (Proof of Attendance Protocol). El propósito principal es ofrecer a los usuarios una plataforma intuitiva que les permita crear sus propios NFT POAP de forma sencilla y realizar la mintificación de los mismos. El proyecto está compuesto por un conjunto de repositorios divididos en tres partes: backend, frontend y contratos inteligentes, cada uno contribuyendo a la funcionalidad completa de la aplicación.

# Descripción

Este proyecto consiste en un contrato inteligente actualizable con un proxy para la creación de NFT POAP (Proof of Attendance Protocol). Está alojado en un repositorio que se divide en tres secciones:

- **Backend:**  `/poap-backend`: "El backend del proyecto consiste en una aplicación Express en JavaScript que utiliza la biblioteca ethers para interactuar con contratos inteligentes en la red Ethereum. Este backend proporciona endpoints para manejar transacciones meta, específicamente para la creación ('minting') de NFT POAP. Utiliza un proveedor de Ethereum de Alchemy y un contrato inteligente definido por su dirección y ABI para llevar a cabo estas transacciones. Además, incluye validación de eventos existentes antes de realizar la mintificación del NFT POAP."

- **Frontend:** - `/poap-frontend`: "El directorio frontend contiene archivos y componentes de una aplicación web desarrollada en React.js para la creación de NFT POAP. La estructura principal incluye componentes como Cards, CardsUser, ImageLoad y DepositButton, cada uno desempeñando un papel específico en la interfaz de usuario y la funcionalidad del sistema.

El archivo principal, 'Admin.jsx', define la lógica principal para la creación de eventos POAP. Utiliza librerías como axios para realizar solicitudes HTTP, Web3 para interactuar con la red Ethereum, y qrcode.react para la generación de códigos QR.

Este archivo se encarga de manejar la carga de imágenes a través de Pinata Cloud a través de la función 'uploadFile', la creación de eventos POAP a través de la función 'createEvent', y la gestión de la interfaz de usuario para la entrada de datos necesarios, como el título del evento, fechas, descripciones y cantidad de POAPs a crear.

Además, contiene la integración con la red Ethereum para la creación de contratos utilizando Web3 y la interacción con el contrato inteligente definido por su ABI y dirección.

La estructura general del directorio frontend refleja la separación de responsabilidades en componentes React especializados para facilitar la creación y gestión de eventos POAP en la interfaz de usuario de manera intuitiva."


 # **Contratos** - `/poap-contracts`: Contratos del Proyecto
 - **`PoapContract`**
 - **`PoapContractProxy`**
 1. El contrato `PoapContract` es el corazón del ecosistema de NFTs POAP (Proof of Attendance Protocol). Este contrato se encarga de la creación, mintificación y gestión de los POAPs que representan la asistencia a eventos.

## Funcionalidades Clave:
- **Creación de POAPs**: Permite a los usuarios crear POAPs para eventos específicos con información detallada.
- **Mintificación de POAPs**: Facilita la mintificación de los POAPs creados, asignándolos a direcciones específicas.
- **Interfaz de Usuario Amigable**: Ofrece una interfaz intuitiva que permite a los usuarios interactuar fácilmente para la creación y mintificación de POAPs.
- **Gestión de Eventos**: Permite la gestión y visualización de eventos pasados y futuros asociados a los POAPs.
- **Actualización de Contratos**: Funcionalidad para actualizar los contratos inteligentes, manteniendo la flexibilidad y la capacidad de mejoras futuras.

2. El contrato `PoapContractProxy` actúa como un proxy para el contrato principal PoapContract, permitiendo la actualización dinámica de su implementación.

 ## Funcionalidades Principales:
Redirige llamadas y transacciones hacia la implementación actual del contrato PoapContract.
Permite actualizaciones de la implementación del contrato principal sin interrumpir sus funcionalidades.
Gestiona la dirección de la implementación y el cambio de administrador a través de funciones específicas.
Ambos contratos en conjunto ofrecen una infraestructura sólida y flexible para la gestión de los NFTs POAP, permitiendo la creación, distribución y actualización dinámica de estos tokens no fungibles asociados a la asistencia a eventos.


# Estructura de Directorios
El repositorio del proyecto está organizado de la siguiente manera:

## Backend
- **/poap-backend**: Contiene todos los archivos y carpetas relacionados con el servidor backend.
 - **app.js**: Archivo principal para iniciar y configurar el servidor.
 - **package.json**: Archivo que lista las dependencias y configuraciones del proyecto.

## Frontend
- **/poap-frontend**: Contiene todos los archivos y carpetas relacionados con el cliente/frontend.
   - **/public**: Archivos estáticos accesibles públicamente.
   - **/src**: Código fuente de la aplicación.
     - **/components**: Componentes reutilizables de la interfaz de usuario.
     - **/pages**: Archivos de las páginas principales de la aplicación.
     - **/styles**: Estilos globales o específicos del proyecto.
   - **package.json**: Archivo que lista las dependencias y configuraciones del proyecto.

## Contratos
- **/poap-contratos**: Contiene los contratos inteligentes utilizados en la aplicación.
   - **/contracts**: Archivos de contratos inteligentes Solidity.
   - **/ipfs**: Directorio para almacenamiento en IPFS o archivos relacionados.
   - **/scripts**: Scripts para despliegue, pruebas o migraciones de contratos.
   - **/test**: Archivos y resultados de pruebas para los contratos.
   - **/utils**: Utilidades o herramientas adicionales para los contratos.
   - **package.json**: Archivo que lista las dependencias y configuraciones del proyecto.


# Requisitos

## Contratos Inteligentes
- **Solidity Compiler**: Se requiere el compilador de Solidity (por ejemplo, solc) para compilar los contratos inteligentes.
- **Truffle/Hardhat**: Herramientas de desarrollo como Hardhat pueden ser útiles para el despliegue y pruebas de los contratos.
- **OpenZeppelin Contracts**: Dependencia de librerías como OpenZeppelin para contratos estándar y seguros.
- **Alchemy/Infura (u otro proveedor de nodos)**: Un proveedor de nodos Ethereum para desplegar y testear los contratos en la red Ethereum.

## Ambiente de Desarrollo
- **Node.js y npm/yarn**: Para la gestión de paquetes y ejecución de scripts.
- **Ganache**: Un entorno de cadena de bloques local para desarrollo y pruebas.
- **Git**: Para control de versiones y gestión del repositorio.

## Frontend y Backend
- **.next**: Dependiendo del frontend, se necesitará el entorno y las dependencias asociadas.
- **Express.js**: Para el manejo de solicitudes y la lógica del servidor.
- **Axios/Fetch**: Para las solicitudes HTTP en el frontend hacia el backend.
- **Web3.js/Ethers.js**: Librerías para interactuar con contratos en la red Ethereum.

## Configuración
- **Archivo .env**: Para gestionar variables de entorno como claves API, direcciones de contrato, etc.
- **Configuración de Infraestructura**: Asegúrate de tener las claves de acceso y configuraciones necesarias para el proveedor de nodos, servicio de almacenamiento IPFS/Pinata, etc.



# Instalación

## Backend

1. Clona el repositorio del backend. 
2. Instala las dependencias con `npm install`.
3. Configura Variables de Entorno:
Para configurar las variables de entorno, asegúrate de copiar el archivo `.env copy` como `.env` y completa las variables necesarias con sus respectivos valores. Aquí encontrarás las claves de API, credenciales de bases de datos y otros detalles de configuración importantes.
4. Ejecuta el servidor con `node app.js`.

## Frontend

1. Clona el repositorio del frontend.
2. Instala las dependencias con `npm install`.
3. Configura Variables de Entorno:
Para configurar las variables de entorno, asegúrate de copiar el archivo `.env.local.copy ` como `.env.local` y completa las variables necesarias con sus respectivos valores. Aquí encontrarás las claves de API, credenciales de bases de datos y otros detalles de configuración importantes.
4. Inicia la aplicación con `npm run dev`.

## Contratos

1. Clona el repositorio de contratos.
2. Configura Variables de Entorno:
Para configurar las variables de entorno, asegúrate de copiar el archivo `.env copy` como `.env` y completa las variables necesarias con sus respectivos valores. Aquí encontrarás las claves de API, credenciales de bases de datos y otros detalles de configuración importantes.
3. Despliegue de Contratos:
Utilizo Hardhat para compilar y desplegar los contratos. Ejecuto el siguiente comando para desplegar los contratos en un entorno local o de desarrollo: `npx hardhat run scripts/deploy.js --network <nombre_del_entorno>`.
4. Pruebas y Verificación:
Una vez desplegados, realizo pruebas para verificar el correcto funcionamiento de los contratos. Utilizo Hardhat para ejecutar pruebas unitarias o de integración:  `npx hardhat test `.

# Uso

## Uso de la Interfaz de la Aplicación
Nuestra aplicación ofrece una interfaz intuitiva que permite a los usuarios crear POAPs y realizar la mintificación de manera sencilla. Sigue estos pasos para aprovechar al máximo la funcionalidad:

## Creación de POAP:
Una vez dentro, encuentra la opción de "Crear POAP" o un botón similar en la interfaz principal.
Completa los detalles del evento: nombre, fechas de inicio y finalización, cantidad de POAPs a generar, descripción, y carga la imagen representativa del evento.

## Generación de Metadatos:
La plataforma creará automáticamente metadatos basados en la información proporcionada, como fechas, descripción, etc.
Verifica y confirma los detalles antes de proceder.

## Mintificación:
Una vez confirmados los detalles, procede con la mintificación de los POAPs.
Si utilizas una billetera compatible, podrás realizar la transacción directamente desde la interfaz.

## Seguimiento y Gestión:
Accede a la sección de "Mis POAPs" o un área similar para gestionar los POAPs creados y mintificados.
Aquí podrás ver el estado de las transacciones, la cantidad de POAPs creados y más detalles relevantes.

## Interacción con los POAPs:
Una vez mintificados, los POAPs estarán disponibles para su distribución y gestión.
Los usuarios podrán reclamar sus POAPs o participar en eventos relacionados.
Siguiendo estos pasos, los usuarios podrán fácilmente crear POAPs para eventos específicos, mintificarlos en la blockchain y gestionarlos de manera eficiente dentro de la aplicación.
</div>