// CharacterLoader.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function CharacterLoader() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(''); // Nuevo estado para la búsqueda

  const loadCharacters = () => {
    setLoading(true);

    axios
      .get('https://swapi.dev/api/people/')
      .then((response) => {
        setCharacters(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h1  className="mb-4 text-center">Personajes de Star Wars</h1>

      {/* Agregar el formulario de búsqueda */}
      <Form className="mb-3">
        <Form.Group controlId="formSearch" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Buscar personaje"
            value={search}
            onChange={handleSearchChange}
            className="rounded-pill py-2 px-3"
          />
        </Form.Group>
      </Form>
      <Button
        variant="primary"
        onClick={loadCharacters}
        disabled={loading}
        className="mb-3 rounded-pill"
        >
        {loading ? 'Cargando Personajes...' : 'Cargar Personajes'}
      </Button>

      <Row>
        {/* Mapear sobre los personajes filtrados */}
        {filteredCharacters.map((character, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card className="h-100 shadow-sm rounded">
            <Card.Body>
              <Card.Title>{character.name}</Card.Title>
              <Card.Text>
                <strong>Género:</strong> {character.gender}<br />
                <strong>Año de nacimiento:</strong> {character.birth_year}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CharacterLoader;

