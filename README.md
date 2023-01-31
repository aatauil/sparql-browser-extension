
<h1 align="center">
  <br>
  <img src="https://user-images.githubusercontent.com/52280338/215782497-e158c4b5-1906-44d8-a122-067cee1830ec.png" alt="Sparqlbrowserextention" width="50"></img>
  <br>
   Sparql Browser Extention [beta]
  <br>
</h1>

<h4 align="center">Fully featured sparql editor as a browser extention</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#development">Development</a> •
  <a href="#license">License</a>
</p>

![screenshot](https://user-images.githubusercontent.com/52280338/215781479-01d4c419-ca22-4fe8-81d7-4b83c3301d10.png)

## Key Features

* Workspaces - Organize your queries in workspaces
* Query lists - Save your queries in list
* Favorites list - keep your favorite queries across workspaces by hand
* Sparql editor based on Codemirror 6
* View sparql results in a clear grid table
* View created_at and modified_at for queries

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/aatauil/sparql-browser-extention.git

# Go into the repository
$ cd sparql-browser-extention

# Install dependencies
$ pnpm install

# Build extention
$ pnpm run build
```

### Chrome

When the extention finished building, open your browser and go to `chrome://extensions`

Enable the developer mode in the top right en click on the appearing `Load unpacked` button. Navigate to the extentions `build/chrome-mv3-prod` directory and press save.

To see the extention, click on the puzzle piece icon on the Chrome toolbar, and click on your extension. 

Pro tip: Pin your extension to the Chrome toolbar for easy access by clicking the pin button.


## Development

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/aatauil/sparql-browser-extention.git

# Go into the repository
$ cd sparql-browser-extention

# Install dependencies
$ pnpm install

# Build extention
$ pnpm run dev
```

When the extention finished building, open your browser and go to `chrome://extensions`

Enable the developer mode in the top right en click on the appearing `Load unpacked` button. Navigate to the extentions `build/chrome-mv3-dev` directory and press save.

To see the extention, click on the puzzle piece icon on the Chrome toolbar, and click on the extension icon. 

## License

MIT
