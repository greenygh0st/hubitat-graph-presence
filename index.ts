import axios from 'axios';
import * as  fs from 'fs';
import { Config } from './models/config.model';
import { PresenceStatus } from './models/presence.model';
import { ConfigService } from './services/config.service';
import { HubitatService } from './services/hubitat.service';


class GraphPresencenceDaemon {
  readonly configService = new ConfigService();
  readonly hubitatService = new HubitatService();
  constructor() {
    this.start();
  }

  readonly redStatuses = [ 'InACall', 'InAConferenceCall', 'InAMeeting', 'Presenting']

  public async start() {
    while (true) {
      const presence = await this.getPresenceStatus();

      if (this.redStatuses.includes(presence.activity)) {
        this.hubitatService.setHubitatDevice(presence, 'on');
      } else {
        this.hubitatService.setHubitatDevice(presence, 'off');
      }

      // delay
      await this.sleep(2500);
    }
  }

  // sleep function
  public sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async getPresenceStatus() {
    // get the config
    const config = await this.configService.readConfigFile();

    // TODO: Handle the token refresh

    // use Axios and make a get request to https://graph.microsoft.com/v1.0/me/presence
    // use the access token from the config file
    const results = await axios.get('https://graph.microsoft.com/v1.0/me/presence', {
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
      },
    });

    if (results.status === 200) {
      return JSON.parse(results.data) as PresenceStatus;
    } else {
      return { activity: 'PresenceUnknown', availability: 'PresenceUnknown' } as PresenceStatus;
    }    
  }  
}

new GraphPresencenceDaemon();