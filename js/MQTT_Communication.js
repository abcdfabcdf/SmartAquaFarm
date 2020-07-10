var client = null;
var pump_is_on = 0;
var led_is_on = 4;
var hostname = "broker.mqtt-dashboard.com";	// MQTT Broker Server
var port = "8000";
var clientId = "mqtt_js_" + parseInt(Math.random() * 100000, 10);
var PUB_topic = "subsensor"; // Publish Topic
var SUB_topic = "Sensor2";	// Subscribe Topic

function connect() {
    // Set up the client
    client = new Paho.MQTT.Client(hostname, Number(port), clientId);
    console.info('Connecting to Server: Hostname: ', hostname,
        '. Port: ', port, '. Client ID: ', clientId);

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    var options = {
        onSuccess: onConnect, // after connected, subscribes
        onFailure: onFail // useful for logging / debugging
    };
    
    client.connect(options);
    console.info('Connecting...');
}


function onConnect(context) {
    console.log("Client Connected");
    options = {
        qos: 0,
        onSuccess: function(context) {
            console.log("subscribed");
        }
    }
    client.subscribe(SUB_topic, options);
}

function onFail(context) {
    console.log("Failed to connect");
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("Connection Lost: " + responseObject.errorMessage);
        window.alert("Someone else took my websocket!\nRefresh to take it back.");
    }
}

// 데이터 값 받는 부분
function onMessageArrived(message) {
    console.log(message.destinationName, message.payloadString);
    var data = JSON.parse(message.payloadString);

    var temperature_heading = document.getElementById("Temp_Display");
    temperature_heading.innerHTML = "Temperature : " + data.Temp + " &deg;C";

    var humidity_heading = document.getElementById("Humidity_Display");
    humidity_heading.innerHTML = "Humidity : " + data.Humi + "%";

    var soil_heading = document.getElementById("Soil_Display");
    soil_heading.innerHTML = "Soil Humidity : " + data.moisture + "%";

    var watertemp_heading = document.getElementById("Watertemp_Display");
    watertemp_heading.innerHTML = "Water Temperature : " + data.suon + " &deg;C";

    var dust_heading = document.getElementById("dust_Display");

        if(data.hontak == 0) {
            dust_heading.innerHTML = "Dust : Clean";
        }
        else {
            dust_heading.innerHTML = "Dust : Dirty";
        }
    }
// PUMP 원격제어
function pump_toggle() {
    if (pump_is_on == 1) {
        var payloadString = '0'; // pump off
        pump_is_on = 0;
    } else {
        var payloadString = '1'; // pump on
        pump_is_on = 1;
    }
    message = new Paho.MQTT.Message(payloadString);
    message.destinationName = PUB_topic;
    message.retained = false;
    client.send(message);
    console.info('sending: ', payloadString);
}
// LED 원격제어
function led_toggle() {
    if (led_is_on == 3) {
        var payloadString = '4'; // led off
        led_is_on = 4;
    } else {
        var payloadString = '3'; // led on
        led_is_on = 3;
    }
    message = new Paho.MQTT.Message(payloadString);
    message.destinationName = PUB_topic;
    message.retained = false;
    client.send(message);
    console.info('sending: ', payloadString);
}