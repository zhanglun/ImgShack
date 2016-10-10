'use strict';

var _electron = require('electron');

var _electron2 = _interopRequireDefault(_electron);

var _electronConnect = require('electron-connect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _electron2.default.app;
var Menu = _electron2.default.Menu;
var BrowserWindow = _electron2.default.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = void 0;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700
  });

  // Menu.setApplicationMenu(customMenu);
  // 不显示菜单栏
  // mainWindow.setMenu(null);
  // and load the index.html of the bin.
  mainWindow.loadURL('file://' + __dirname + '/../resource/index.html');
  // for gulp reload
  _electronConnect.client.create(mainWindow);
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your bin supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  mainWindow.on('‘ready-to-show', function () {
    // mainWindow.webContents.send(INIT_APP, {
    //   data: 123123123
    // })
  });
  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  createWindow();
});

app.on('browser-window-created', function () {});
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the bin when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your bin's specific bin process
// code. You can also put them in separate files and require them here.