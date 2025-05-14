const { loginDevice } = require("tp-link-tapo-connect");

const TAPO_USERNAME = "ravi.raviteja039@gmail.com";
const TAPO_PASSWORD = "Honey@024";
const TAPO_IP = "192.168.0.13";

async function testLogin() {
  try {
    console.log("Trying login to Tapo...");
    const tapoDevice = await loginDevice({
      email: TAPO_USERNAME,
      password: TAPO_PASSWORD,
      ip: TAPO_IP,
    });

    console.log("Login successful, tapoDevice:");
    console.log(JSON.stringify(tapoDevice, null, 2));
  } catch (err) {
    console.error("Login failed:", err);
  }
}

testLogin();
