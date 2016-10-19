console.log('ServiceWorker is loaded');

// this나 self 모두 ServiceWorkerGlobalScope를 가리킨다.

self.addEventListener('install', function (e) {
    console.log('install', e);

    // The skipWaiting() method allows 
    // this service worker to progress 
    // from the registration's waiting position to active 
    // even while service worker clients are using the registration.
    // self.skipWaiting();
});

self.addEventListener('activate', function (e) {
    console.log('activate', e);
});

self.addEventListener('fetch', function (e) {
    console.log('fetch', e);
});

self.addEventListener('message', function (e) {
    console.log('message', e);
});

self.addEventListener('push', function (e) {
    console.log('received push message', e);

    event.waitUntil(
        self.registration.showNotification('title', {
            body: 'body body body body ...',
            tag: 'simple-push-demo-notification-tag'
        })
    );
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === '/' && 'focus' in client) {
        return client.focus();
      }
    }
    if (clients.openWindow) {
      return clients.openWindow('/');
    }
  }));
});