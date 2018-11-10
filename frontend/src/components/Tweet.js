import React, { Component } from 'react';

import './Tweet.css';
import likeIcon from '../like.svg'
import api from '../services/api';

export default class Tweet extends Component {

  handleLike = async e => {
      const { tweet } = this.props;

      api.post(`like/${tweet._id}`)
  }

  render() {
    const { tweet } = this.props;
    return (
        <li className='tweet'>
            <strong>{tweet.author}</strong>
            <p>{tweet.conten}</p>
            <button onClick={this.handleLike}>
                <img src={likeIcon} alt='like'/>
                {tweet.likes}
            </button>
        </li>
    );
  }
}
