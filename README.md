# OneStop4All
The OneStop4All is the primary visual and user-friendly [NFDI4Earth](https://www.nfdi4earth.de/) access point. It offers a coherent view on and points to all relevant Earth System Sciences (ESS) RDM resources provided by NFDI4Earth members and the ESS community, such as data repositories, software tools, information on Research Data Management (RDM), education and training materials. Learn more about our [Mission](https://nfdi4earth.de/about-us) and the [Resources](https://nfdi4earth.de/2facilitate/onestop4all).

## Quick start

Ensure that you have [Node](https://nodejs.org/en/) (Version 16 or later) and [pnpm](https://pnpm.io/) (Version 8.x) installed.

Then execute the following commands to get started:

Step 1: Install backend. First, you need to create a [personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#clone-repository-using-personal-access-token). Then, you can clone the repository using the following command.  
```bash
$ git clone https://<username>@git.rwth-aachen.de/nfdi4earth/onestop4all/onestop4all-harvester.git
```
The stable branch is `main` and current developments can be seen in `feature/new_harvesters`. Updates in the main branch require the following steps:

1_1 `docker volume ls` to find the exact name of the volume.

1_2 `docker volume rm <onestop4all-harvester_devcontainer_data>` to remove the volume. If the volume is in use by a container, run `docker stop <CONTAINER ID>` and `docker rm <CONTAINER ID>`. Then, again `docker volume rm <onestop4all-harvester_devcontainer_data>`.

1_3 `git pull`

Then, start Docker Desktop (In case you're using Windows) and open the folder "onestop4all-harvester" in Visual Studio Code, press F1 and "Rebuild and reopen in Container".
Next, open the file "harvest.py", press F5 and "Debug the currently active Python file". These steps will build the indices based on the data from the Knowledge Hub. Currently, building indicses takes around 10 seconds.

Step 2: Install web app. Finally, you need to switch to the branch "develop", which should be more or less stable. 
```bash
$ git clone https://git.rwth-aachen.de/nfdi4earth/onestop4all/onestop4all-implementation.git
$ cd onestop4all-implementation
$ git checkout develop
$ pnpm install
```
If you are using Windows, you will now need to change line 35 in the file `.eslintrc` from `"linebreak-style": ["error", "unix"]` to `"linebreak-style": ["error", "windows"]`
```bash
$ pnpm run dev
```

The app should now be available under [http://localhost:5173/](http://localhost:5173/).

### With docker (currently under development)

```bash
docker build -t "onestop4all-ui:latest" .
docker run --rm -p 80:80 onestop4all-ui:latest
```
## License

[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
