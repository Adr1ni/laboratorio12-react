import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Card, Row, Col } from 'react-bootstrap';

function CharacterLoader() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = () => {
    axios
      .get('https://swapi.dev/api/people/')
      .then((response) => {
        setCharacters(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-4 star-background">
      <h1 className="main-title text-center mb-4">
        Explorar personajes de <span className="highlight-yellow">Star Wars</span>
      </h1><br />
      <Form.Group controlId="formSearch" className="mb-3">
        <div className="input-group">
          <Form.Control
            type="text"
            placeholder="Buscar personaje"
            value={search}
            onChange={handleSearchChange}
            className="form-control rounded-pill py-3 px-4"
          />
          <button className="btn btn-primary rounded-pill btn-search" type="button">
            Buscar
          </button>
        </div>
      </Form.Group>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredCharacters.map((character, index) => (
          <Col key={index}>
            <Card className="character-card">
              <Card.Body className="character-body">
                <Card.Title className="card-title">{character.name}</Card.Title>
                <Card.Text>
                  <strong>Género:</strong> {character.gender}<br />
                  <strong>Año de nacimiento:</strong> {character.birth_year}<br />
                  <strong>Altura:</strong> {character.height} cm<br />
                  <strong>Peso:</strong> {character.mass} kg<br />
                  <strong>Color de cabello:</strong> {character.hair_color}<br />
                  <strong>Color de piel:</strong> {character.skin_color}<br />
                  <strong>Color de ojos:</strong> {character.eye_color}<br />
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

