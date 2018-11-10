import React, { Component } from 'react';

import twitterLogo from '../twitter.svg';
import './Login.css';

export default class pages extends Component {
  state = {
      userName : ''
  }

  handleInput = event => {
    this.setState({ userName : event.target.value})
  }

  handleSubmit = event => {
      event.preventDefault();
      
      const { userName } = this.state;

      if( !userName.length ) return;

      localStorage.setItem('user', userName);

      this.props.history.push('timeline');
  }

  render() {
    return (
        <div className='login-wrapper'>
            <form onSubmit={this.handleSubmit}>
                <img src={twitterLogo} alt='twitter'></img>
                <input 
                    onChange={this.handleInput}
                    value={this.state.userName}
                    placeholder='Nome do Usuário'
                />
                <button type='submit'>Entrar</button>
            </form>
        </div>
    );
  }
}
