const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 600,
    height: 600,
  })

  win.loadFile('index.html')
})
