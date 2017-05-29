const {app, BrowserWindow, Notification} = require('electron')
const path = require('path')

let mainWindow = null

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit()
})

exports.load = (appUrl) => {
  app.on('ready', () => {
    const options = {
      width: 800,
      height: 600,
      autoHideMenuBar: true,
      backgroundColor: '#FFFFFF',
      webPreferences: {
        nodeIntegrationInWorker: true
      },
      useContentSize: true
    }
    if (process.platform === 'linux') {
      options.icon = path.join(__dirname, 'icon.png')
    }

    mainWindow = new BrowserWindow(options)
    mainWindow.loadURL(appUrl)
    mainWindow.focus()

    const n = new Notification({
      title: 'Foo',
      body: 'Bar',
      hasReply: true,
      replyPlaceholder: 'foo'
    });
    n.on('reply', (...args) => console.log(args));
    n.show();
  })
}
