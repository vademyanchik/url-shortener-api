import validator from 'validator';
import mongoose from 'mongoose';
import '../../models/User';

const User = mongoose.model('User');

function validateInput(data) {
  const errors = {};

  if (validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'This field is required';
  }
  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }
  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    isValid,
  };
}

function validateUsersData(data) {
  const { errors } = validateInput(data);

  return User.find({
    $or: [
      { username: data.username },
      { email: data.email },
    ],
  })
    .then((user) => {
      if (user.length) {
        if (user[0].username === data.username) {
          errors.username = 'Sorry, username has been taken';
        }
        if (user[0].email === data.email) {
          errors.email = 'Email is already registered';
        }
      }
      const isValid = Object.keys(errors).length === 0;
      return {
        errors,
        isValid,
      };
    });
}

export default validateUsersData;
