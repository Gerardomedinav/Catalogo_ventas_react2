import React, { useState } from 'react';
import { Box, Button, Image, Text, Flex } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import './Producto.css';

const Producto = ({ producto, onCompra }) => {
  const [compraRealizada, setCompraRealizada] = useState(false);

  const handleCompra = (cantidadComprada) => {
    console.log(`Hizo una compra de ${producto.nombre} (Cantidad: ${cantidadComprada})`);
    onCompra(producto.id, cantidadComprada);
    setCompraRealizada(true);
  };

  return (
    <Flex
  className="producto"
  direction={{ base: 'column', md: 'row' }}
  width="100%"
  margin="10px"
  align="center" // Alinea los elementos al centro
  bg="teal.200"
>
      <Image
        src={producto.imagen}
        alt={producto.nombre}
        boxSize={{ base: '100%', md: '30%', lg: '60%' }}
        objectFit="contain"
        marginBottom={{ base: '4', md: '0' }}
      />
      <Box p="4" width={{ base: '100%', md: '40%', lg: '40%' }} flex={{ base: '1', md: '0 0 50%' }} minWidth="100px">
        <Text fontSize="xl" fontWeight="bold">
          {producto.nombre}
        </Text>
        <Text fontSize="md">Precio: ${producto.precio.toFixed(2)}</Text>
        <Text fontSize="md">Descripción: {producto.descripcion}</Text>
        <Text fontSize="md">SKU: {producto.sku}</Text>
        <Text fontSize="md">Disponible: {producto.cantidad_disponible}</Text>
        {!compraRealizada && producto.cantidad_disponible > 0 ? (
          <Formik
            initialValues={{ cantidad: 1 }}
            onSubmit={(values, actions) => {
              if (values.cantidad <= producto.cantidad_disponible && values.cantidad > 0) {
                handleCompra(values.cantidad);
                actions.resetForm();
              } else {
                console.log('Error en la cantidad seleccionada.');
                
              }
            }}
          >
            <Form>
              <Field name="cantidad">
                {({ field }) => (
                  <Box>
                    <Text fontSize="md">Comprar Cantidad :</Text>
                    <input
                      type="number"
                      {...field}
                      min="1"
                      max={producto.cantidad_disponible}
                    />
                  </Box>
                )}
              </Field>
              <Button colorScheme="blue" mt="2" type="submit">
                Comprar
              </Button>
            </Form>
          </Formik>
        ) : (
          <Text mt="2" color="green.500">
            {producto.cantidad_disponible === 0 ? 'Producto agotado' : 'Gracias por su compra.'}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default Producto;
