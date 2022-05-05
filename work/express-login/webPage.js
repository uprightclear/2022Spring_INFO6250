const webPage = {
    loginPage: function() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Express Login</title>
                <link rel="stylesheet" href="/CSS/styles.css">
            </head>
            <body>
                <div class="login">
                    <form action="/login" method="POST">
                        Username: <input name="username">
                        <button type="submit">Login</button>
                    </form>
                </div>
            </body>
            </html>
        `;
    },

    loginFail: function (errors) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Express Login</title>
                <link rel="stylesheet" href="/CSS/styles.css">
            </head>
            <body>
                <div class="loginFile">
                    <p>${errors}</p>
                    <p>Please <a href="/">Retry</a></p>                    
                </div>
            </body>
            </html>
        `
    },

    dataPage: function (username, word) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Express Login</title>
                <link rel="stylesheet" href="/CSS/styles.css">
            </head>
            <body>
                <div class="dataPage">
                    <div class="showData">
                        <p>You are logged in as ${username}</p>
                        <p>Your word: ${word}</p>
                    </div>
                    <div class="changeData">
                        <form action="/change" method="POST">
                            Change your word: <input name="word">
                            <button type="submit">Change</button>
                        </form>
                    </div> 
                    <div class="logOut">
                        <form action="/logout" method="POST">
                            <button type="submit">Logout</button>
                        </form>
                    </div>                   
                </div>
            </body>
            </html>
        `
    }
}

module.exports = webPage;