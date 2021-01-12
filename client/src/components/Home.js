function Home() {
  return (
    <>
      <a href="https://slack.com/oauth/v2/authorize?client_id=486283548288.1191090806865&scope=chat:write,chat:write.customize,chat:write.public,commands,users:read&user_scope=chat:write,emoji:read,users:read">
        <img
          alt="Add to Slack"
          height="40"
          width="139"
          src="https://platform.slack-edge.com/img/add_to_slack.png"
          srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
        />
      </a>
    </>
  );
}
export default Home;
