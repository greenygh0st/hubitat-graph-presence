# Microsoft Graph Hubitat Device Updater

**WORK IN PROGRESS**

### Setup
1. Clone to a local directory
2. `npm i -g ts-node`
3. `npm i`

### Running
1. Setup an AD app registration. You may need approval from your IT department. When requesting or setting up an application you **only** need the `Presence.Read` permission. For security's sake do not request or setup any other scopes for the registration - the daemon will only request `Presence.Read`. Ensure that the application is setup with a "localhost" callback URI. You will provide the client id and client secret when you run the setup script.
2. Enable the Maker API in Hubitat and determine the **Name** of the device you want to use. The device name will be used to select the device. You will provide the device name and API key when you run the setup script.
3. First run the setup script: `ts-node ./setup.ts`. This will guide you through the setup and authentication process and take in the information from step #1 and step #2.
4. Run the daemon: `ts-node ./index.ts`

Turn a light or switch on or off using your presence in the Microsoft Graph API.

Please note to use this script/daemon you will need to work with your IT department to get the necessary permissions and Azure AD registration.

To actually fully daemonize this you should extend and work with this within your operating system's native scheduler.
