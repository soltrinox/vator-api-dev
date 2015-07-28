module.exports = function(AuthProvider) {
  AuthProvider.validatesUniquenessOf('name', {message: 'name is not unique'});
};
