# Emojiq

### App's purpose:

Emojiq is a bot that translates Slack messages into emoji when it detects keywords in the emoji library. 🎉

### Installation:

Visit the [Emojiq's website](https://emojiq-p4i3e.ondigitalocean.app/) to find the Install to Slack button. The installation process will ask you to accept certain permissions. Once you accept it, the emojiq command should be available in your workspace.

### Usage:

After installing Emojiq in your Slack server, you enable the emojiq command. To use it, type `/emojiq` in a channel or private message followed by the message you want to convert to emoji. E.g.:

```
   > /emojiq hammer time
   > 🔨⏱
```

### Dev

To get started with development environment, first fork and clone this repository, then run the following commands:

1. `npm install && nodemon`
2. Open a new tab in your terminal, and enter `cd client && npm start`

   #### Todo:

   Make this whole process a one line command only and Dockerify it.

### Notes on permissions

Emojiq requires certain permissions when you're installing in your Slack workspace. They are all essential for the app's work. I feel like Slack's choices of words could be improved, but even though it says that the app will _Send messages on your behalf_, it does so only when you and only you enter the emojiq command and the only messages it sends it's your own message, but replaced with emojis when it finds a match. The app will never act as you when you don't want and no one else that also has the app installed can do that.

Emojiq gets and safely stores Slack user access tokens into a secure SQL database. It does that so you can use Emojiq in private messages as well without the presence of the bot. It also stores a bot token so even users who haven't manually installed the app can use it in public channels.

### To-do:

-🔥 Allow custom emojis (coming soon!)
-Enable the production database
-Refactoring and app structure reoganization

### Contributing

Like the app? I'd love to hear how you can contribute to it! 😄
