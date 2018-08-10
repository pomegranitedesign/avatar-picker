import React, { Component } from 'react';
import { Transition, animated } from 'react-spring';

import avatarOne from '../../Assets/Avatars/avatar1.png';
import avatarTwo from '../../Assets/Avatars/avatar2.png';
import avatarThree from '../../Assets/Avatars/avatar3.png';
import avatarFour from '../../Assets/Avatars/avatar4.png';
import avatarFive from '../../Assets/Avatars/avatar5.png';
import avatarSix from '../../Assets/Avatars/avatar6.png';
import './App.css';

export default class App extends Component {
  state = {
    avatars: [avatarOne, avatarTwo, avatarThree, avatarFour, avatarFive, avatarSix],
    currentAvatar: avatarOne,
    toggled: false,
    isLoading: false
  }

  toggle = _ => {
    this.setState(({toggled}) => ({toggled: !toggled}));
  }

  makeCurrentAvatar = newAvatar => {
    this.setState(_ => ({isLoading: true}));

    setTimeout(() => {

      this.setState(_ => ({
        currentAvatar: newAvatar,
        toggled: false,
        isLoading: false
      }));
    }, 1500);
  }

  renderAvatars = _ => {
    return this.state.avatars.map((avatar, idx, array) => (
      <img 
        src={avatar}
        key={idx}
        alt="AvatarImage"
        className={this.state.isLoading ? "AvatarSmall Loading" : "AvatarSmall"}
        onClick={() => this.makeCurrentAvatar(avatar)}
      />
    )); 
  }

  render() {
    const { avatars, currentAvatar, toggled } = this.state;

    return (
      <div className="App">
        <div>
          <img 
            src={currentAvatar}
            alt="Avatar"
            className="CurrentAvatar"
            onClick={this.toggle}
          />
        </div>

        {toggled ? (
          <Transition
            from={{height: 0   , opacity: 0}}
            enter={{height: 200, opacity: 1}}
            leave={{height: 0  , opacity: 0}}
            config={{
              tension: 100,
              friction: 9
            }}
          >
            {styles => (
              <div 
                className="AvatarPicker"
                style={{
                  height: styles.height
                }}
              >
                <ul style={{opacity: styles.opacity}}>
                  {this.renderAvatars()}
                </ul>
              </div>
            )}
          </Transition>
        ) : null}

      </div>
    );
  }
}
