import React, { useState, useEffect } from 'react';
import { ChakraProvider, extendTheme, SimpleGrid } from '@chakra-ui/react';
import Producto from './Components/Producto/Producto';
import './App.css';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'blue.500',
      },
    },
  },
});

function App() {
  const [productos, setProductos] = useState([]);
  const [cantidadesCompradas, setCantidadesCompradas] = useState({});

  const handleCompra = (productoId, cantidadComprada) => {
    setCantidadesCompradas((prevCantidades) => ({
      ...prevCantidades,
      [productoId]: (prevCantidades[productoId] || 0) + cantidadComprada,
    }));

    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === productoId
          ? {
              ...producto,
              cantidad_disponible: producto.cantidad_disponible - cantidadComprada,
            }
          : producto
      )
    );
  };

  useEffect(() => {
    // Cargar datos desde el archivo JSON
    fetch('/producto.json')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3 }} spacing={3}>
        {productos.map((producto) => (
          <Producto
            key={producto.id}
            producto={producto}
            onCompra={(productoId, cantidadComprada) =>
              handleCompra(productoId, cantidadComprada)
            }
          />
        ))}
      </SimpleGrid>
    </ChakraProvider>
  );
}

export default App;
