
function openOrFocusPage (targetURL) {
  const showPage = self.clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true
    })
    .then((windowClients) => {
      const urlToOpen = new URL(targetURL, self.location.href).href
      const matchingClient = windowClients.find(windowClient => windowClient.url === urlToOpen)
      return matchingClient ? matchingClient.focus() : self.clients.openWindow(urlToOpen)
    })
  return showPage
}

self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json()
    const position = Number(data.position)
    const body = position > 0
      ? `You're ${position} places away from being served.`
      : "It's now your turn! Please be ready to be served."
    event.waitUntil(self.registration.showNotification(data.queueName, { body, data }))
  } else {
    console.log('This push event has no data.')
  }
})

self.addEventListener('notificationclick', function (event) {
  if (event.notification.data) {
    const {data} = event.notification
    const targetURL = `./#/queue/${data.keys.queue}`
    event.waitUntil(openOrFocusPage(targetURL))
  } else {
    console.log('This push event has no data.')
  }
})
