import { Config } from "../models/config.model";
import * as  fs from 'fs';

export class ConfigService {
  // function to write config file to current directory using Config
  public async writeConfigFile(config: Config) {
    // write config to file
    const configFile = `${process.cwd()}/config.json`;
    await fs.writeFile(configFile, JSON.stringify(config), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }

  // function to read config file from current directory
  public async readConfigFile() {
    // read config from file
    const configFile = `${process.cwd()}/config.json`;
    const config = await fs.readFileSync(configFile, 'utf8');
    return JSON.parse(config);
  }
}