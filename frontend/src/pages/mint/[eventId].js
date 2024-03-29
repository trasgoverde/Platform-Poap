import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Loading from '@/components/Loading';
import Cards from '@/components/Cards';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

export default function Mint() {
  const router = useRouter();
  const { eventId } = router.query;

  const [userAddress, setUserAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleConnectMetamask = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setUserAddress(accounts[0] || '');
      } else {
        console.error("Metamask no está instalado o no es compatible.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMintMyTicket = async () => {
    setLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_BACKURL}/mint/${userAddress}/${eventId}`)
      .then(function (response) {
        console.log(response);
        setLoading(false);
        setResponse(true);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setResponse(false);
        setErrorMessage(error.message);
      });
  }

  const handleErrorMessage = () => {
    setResponse(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br whitepy-6 flex flex-col items-center sm:py-12">
      <NavBar />
    

      {loading ? (
        <Loading />
      ) : response ? (
        
       
<div className="flex-grow text-center space-y-8">
    <div>
    <h1 className="mt-16 text-gray-600 text-6xl font-bold">
        ¡Bienvenido a los Tickets Generados!
      </h1>
    </div>
    <div>
      <h3 className="text-gray-800 text-2xl md:text-3xl lg:text-2xl">
        Aquí podrás reclamar tu TICKET
        <strong className="text-gray-600"> de cualquier tipo de evento </strong>
        de forma rápida y segura.
      </h3>
    </div>
    <div className="flex flex-col gap-6 text-gray-600 text-lg md:text-xl lg:text-md">
      <p>
        Para obtener tu TICKET personalizado, sigue estos pasos:
      </p>
      <ul className="list-disc pl-6">
        <li>
          Conecta tu billetera MetaMask haciendo clic en el botón "Conectar MetaMask".
        </li>
        <li>
          Asegúrate de seleccionar la dirección correcta de MetaMask.
        </li>
        <li>
          Haz clic en "Generar mi TICKET" para recibir tu TICKET único.
        </li>
      </ul>
    </div>
    <button
      className="text-white px-4 py-2 rounded-300 bg-blue-600 hover:bg-blue-800 text-lg md:text-xl lg:text-2xl"
      onClick={handleMintMyTicket}
    >
      Generar mi TICKET
    </button>
  </div>
      ) : (
        <div className="h-screen w-screen flex flex-col justify-center items-center gap-10">
          <Alert status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" width="400px" mb="8">
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Ha ocurrido un error
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              {errorMessage}
            </AlertDescription>
          </Alert>
          <button
            className="text-gray-600 px-4 py-2 rounded bg-red-800 hover:bg-red-600"
            onClick={handleErrorMessage}
          >
            Entendido
          </button>
          
        </div>
        
      )}

 <div className="text-gray-600 text-center mt-8">

    <div className="bg-emerald-400 text-black px-4 py-2 rounded-full inline-block hover:bg-emerald-300">
    <p className="font-bold">
      ¡Explora tus TICKETs minteados y disfruta de tus logros!
    </p>
  </div>

    <Cards/>

  </div>

    </div>
  );
}
