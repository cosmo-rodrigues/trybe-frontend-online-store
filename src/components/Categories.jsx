import React, { Component } from 'react';
import * as api from '../services/api';

class Categories extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    api
      .getCategories()
      .then((categories) => this.setState({ categories }))
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <h2>Categorias</h2>
        {this.state.categories.map((category) =>
        <div data-testid="category" key={category.name}>
          <input type="radio" name="category" value={category.name} />
          <label htmlFor={category.name}>{category.name}</label>
          </div>
        )}
      </div>
    );
  }
}

export default Categories;