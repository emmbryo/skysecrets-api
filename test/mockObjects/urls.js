const process = {
  env: {
    URL_NOAA_SOLAR_WIND: 'https://services.swpc.noaa.gov/products/solar-wind/plasma-5-minute.json',
    URL_NOAA_MAGNETIC_FIELD: 'https://services.swpc.noaa.gov/products/summary/solar-wind-mag-field.json',
    URL_NOAA_PLANETARY_INDEX: 'https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json',
    URL_GEOMAG_CALCULATOR: 'https://geomag.bgs.ac.uk/cgi-bin/coord_calc?name=not+given',
    URL_VISIBLEPLANETS_API: 'https://api.visibleplanets.dev/v3',
    URL_IMAGE_OF_DAY: 'https://api.nasa.gov/planetary/apod',
    URL_FARMSENSE_MOON_PHASE: 'http://api.farmsense.net/v1/moonphases/',
    URL_IPGEOLOCATION_ASTRONOMY: 'https://api.ipgeolocation.io/astronomy'
  }
}

export { process }
