/**
 * A small controller to explain the syntax we will be using
 * @return {function} A controller that contains 2 test elements
 */
'use strict';
const ERRORS_MAP = {
  'Error.Passport.Password.Wrong': 'incorrect username/password combination',
  'Error.Passport.Username.NotFound': 'incorrect username/password combination',
  'Error.Passport.Email.Missing': 'invalid email address',
  'Error.Passport.Password.Missing': 'missing password',
  'Error.Passport.Password.Invalid': 'invalid password (must be at least 8 characters long)',
  'Error.Passport.Bad.Username': 'invalid username (must be 1-20 alphanumeric characters)',
  'Error.Passport.Username.Taken': 'a user with that name already exists'
};
module.exports = class Login {
  constructor ($scope, $http) {
    this.$scope = $scope;
    this.$http = $http;
  }
  register () {
    return this.$http({
      method: 'POST',
      url: '/api/v1/auth/local/register',
      data: {
        name: this.$scope.registerName,
        password: this.$scope.registerPassword,
        email: this.$scope.registerEmail
      }
    }).then(() => {
      window.location = '/';
    }).catch(res => {
      if (res.status === 401 && ERRORS_MAP[res.data]) {
        this.registerError = ERRORS_MAP[res.data];
      } else {
        this.registerError = 'An unknown error occured.';
      }
    });
  }
  login () {
    return this.$http({
      method: 'POST',
      url: '/api/v1/auth/local',
      data: {
        name: this.$scope.loginName,
        password: this.$scope.loginPassword
      }
    }).then(() => {
      window.location = '/';
    }).catch(res => {
      if (res.status === 401 && ERRORS_MAP[res.data]) {
        this.loginError = ERRORS_MAP[res.data];
      } else {
        this.loginError = 'An unknown error occured.';
      }
    });
  }
};
