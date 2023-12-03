/* eslint-disable jsdoc/require-jsdoc */
// mock req/res objects
const req = {
  body: {
    location: {
      lat: 0,
      lng: 0
    },
    image: {
      url: 'url',
      title: 'title',
      id: 0,
      description: 'description'
    },
    images: [{}, {}, {}]
  },
  settings: {
    location: 'test-location-initial'
  },
  user: {
    id: 0
  },
  account: {
    images: [],
    ownerId: 0,
    id: 0
  }
}
// mock res object, with function to set status, in order to test for the code of the response.
const res = {
  code: 500,
  status: (newCode) => {
    res.code = newCode
  },
  error: ''
}
// mock function for next - handling errors
function next (error = {}) {
  error.test = 'error function called'
}

export { req, res, next }
