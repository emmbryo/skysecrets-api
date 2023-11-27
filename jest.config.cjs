module.exports = {
  setupFiles: ['./.jest/setEnvVars.js'],
  transform: {
    '^.+\\.(ts|js|html)$': 'babel-jest'
  }
}
