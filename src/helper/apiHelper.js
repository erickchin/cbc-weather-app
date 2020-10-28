const axios = require("axios")

module.exports = {
  getWeatherByCity: async function (city) {
    let graphqlQuery = `
  query {
      getCityByName(name: ${JSON.stringify(city)}, config: {units: metric}) {
        id
        name
        country
        coord {
          lon
          lat
        }
        weather {
          summary {
            title
            description
            icon
          }
          temperature {
            actual
            feelsLike
            min
            max
          }
          wind {
            speed
            deg
          }
          clouds {
            all
            visibility
            humidity
          }
          timestamp
        }
      }
    }
  `

    return axios({
      url: 'http://localhost:4000',
      method: 'post',
      data: {
        query: graphqlQuery
      },
    })
  },

  getCity: async function (lat, long) {
    return axios({
      url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_GOOGLE_API}`,
      method: 'get'
    })
  }
};


