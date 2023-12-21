import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    Grid,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  export default function CardPoaps() {
    return (
   
      <Center py={6}>

        <Grid templateColumns="repeat(4, 1fr)" gap={10} mt={12}>
          {/* Primer Avatar */}
          <Box>
            <Avatar
              size={'2xl'}
              src={
                'https://ipfs.io/ipfs/QmeypcTqueZHUaGPDvFrTTv9Fi4C5J21C2twRAA1cbz4Es'
              }
             css={{
      border: '10px solid black',
      width: '200px', // Tamaño personalizado en píxeles
      height: '200px', // Tamaño personalizado en píxeles
    }}
            />
          </Box>
          {/* Segundo Avatar */}
          <Box>
            <Avatar
              size={'2xl'}
              src={
                'https://ipfs.io/ipfs/QmeypcTqueZHUaGPDvFrTTv9Fi4C5J21C2twRAA1cbz4Es'
              }
             css={{
      border: '10px solid black',
      width: '200px', // Tamaño personalizado en píxeles
      height: '200px', // Tamaño personalizado en píxeles
    }}
            />
          </Box>
          {/* Tercer Avatar */}
          <Box>
            <Avatar
              size={'2xl'}
              src={
                'https://ipfs.io/ipfs/QmeypcTqueZHUaGPDvFrTTv9Fi4C5J21C2twRAA1cbz4Es'
              }
             css={{
      border: '10px solid black',
      width: '200px', // Tamaño personalizado en píxeles
      height: '200px', // Tamaño personalizado en píxeles
    }}
            />
          </Box>
          {/* Cuarto Avatar */}
          <Box>
            <Avatar
              size={'2xl'}
              src={
                'https://ipfs.io/ipfs/QmeypcTqueZHUaGPDvFrTTv9Fi4C5J21C2twRAA1cbz4Es'
              }
             css={{
      border: '10px solid black',
      width: '200px', // Tamaño personalizado en píxeles
      height: '200px', // Tamaño personalizado en píxeles
    

    }}
            />
          </Box>
          {/* Quinto Avatar */}
          <Box>
            <Avatar
              size={'2xl'}
              src={
                'https://ipfs.io/ipfs/QmeypcTqueZHUaGPDvFrTTv9Fi4C5J21C2twRAA1cbz4Es'
              }
             css={{
      border: '10px solid black',
      width: '200px', // Tamaño personalizado en píxeles
      height: '200px', // Tamaño personalizado en píxeles
    

    }}
            />
          </Box>
          {/* Sexto Avatar */}
          <Box>
            <Avatar
              size={'2xl'}
              src={
                'https://ipfs.io/ipfs/QmeypcTqueZHUaGPDvFrTTv9Fi4C5J21C2twRAA1cbz4Es'
              }
             css={{
      border: '10px solid black',
      width: '200px', // Tamaño personalizado en píxeles
      height: '200px', // Tamaño personalizado en píxeles
    
      

    }}
    
    />
    </Box>
    {/* Sexto Avatar */}
    <Box>
      <Avatar
        size={'2xl'}
        src={
          'https://ipfs.io/ipfs/QmeypcTqueZHUaGPDvFrTTv9Fi4C5J21C2twRAA1cbz4Es'
        }
       css={{
border: '10px solid black',
width: '200px', // Tamaño personalizado en píxeles
height: '200px', // Tamaño personalizado en píxeles



}}

/>
</Box>
{/* Sexto Avatar */}
<Box>
  <Avatar
    size={'2xl'}
    src={
      'https://ipfs.io/ipfs/QmeypcTqueZHUaGPDvFrTTv9Fi4C5J21C2twRAA1cbz4Es'
    }
   css={{
border: '10px solid black',
width: '200px', // Tamaño personalizado en píxeles
height: '200px', // Tamaño personalizado en píxeles



}}

    
    
            />
          </Box>
  
        </Grid>
        
      </Center>
      
    );
  }
  