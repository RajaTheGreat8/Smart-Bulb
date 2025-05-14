// // // -- mode: js; js-indent-level:2;  --
// // // SPDX-License-Identifier: MPL-2.0
// // const {
// //   Property,
// //   SingleThing,
// //   Thing,
// //   Value,
// //   WebThingServer,
// // } = require("webthing");

// // const TPLSmartDevice = require("tplink-lightbulb");
// // const { v4: uuidv4 } = require("uuid");

// // const BULB_IP = "IP-ADDRESS-OF-YOUR-BULB"; // Replace with the actual IP of your bulb
// // const light = new TPLSmartDevice(BULB_IP);

// // function makeThing() {
// //   const thing = new Thing(
// //     "urn:dev:ops:my-lamp-1234",
// //     "My Smart Lamp",
// //     ["OnOffSwitch", "Light"],
// //     "A web connected lamp"
// //   );

// //   // ON/OFF Property
// //   const powerValue = new Value(
// //     false,
// //     (v) => {
// //       console.log("Bulb state is now", v);
// //       light.power(v);
// //     }
// //   );

// //   thing.addProperty(
// //     new Property(
// //       thing,
// //       "on",
// //       powerValue,
// //       {
// //         "@type": "OnOffProperty",
// //         title: "On/Off",
// //         type: "boolean",
// //         description: "Whether the lamp is turned on",
// //       }
// //     )
// //   );

// //   // Brightness Property
// //   const brightnessValue = new Value(
// //     20, // Default brightness is 50%
// //     (v) => {
// //       console.log("Received brightness update:", v);
// //       light.send({
// //         "smartlife.iot.smartbulb.lightingservice": {
// //           transition_light_state: {
// //             on_off: 1, // Ensure the bulb is on
// //             brightness: v,
// //           },
// //         },
// //       });
// //       console.log("Brightness is now", v);
// //     }
// //   );

// //   thing.addProperty(
// //     new Property(
// //       thing,
// //       "brightness",
// //       brightnessValue,
// //       {
// //         "@type": "BrightnessProperty",
// //         title: "Brightness",
// //         type: "integer",
// //         description: "The level of light from 0-100",
// //         minimum: 0,
// //         maximum: 100,
// //         unit: "percent",
// //       }
// //     )
// //   );

// //   return thing;
// // }

// // function runServer() {
// //   const thing = makeThing();
// //   const server = new WebThingServer(new SingleThing(thing), 8888);

// //   process.on("SIGINT", () => {
// //     server
// //       .stop()
// //       .then(() => process.exit())
// //       .catch(() => process.exit());
// //   });

// //   server.start().catch(console.error);
// // }

// // runServer();












// const { Property, SingleThing, Thing, Value, WebThingServer } = require("webthing");
// const { loginDeviceByIp, setDeviceInfo } = require("tp-link-tapo-connect");

// // Replace with your actual Tapo account credentials and bulb IP
// const TAPO_USERNAME = "ravi.raviteja039@gmail.com";
// const TAPO_PASSWORD = "Honey@024";
// const TAPO_IP = "192.168.0.10"; // Your bulb's local IP address

// let tapoDevice;

// async function initializeTapo() {
//   try {
//     console.log("Attempting Tapo authentication...");

//     // Correct usage of loginDeviceByIp according to your api.d.ts
//     tapoDevice = await loginDeviceByIp(TAPO_USERNAME, TAPO_PASSWORD, TAPO_IP);

//     console.log("Login success! Device ready.");
//   } catch (error) {
//     console.error("Tapo Authentication Failed:", error.message);
//     console.error(error.stack);
//   }
// }

// // async function setPowerState(state) {
// //   if (!tapoDevice) await initializeTapo();
// //   try {
// //     await setDeviceInfo(tapoDevice, { device_on: state });
// //     console.log("Bulb power set to:", state);
// //   } catch (error) {
// //     console.error("Failed to set power state:", error);
// //   }
// // }

// // async function setBrightness(level) {
// //   if (!tapoDevice) await initializeTapo();
// //   try {
// //     await setDeviceInfo(tapoDevice, { brightness: level });
// //     console.log("Brightness set to:", level);
// //   } catch (error) {
// //     console.error("Failed to set brightness:", error);
// //   }
// // }

// // Set bulb ON/OFF
// // Fix: Turn ON/OFF the bulb
// async function setPowerState(value) {
//   try {
//     if (value) {
//       await tapoDevice.turnOn();
//     } else {
//       await tapoDevice.turnOff();
//     }
//     console.log(`Bulb turned ${value ? "ON" : "OFF"}`);
//   } catch (error) {
//     console.error("Failed to set power state:", error);
//   }
// }

// // Fix: Adjust brightness level
// async function setBrightness(value) {
//   try {
//     await tapoDevice.setBrightness(value);
//     console.log(`Brightness set to ${value}%`);
//   } catch (error) {
//     console.error("Failed to set brightness:", error);
//   }
// }



// function makeThing() {
//   const thing = new Thing(
//     "urn:dev:ops:my-lamp-1234",
//     "My Smart Lamp",
//     ["OnOffSwitch", "Light"],
//     "A web connected lamp"
//   );

//   const powerValue = new Value(false, (v) => setPowerState(v));
// thing.addProperty(
//   new Property(thing, "on", powerValue, {
//     "@type": "OnOffProperty",
//     title: "On/Off",
//     type: "boolean",
//     description: "Whether the lamp is turned on",
//   })
// );

// const brightnessValue = new Value(50, (v) => setBrightness(v));
// thing.addProperty(
//   new Property(thing, "brightness", brightnessValue, {
//     "@type": "BrightnessProperty",
//     title: "Brightness",
//     type: "integer",
//     description: "Brightness level from 0-100",
//     minimum: 0,
//     maximum: 100,
//     unit: "percent",
//   })
// );

//   return thing;
// }

// async function runServer() {
//   await initializeTapo();
//   const thing = makeThing();
//   const server = new WebThingServer(new SingleThing(thing), 8080);

//   process.on("SIGINT", () => {
//     server.stop().then(() => process.exit()).catch(() => process.exit());
//   });

//   server.start().catch(console.error);
// }

// runServer();





















const { Property, SingleThing, Thing, Value, WebThingServer } = require("webthing");
const { loginDeviceByIp, setDeviceInfo } = require("tp-link-tapo-connect");

// Replace with your actual Tapo account credentials and bulb IP
const TAPO_USERNAME = "ravi.raviteja039@gmail.com";
const TAPO_PASSWORD = "Honey@024";
const TAPO_IP = "192.168.0.13"; // Your bulb's local IP address

let tapoDevice;

async function initializeTapo() {
  try {
    console.log("Attempting Tapo authentication...");
    tapoDevice = await loginDeviceByIp(TAPO_USERNAME, TAPO_PASSWORD, TAPO_IP);
    console.log("Login success! Device ready.");
  } catch (error) {
    console.error("Tapo Authentication Failed:", error.message);
    console.error(error.stack);
  }
}

async function setPowerState(value) {
  try {
    value ? await tapoDevice.turnOn() : await tapoDevice.turnOff();
    console.log(`Bulb turned ${value ? "ON" : "OFF"}`);
  } catch (error) {
    console.error("Failed to set power state:", error);
  }
}

async function setBrightness(value) {
  try {
    await tapoDevice.setBrightness(value);
    console.log(`Brightness set to ${value}%`);
  } catch (error) {
    console.error("Failed to set brightness:", error);
  }
}



async function setColorHue(hue) {
  try {
    // Convert hue to RGB
    const rgb = hsvToRgb(hue / 360, 1, 1); // Convert hue to RGB
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b); // Convert RGB to Hex

    await tapoDevice.setColour(hex); // Set color in Hex format
    console.log(`Color set to Hex: ${hex}`);
  } catch (error) {
    console.error("Failed to set color hue:", error);
  }
}

// Convert RGB to Hex format
function rgbToHex(r, g, b) {
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
}

// Convert HSV to RGB
function hsvToRgb(h, s, v) {
  let r, g, b;
  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  i %= 6;
  if (i === 0) [r, g, b] = [v, t, p];
  else if (i === 1) [r, g, b] = [q, v, p];
  else if (i === 2) [r, g, b] = [p, v, t];
  else if (i === 3) [r, g, b] = [p, q, v];
  else if (i === 4) [r, g, b] = [t, p, v];
  else [r, g, b] = [v, p, q];

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}





function makeThing() {
  const thing = new Thing(
    "urn:dev:ops:my-lamp-1234",
    "My Smart Lamp",
    ["OnOffSwitch", "Light"],
    "A web connected lamp"
  );

  const powerValue = new Value(false, (v) => setPowerState(v));
  thing.addProperty(
    new Property(thing, "on", powerValue, {
      "@type": "OnOffProperty",
      title: "On/Off",
      type: "boolean",
      description: "Whether the lamp is turned on",
    })
  );

  const brightnessValue = new Value(50, (v) => setBrightness(v));
  thing.addProperty(
    new Property(thing, "brightness", brightnessValue, {
      "@type": "BrightnessProperty",
      title: "Brightness",
      type: "integer",
      description: "Brightness level from 0-100",
      minimum: 0,
      maximum: 100,
      unit: "percent",
    })
  );

  const colorHueValue = new Value(0, (v) => setColorHue(v));
  thing.addProperty(
    new Property(thing, "colorHue", colorHueValue, {
      title: "Color Hue",
      type: "integer",
      description: "Hue of the light (0-360)",
      minimum: 0,
      maximum: 360,
    })
  );

  return thing;
}

async function runServer() {
  await initializeTapo();
  const thing = makeThing();
  const server = new WebThingServer(new SingleThing(thing), 8080);

  process.on("SIGINT", () => {
    server.stop().then(() => process.exit()).catch(() => process.exit());
  });

  server.start().catch(console.error);
}

runServer();
