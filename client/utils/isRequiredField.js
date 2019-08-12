function checkRequiredInputFeilds(field) {
  const requiredInputs = ['name', 'email', 'body'];

  for (let i = 0; i < requiredInputs.length; i++) {
    if (field === requiredInputs[i]) return true;
  }

  return false;
}

export default checkRequiredInputFeilds;
