const { app, BrowserWindow, ipcMain } = require('electron')
const  path = require('node:path')
const { TodosModel } = require('./todosModel')
const { startMcpServer } = require('./mcpServer')

const todosModel = new TodosModel()

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  const todosApi = {
    list: () => todosModel.list(),
    add: (title) => {
      const newTodo = todosModel.add(title)
      win.webContents.send('update', todosModel.list())
      return newTodo
    },
    complete: (id) => {
      todosModel.complete(id)
      win.webContents.send('update', todosModel.list())
    }
  }

  ipcMain.handle('list', () => todosApi.list())
  ipcMain.handle('add', (_event, title) => todosApi.add(title))
  ipcMain.handle('complete', (_event, id) => todosApi.complete(id))

  win.loadFile('index.html')
  startMcpServer(todosApi)
})
