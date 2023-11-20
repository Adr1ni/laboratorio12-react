import React, { Component } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class CharacterList extends Component {
  state = {
    characters: [],
  };

  componentDidMount() {
    axios
      .get('https://swapi.dev/api/people/')
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
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {this.state.characters.map((character, index) => (
            <Col key={index}>
              <Card className="custom-card">
                <Card.Body>
                  <Card.Title className="fw-bold">{character.name}</Card.Title>
                  <Card.Text>
                    <strong>Género:</strong> {character.gender}<br />
                    <strong>Año de nacimiento:</strong> {character.birth_year}<br />
                    <strong>Altura:</strong> {character.height} cm<br />
                    <strong>Peso:</strong> {character.mass} kg<br />
                    <strong>Color de cabello:</strong> {character.hair_color}<br />
                    <strong>Color de piel:</strong> {character.skin_color}<br />
                    <strong>Color de ojos:</strong> {character.eye_color}<br />
                    {character.films && (
                      <div>
                        <strong>Películas:</strong>
                        <ul>
                          {character.films.map((film, index) => (
                            <li key={index}>{film}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {character.vehicles && (
                      <div>
                        <strong>Vehículos:</strong>
                        <ul>
                          {character.vehicles.map((vehicle, index) => (
                            <li key={index}>{vehicle}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {character.starships && (
                      <div>
                        <strong>Naves espaciales:</strong>
                        <ul>
                          {character.starships.map((starship, index) => (
                            <li key={index}>{starship}</li>
                          ))}
                        </ul>
                      </div>
                    )}
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
