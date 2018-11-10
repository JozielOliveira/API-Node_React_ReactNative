import React, { Component } from 'react';
import socket from 'socket.io-client';

import api from '../services/api';

import Tweet from '../components/Tweet';

import './Timeline.css';
import twitterLogo from '../twitter.svg';

export default class pages extends Component {
  state = {
      newTwitt : '',
      tweets: []
  }

  componentDidMount = async() =>{
    
    this.subscribeToEvents();

    const tweets =  await api.get('tweet')
    
    this.setState({ tweets : tweets.data})
  }

  handleInput = event => {
    this.setState({ newTwitt : event.target.value})
  }

  handleSubmit = async event => {
      
    if( event.keyCode !== 13 ) return;
    
    await api.post('tweet', {author: localStorage.getItem('user'), conten: this.state.newTwitt});

    this.setState({ newTwitt : '' });
  }

  subscribeToEvents = () => {
      const io = socket('http://localhost:3000');

      io.on('tweet', data => this.setState({ tweets : [data, ...this.state.tweets] } ) );

      io.on('like', data => this.setState({ tweets : this.state.tweets.map( tweet => tweet._id === data._id ? data : tweet) }));
  }

  render() {
    return (
        <div className='timeline-wrapper'>
            <img 
                src={twitterLogo}
                alt='logo'
                height={24}
            />
            <form>
                <textarea 
                    value={this.state.newTwitt}
                    onChange={this.handleInput}
                    onKeyDown={this.handleSubmit}
                />
            </form>

            <ul className='tweet-list'>
                {this.state.tweets.map(tweet => <Tweet key={tweet._id} tweet={tweet} />)}
            </ul>
        </div> 
    );
  }
}
