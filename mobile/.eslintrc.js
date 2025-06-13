module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:detox/recommended'],
  env: {
    'detox/detox': true, 
  },
  plugins: ['detox']
};

