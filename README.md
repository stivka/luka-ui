# Getting Started with Create React MainApp

This project was bootstrapped with [Create React MainApp](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React MainApp documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web MainApp

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### How to `npm run compile-doom` on windows

#### Enable and install WLS ####
This requires Windows Linux Subsystem installed and enabled 
1. Make sure virtualisation is enabled in BIOS cpu configuration settings
2. Enable virtualisation in Windows `wsl.exe --install --no-distribution`
3. Install Ubuntu `wsl.exe --install Ubuntu`
4. Update WSL to latest version `wsl --update`
5. Now open Ubuntu from Windows search  

#### Fix WLS permissions ####
WLS does not have required permissions for files mounted outside of it (in Windows) by default.  
We need to fix it by configuring WLS to not check permissions:    

Edit WSL conf:  
`sudo nano /etc/wsl.conf`  
Add following to configuration:  
```
[automount]
options = "metadata,umask=22,fmask=11,noacl"
```
Restart WSL from Windows Terminal:  
`wsl --shutdown`  
Open Ubuntu WLS again and return back to project folder:  
`cd /mnt/c/Users/<PATH_TO_PROJECT>/luka-ui` 

#### Install all dependencies ####
Once you are running Ubuntu Bash, install all dependencies
1. `sudo apt update` // Update packages
2. `sudo apt install build-essential autoconf automake libtool dos2unix` // Install needed packages
3. `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"` // Get Brew
4. `eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"` // Install Brew
5. `source ~/.bashrc` // Reload Bash
6. `brew install emscripten` // Install emscripten
7. `brew install autoconf automake libtool` // Install some additional tooling 

#### Fix some line endings and compile Doom ####
1. `dos2unix build-doom.sh` // Fix file endings for Bash script
2. `cd src/packages/sdldoom-1.10` // Go to Doom port
3. `dos2unix configure configure.in Makefile.in` // Fix additional file endings
4. `autoreconf -fi` // Regenerate the configure script and related file
5. `export CC=emcc CXX=em++ AR=emar RANLIB=emranli` // Export some env vars
6. `npm run compile-doom` // Compile Doom now

> Probably not required, buy when emmake throws error, then this might help before autoreconf: `CONFIG_FILES=Makefile ./configure`  
> Also when previous step didn't fix emmake, then run `make clean` to cleanup broken build files