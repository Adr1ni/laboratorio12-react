// src/CharacterList.js

import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 

class CharacterList extends Component {
  state = {
    characters: [],
  };

  componentDidMount() {
    axios.get('https://swapi.dev/api/people/')
      .then((response) => {
        this.setState({ characters: response.data.results });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <Container className="mt-4">
        <h2 className="text-center mb-4">Personajes de Star Wars</h2>
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          {this.state.characters.map((character, index) => (
            <Col key={index} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title className="fw-bold">{character.name}</Card.Title>
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
}

export default CharacterList;
