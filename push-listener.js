self.addEventListener('push', function (event) {
  if (event.data) {
    const payload = event.data.json()
    const position = Number(payload.position)
    const body = position > 0
      ? `You're ${position} places away from being served.`
      : "It's now your turn! Please be ready to be served."
    const notifyUser = self.registration.showNotification(payload.queueName, { body })
    event.waitUntil(notifyUser)
  } else {
    console.log('This push event has no data.')
  }
})
