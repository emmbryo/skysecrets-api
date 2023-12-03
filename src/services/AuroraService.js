/**
 * Module for the AuroraService.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

// import createError from 'http-errors'
import { JSDOM } from 'jsdom'

/**
 * Encapsulates an aurora service.
 */
export class AuroraService {
  /**
   * Gets the aurora parameters.
   *
   * @returns {object} auroraData
   */
  async getAuroraParams () {
    await this.getSolarWind()
    const auroraData = {
      solarWind: await this.getSolarWind(),
      magneticField: await this.getMagneticField(),
      Kp: await this.getPlanetaryKIndex()
    }
    return auroraData
  }

  /**
   * Gets the probability for aurora at current latidtude/longitude.
   *
   * @param {number} lat the geographic latitude.
   * @param {number} lng the geographic longitude.
   * @returns {object} the probability of aurora at lat/lng.
   */
  async getChanceForAurora (lat, lng) {
    const data = await this.retrieveAnalysisParameters(lat, lng)

    if (data.isSunUp || data.magneticField.zComponent > 0) {
      return false
    } else {
      return this.calculateChanceForAurora(data.magneticLat, data.kp)
    }
  }

  /**
   * Summairzes the current aurora status at gicen location.
   *
   * @param {number} lat the geographic latitude.
   * @param {number} lng the geographic longitude.
   * @returns {object} the probability of aurora at lat/lng.
   */
  async getAuroraAnalysis (lat, lng) {
    const data = await this.retrieveAnalysisParameters(lat, lng)
    const response = {
      chance: false,
      reasons: []
    }

    if (data.isSunUp) {
      response.reasons.push({ id: 'sun', text: 'The sun is up' })
    }

    if (data.kp.index < process.env.PLANETARY_INDEX_LOW_LIMIT) {
      response.reasons.push({ id: 'Kp', text: 'Not enough geomagnetic activity' })
    } else if (!this.calculateChanceForAurora(data.magneticLat, data.kp)) {
      response.reasons.push({ id: 'lat', text: 'Your latitude is not high enough' })
    }

    if (data.magneticField.zComponent > 0) {
      response.reasons.push({ id: 'pos', text: 'Positive polarity of the interplanetary magnetic field' })
    }

    if (!data.isSunUp && this.calculateChanceForAurora(data.magneticLat, data.kp)) {
      response.chance = true
    }
    return response
  }

  /**
   * Returns if there is a chance for aurora for given coordinates.
   *
   * @param {number} magneticLat - the magnetic latitude.
   * @param {number} kp - planetary index.
   * @returns {boolean} - chance/no chance
   */
  calculateChanceForAurora (magneticLat, kp) {
    const visibleLat = 66 - Number.parseFloat(kp.index) * 2
    if (kp.index > process.env.PLANETARY_INDEX_LOW_LIMIT && magneticLat.magnetic_latitude >= visibleLat) {
      return true
    } else {
      return false
    }
  }

  /**
   * Gets the current solar wind and its density from NOAA. (a value that is updated every minute).
   *
   * @returns {object} solarWind: speed and density.
   */
  async getSolarWind () {
    const url = process.env.URL_NOAA_SOLAR_WIND
    const response = await fetch(url)

    if (!response.ok) {
      throw Error('Something went wrong with the fetching of solar wind data')
    }

    const solarWinddata = await response.json()

    return {
      speed: solarWinddata[1][2],
      density: solarWinddata[1][1]
    }
  }

  /**
   * Gets the current power and z-component of the interplanetary magnetic field.
   *
   * @returns {object} magneticFieldData: power and z component.
   */
  async getMagneticField () {
    const url = process.env.URL_NOAA_MAGNETIC_FIELD
    const response = await fetch(url)

    if (!response.ok) {
      throw Error('Something went wrong with the fetching of magnetic field data')
    }

    const magneticData = await response.json()

    return {
      power: magneticData.Bt,
      zComponent: magneticData.Bz
    }
  }

  /**
   * Gets the current power and z-component of the interplanetary magnetic field.
   *
   * @returns {object} magneticFieldData: power and z component.
   */
  async getPlanetaryKIndex () {
    const url = process.env.URL_NOAA_PLANETARY_INDEX
    const response = await fetch(url)

    if (!response.ok) {
      throw Error('Something went wrong with the fetching of the planetary K index')
    }

    const planetaryIndex = await response.json()

    const kIndex = {
      index: 0,
      scale: null
    }
    planetaryIndex.forEach(index => {
      if (index[2] === 'observed') {
        kIndex.index = index[1]
        kIndex.scale = index[3]
      }
    })

    return kIndex
  }

  /**
   * Gets the geomagnetic latitude.
   *
   * @param {number} lat the geographic latitude.
   * @param {number} lng the geographic longitude.
   * @returns {object} the geomagnetic latitude/longitude.
   */
  async getMagneticLatitude (lat, lng) {
    const date = new Date()
    const decimalMonth = ((date.getMonth() + 1) / 12).toFixed(1)
    const decimalDate = Number.parseFloat(date.getFullYear()) + Number.parseFloat(decimalMonth)
    const url = `${process.env.URL_GEOMAG_CALCULATOR}&latitude=${lat}&longitude=${lng}&date=${decimalDate}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Something went wrong with fetching magnetic coordinates')
    }

    const text = await response.text()
    const dom = new JSDOM(text)
    const element = Array.from(dom.window.document.querySelectorAll('.sectionBody')).map(element => element.textContent)
    const lines = element[0].split('\n')
    let words = ''
    lines.forEach(line => {
      if (line.startsWith('Quasi')) {
        words = (line.split(',')[0].split('='))
      }
    })

    return {
      magnetic_latitude: Number.parseFloat(words[1].trim())
    }
  }

  /**
   * Returns true if sun over horizon.
   *
   * @param {number} lat - latitude
   * @param {number} lng - longitude
   * @returns {boolean} true if sun os over horizon.
   */
  async isSunOverHorizon (lat, lng) {
    const url = `${process.env.URL_VISIBLEPLANETS_API}?latitude=${lat}&longitude=${lng}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Something went wrong with the fetch.')
    }

    const isOverHorizon = await response.json()

    let isSunOverHorizon = false
    isOverHorizon.data.forEach(element => {
      if (element.name === 'Sun') {
        isSunOverHorizon = true
      }
    })
    return isSunOverHorizon
  }

  /**
   * Returns params needed for calculating chances for aurora.
   *
   * @param {number} lat - latitude.
   * @param {number} lng - longitude
   * @returns {object} with parameters.
   */
  async retrieveAnalysisParameters (lat, lng) {
    return {
      magneticLat: await this.getMagneticLatitude(lat, lng),
      kp: await this.getPlanetaryKIndex(),
      isSunUp: await this.isSunOverHorizon(lat, lng),
      magneticField: await this.getMagneticField()
    }
  }
}
