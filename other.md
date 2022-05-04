# other Info

## Example of Hubitat Device

```
{
  "name": "Generic Zigbee Motion Sensor",
  "label": "Living Room Motion Sensor",
  "type": "Generic Zigbee Motion Sensor",
  "id": "1",
  "date": "2022-05-03T23:53:09+0000",
  "model": null,
  "manufacturer": null,
  "capabilities": [
      "MotionSensor",
      "Configuration",
      "Refresh",
      "Battery",
      "TemperatureMeasurement",
      "Sensor"
  ],
  "attributes": {
      "battery": "87",
      "dataType": "NUMBER",
      "values": null,
      "motion": "inactive",
      "temperature": "68.99"
  },
  "commands": [
      {
          "command": "configure"
      },
      {
          "command": "refresh"
      }
  ]
},
```

Hubitat devices URI
```
http://<ip>/apps/api/7/devices/all?access_token=<access token>
```

Hubitat Command URI
```
http://<ip>/apps/api/7/devices/[Device ID]/[Command]/[Secondary value]?access_token=<access token>
```