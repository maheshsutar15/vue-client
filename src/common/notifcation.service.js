
export function checkSensors(sensors, faulties) {
  return new Promise((res, rej) => {
  if( !sensors || sensors.length == 0 ) rej();
  let faulty = []
  for(let sensor of sensors) {
    let co2Range = sensor.co2Range
    let humidityRange = sensor.humidityRange
    let temperatureRange = sensor.temperatureRange
    let pressureRange  = sensor.pressureRange 
    let readings = sensor.readings ?? 0

    if(readings == 0) faulty.push(sensor.uid)
    if(
      readings.co2 < co2Range.min || readings.co2 > co2Range.max
      ||
      readings.pressure < pressureRange.min || readings.pressure > pressureRange.max
      ||
      readings.temperature < temperatureRange.min || readings.temperature > temperatureRange.max
      ||
      readings.humidity < humidityRange.min || readings.humidity > humidityRange.max
    ) {
      if(!faulties.includes(sensor.uid)) {
        faulty.push(sensor.uid)
      }
    }
  }
    if(faulty.length == 0) rej()
    res(faulty)
  })
}

export function sendNotification(sensors) {
  let sensorsList = "Faulty sensors are : "
  for(let sensor of sensors) {
    sensorsList += `${sensor} `
  }
  console.log(sensors)

  new Notification("There are few faulty sensors that require attention", {
    body: sensorsList
  })

}


