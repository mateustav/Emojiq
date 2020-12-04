import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <div class="container">
          <div class="card">
            <p><span class="inline-emoji">💁‍♀️</span> Slack messages into emoji with <span class="inline-emoji"
              style={{transform: "scaleX(-1)"}}>💁‍</span>
            </p>
            <h1>Thank you! <span class="emoji"></span></h1>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;