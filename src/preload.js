const { contextBridge, ipcRenderer } = require('electron')
const customTitlebar = require('custom-electron-titlebar');
window.onload = function () {
  const titlebar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex("#FFF")
  });
  contextBridge.exposeInMainWorld(
    'electron',
    {
      setWindowTitleBarColor: (setWindowTitleBarColor) => {
        titlebar.updateBackground(customTitlebar.Color.fromHex(setWindowTitleBarColor));
        ipcRenderer.send('setWindowTitleBarColor', setWindowTitleBarColor)
      },
      customApi: (customApi) => {
        ipcRenderer.send('customApi', customApi)
      }
    }
  )
}
