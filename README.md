# OneStop4All
The OneStop4All is the primary visual and user-friendly [NFDI4Earth](https://www.nfdi4earth.de/) access point. It offers a coherent view on and points to all relevant Earth System Sciences (ESS) RDM resources provided by NFDI4Earth members and the ESS community, such as data repositories, software tools, information on Research Data Management (RDM), education and training materials. Learn more about our [Mission](https://nfdi4earth.de/about-us) and the [Resources](https://nfdi4earth.de/2facilitate/onestop4all).

## Quick start

Ensure that you have [Node](https://nodejs.org/en/) (Version 16 or later) and [pnpm](https://pnpm.io/) (Version 8.x) installed.

Then execute the following commands to get started:

Step 1: Install CORS-anywhere. 
This is only needed at the beginning for local development and testing until CORS is enabled in Solr.
```bash
$ git clone https://github.com/Rob--W/cors-anywhere.git
$ cd cors-anywhere
$ npm i 
$ npm run dev
```

Step 2: Install backend.
```bash
$ git clone https://git.rwth-aachen.de/nfdi4earth/onestop4all/onestop4all-harvester.git
```
Then, start Docker Desktop (In case you're using Windows) and open the folder "onestop4all-harvester" in Visual Studio Code, press F1 and "Rebuild and reopen in Container".
Next, open the file "harvest.py", press F5 and "Debug the currently active Python file". These steps will build the indices based on the data from the Knowledge Hub. Currently, building indicses takes around 10 seconds.

Step 3: Install web app.
```bash
$ git clone https://git.rwth-aachen.de/nfdi4earth/onestop4all/onestop4all-implementation.git
$ cd onestop4all-implementation
$ pnpm install
$ pnpm run dev
```
The app should now be available under [http://localhost:5173/](http://localhost:5173/).

## License

[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
