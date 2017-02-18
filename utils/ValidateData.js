function validateData(data) {
  const errors = {};
  const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  if (!urlPattern.test(data.link) && data.link !== '') errors.link = 'It is not a valid url.';
  if (data.link === '') errors.link = 'Can not be empty';
  if (data.tags === '') errors.tags = 'Can not be empty';
  const isValid = Object.keys(errors).length === 0;
  return { errors, isValid };
}

export default validateData;
