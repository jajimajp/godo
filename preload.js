const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('todosClient', {
  list: () => ipcRenderer.invoke('list'),
  add: (title) => ipcRenderer.invoke('add', title),
  complete: (id) => ipcRenderer.invoke('complete', id),

  subscribeOnUpdate: (callback) => {
    const wrappedFn = (_, value) => callback(value)
    ipcRenderer.on('update', wrappedFn)

    const unsubscribe = () => { ipcRenderer.off('update', wrappedFn) }
    return unsubscribe
  },
})
