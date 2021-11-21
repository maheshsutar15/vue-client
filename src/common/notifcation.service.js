
export function checkSensors(sensors, faulties) {
  return new Promise((res, rej) => {
    if( !sensors || sensors.length == 0 ) rej();
    let faulty = []
    for(let sensor of sensors) {
      let co2Range = sensor.co2Range
      let humidityRange = sensor.humidityRange
      let temperatureRange = sensor.temperatureRange
      let pressureRange  = sensor.pressureRange 
      let reading = sensor.reading ?? 0

      if(reading == 0) faulty.push(sensor.uid)
      if(
        reading.co2 < co2Range.min || reading.co2 > co2Range.max
        ||
        reading.pressure < pressureRange.min || reading.pressure > pressureRange.max
        ||
        reading.temperature < temperatureRange.min || reading.temperature > temperatureRange.max
        ||
        reading.humidity < humidityRange.min || reading.humidity > humidityRange.max
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
  navigator.serviceWorker.register('sw.js')
  Notification.requestPermission((r) => {
    if( r === 'granted' ) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.showNotification("There are few faulty sensors", {
          body: sensorsList
        })
      })
    }
  })
}


