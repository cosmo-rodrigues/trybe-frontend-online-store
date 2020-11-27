import React, { Component } from 'react';
import remove from './img/remove.png';
import add from './img/add-circle.png';
import removeitem from './img/remove-from-basket.png';

class Cart extends Component {
  constructor() {
    super();
    this.sumCart = this.sumCart.bind(this);
    this.addClick = this.addClick.bind(this);
    this.minClick = this.minClick.bind(this);
    this.atualizar = this.atualizar.bind(this);
    this.delet = this.delet.bind(this);
    this.state = {
      sumCart: 0,
      compras: [],
    };
  }

  componentDidMount(){
    this.sumCart();
    this.atualizar();
  }

  addClick(event) {
    const { name } = event.target;
    const cartItemsStorage = JSON.parse(localStorage.getItem('cartItems'));
    const PA = cartItemsStorage.filter((item) => item.id === name);
    const item = PA[0];
    item.qtd += 1;
    localStorage.setItem('cartItems', JSON.stringify(cartItemsStorage));
    this.atualizar();
  }

  delet(event) {
    const { name } = event.target;
    const cartItemsStorage = JSON.parse(localStorage.getItem('cartItems'));
    for (let i = 0; i < cartItemsStorage.length; i += 1) {
      if (cartItemsStorage[i].id === name) {
        cartItemsStorage.splice(i, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItemsStorage));
      }
    }
    this.atualizar();
  }

  minClick(event) {
    const { name } = event.target;
    const cartItemsStorage = JSON.parse(localStorage.getItem('cartItems'));
    const PA = cartItemsStorage.filter((item) => item.id === name);
    const item = PA[0];
    if (item.qtd === 1) {
      this.delet(event);
    } else {
      item.qtd -= 1;
      localStorage.setItem('cartItems', JSON.stringify(cartItemsStorage));
      this.atualizar();
    }
  }

  atualizar() {
    const cartitems = JSON.parse(localStorage.getItem('cartItems'));
    this.setState({ compras: cartitems });
    this.sumCart();
  }

  sumCart() {
    const cartitems = JSON.parse(localStorage.getItem('cartItems'));
    let summ = 0;
    cartitems.forEach((sum) => { summ += (sum.qtd * sum.price); });
    this.setState({ sumCart: summ });
  }

  render() {
    const { compras } = this.state;
    if (compras.length < 1) {
      return (
        <h3 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h3>
      );
    }
    return (
      <div>
        {compras.map((item) => (
          <div key={item.id}>
            <img src={removeitem} name={item.id} alt="Remover item" onClick={this.delet} />
            <img src={item.thumbnail} alt={item.title} />
            <p data-testid="shopping-cart-product-name">{item.title}</p>
            <img
              data-testid="product-decrease-quantity"
              src={remove}
              name={item.id}
              alt="retirar"
              onClick={this.minClick}
            />
            <p data-testid="shopping-cart-product-quantity">{item.qtd}</p>
            <img
              data-testid="product-increase-quantity"
              src={add}
              name={item.id}
              alt="adicionar"
              onClick={this.addClick}
            />
            <p>{item.qtd * item.price}</p>
          </div>
        ))}
        <h3>Valor Total da Compra: {this.state.sumCart}</h3>
      </div>
    );
  }
}

export default Cart;
