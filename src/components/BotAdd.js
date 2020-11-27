import React from 'react';
import PropTypes from 'prop-types';

class BotAdd extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <input
        type="button"
        onClick={ onClick }
        value="Adicionar ao Carrinho"
      />
    );
  }
}

BotAdd.propTypes = { onClick: PropTypes.func.isRequired };

export default BotAdd;
