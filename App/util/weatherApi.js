const apiKey = "7b8b74a104f3e8d201211b2899464678";

export const weatherApi = (path, { zipcode, coords }) => {
  let suffix = "";

  if (zipcode) {
    suffix = `zip=${zipcode}`;
  } else if (coords) {
    suffix = `lat=${coords.latitude}&lon=${coords.longitude}`;
  }

  return fetch(
    `https://api.openweathermap.org/data/2.5${path}?appid=${apiKey}&units=imperial&${suffix}`
  ).then(response => response.json());
};
