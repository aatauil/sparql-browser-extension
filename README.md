
<h1 align="center">
  <br>
  <img src="https://user-images.githubusercontent.com/52280338/215782497-e158c4b5-1906-44d8-a122-067cee1830ec.png" alt="Sparqlbrowserextension" width="50"></img>
  <br>
   Sparql Browser extension
  <br>
</h1>

<h4 align="center">Feature rich sparql editor as a browser extension</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#development">Development</a> •
  <a href="#in-depth">In Depth</a> •
  <a href="#license">License</a>
</p>

![screenshot](https://user-images.githubusercontent.com/52280338/215781479-01d4c419-ca22-4fe8-81d7-4b83c3301d10.png)

## Key Features

* Databases - Keep a list of all your databases
* Query lists - Save your queries in list
* Favorites list - keep your favorite queries across databases by hand
* Sparql editor based on Codemirror 6
* View sparql results in a clear grid table
* View created_at and modified_at for queries

## How To Use

This repo cnntains the pre-build extension in the build folder. So you just need to clone it and point chrome to the right folder.

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/aatauil/sparql-browser-extension.git
```

### Chrome (not tested on other browsers yet)

Open your browser and go to `chrome://extensions`

Enable the developer mode in the top right en click on the appearing `Load unpacked` button (top left). Navigate to the extensions `build/chrome-mv3-prod` directory and press save.

To see the extension, click on the puzzle piece icon on the Chrome toolbar, and click on the sparql-browser-extension extension. 

Pro tip: Pin your extension to the Chrome toolbar for easy access by clicking the pin button.


## Development

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/aatauil/sparql-browser-extension.git

# Go into the repository
$ cd sparql-browser-extension

# Install dependencies
$ pnpm install

# Build extension
$ pnpm run dev
```

When the extension finished building, open your browser and go to `chrome://extensions`

Enable the developer mode in the top right en click on the appearing `Load unpacked` button. Navigate to the extensions `build/chrome-mv3-dev` directory and press save.

To see the extension, click on the puzzle piece icon on the Chrome toolbar, and click on the extension icon. 

## In Depth
### Stack
This extension is build on react, specifically on the [plasmo framework](https://www.plasmo.com/) that makes extension development and publishes less painfull. Still painfull though. 

### Editor 
For the editor we use the [sparql-editor](https://github.com/aatauil/sparql-editor/tree/master/src) Any editor related issues just preferably be opened there.

### Grid
For the data grid we use [ag-grid](https://www.ag-grid.com/) so if you see any community features that you want to see included you can open an issue or PR for it

## License

MIT
