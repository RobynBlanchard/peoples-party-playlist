export default (reactDom, styles, reduxState) => `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width">
          <title>People's Party Playlist</title>
          ${styles}
          <link href="https://fonts.googleapis.com/css?family=Righteous" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css?family=Karla" rel="stylesheet">
          <link rel="shortcut icon" href="http://localhost:5000/images/favicon.ico">
      </head>
      <script src="https://unpkg.com/ionicons@4.5.5/dist/ionicons.js"></script>

      <body style="margin:0;">
        <div id="app">${reactDom}</div>
        <script>
          window.REDUX_DATA = ${JSON.stringify(reduxState)}
        </script>
        <script type="text/javascript" src="/main.bundle.js"></script>
      </body>
      </html>
  `;
