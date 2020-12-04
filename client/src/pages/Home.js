import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="card">
          <p><span className="inline-emoji">💁‍♀️</span> Slack messages into emoji with <span className="inline-emoji"
            style={{ transform: "scaleX(-1)" }}>💁‍</span>
          </p>
          <h1>Remoji! <span className="emoji"></span></h1>
          <a
            href="https://slack.com/oauth/v2/authorize?client_id=486283548288.1191090806865&scope=chat:write,chat:write.customize,chat:write.public,commands,users:read&user_scope=chat:write,emoji:read,users:read"><img
              alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
        </div>
      </div>
    );
  }
}
export default Home;