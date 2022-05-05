const chatWeb = {
  chatPage: function(chat) {
    // Fill in anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="/CSS/styles.css">
        </head>
        <body>
          <div id="chat-app">
            <div class="display-panel">
              ${chatWeb.getUserList(chat)}
              ${chatWeb.getMessageList(chat)}
            </div>
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ol class="messages">` +
      // Fill in!
      Object.values(chat.messages).map( message => ` 
      <ul>
        <div class="message">
          <div class="container">
            <div>
              <span class="sender">${message.sender}</span>
            </div>
            <div>
              <span class="text">${message.text}</span>
            </div>
          </div>
        </div>
      </ul>
      `).join('') +
      `</ol>`;
  },
  getUserList: function(chat) {
    return `<ul class="users">` +
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getOutgoing: function() {
    // Fill in!
    return `
    <form action="/chat" method="post">
        <input type="hidden" name="sender" value="Amit">
        <input id="text" name="text" required>
        <button type="submit">Send</button>
    </form>
    `
  }
};
module.exports = chatWeb;
