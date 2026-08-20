export function requestLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        code: "UNAVAILABLE",
        message:
          "Location services are not available in this browser.",
      });

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject({
              code: "DENIED",
              message:
                "Location permission was denied.",
            });
            break;

          case error.POSITION_UNAVAILABLE:
            reject({
              code: "UNAVAILABLE",
              message:
                "Your location is currently unavailable.",
            });
            break;

          case error.TIMEOUT:
            reject({
              code: "TIMEOUT",
              message:
                "The location request timed out.",
            });
            break;

          default:
            reject({
              code: "UNKNOWN",
              message:
                "Unable to retrieve your location.",
            });
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  });
}