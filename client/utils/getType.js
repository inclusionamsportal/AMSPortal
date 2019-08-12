const getType = type => {
  let label;

  switch (type) {
    case 'textarea':
      label = 'Text Area';
      break;
    case 'text':
      label = 'Text Field';
      break;
    case 'checkbox':
      label = 'Check Box';
      break;
    case 'date':
      label = 'Date';
      break;
    default:
      break;
  }

  return label;
};

export default getType;
