import validator from 'validator';

function validateLinksData(data) {
  const errors = {};

  if (!validator.isURL(data.link) && !validator.isEmpty(data.link)) {
    errors.link = 'It is not a valid url.';
  }
  if (validator.isEmpty(data.link)) {
    errors.link = 'Can not be empty';
  }
  if (validator.isEmpty(data.tags)) {
    errors.tags = 'Can not be empty';
  }
  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    isValid,
  };
}

export default validateLinksData;
