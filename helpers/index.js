const deepmerge = require('deepmerge');
// const validator = require('validator');
exports.mongooseError = error => {
  // modified from https://github.com/syntagma/mongoose-error-helper
  // MIT license
  const messages = {
    required: '%s is required.',
    min: '%s below minimum.',
    max: '%s above maximum.',
    enum: '%s not an allowed value.'
  };
  // console.log('error in mongooseError', error.name);
  const errors = [];
  if (error.name === 'CastError') return exports.castError(error);

  // We do not throw stuff into this helper method that is not a CastError.
  // Yes, we are that good :)
  // else if (error.name !== 'ValidationError') {
  //   // return current value if not a mongoose_error
  //   return error;
  // }

  // Loop over the errors object of the Validation Error
  Object.keys(error.errors).forEach(field => {
    const eObj = error.errors[field].properties;
    // console.log('eobj', eObj);
    // If we have a message on the schema.
    if (eObj && eObj.hasOwnProperty('message')) {
      // console.log(eObj);

      const message = eObj.message
        .replace('{PATH}', eObj.path)
        .replace('{VALUE}', eObj.value);

      errors.push(exports.betterError('invalid_field', field, message));

      // If we don't have a message for `type`, just push the error through
    } else {
      // console.log('sup ', field);
      errors.push(
        exports.betterError('invalid_field', field, `${field} is invalid`)
      );
    }

    // took out of the above if .. else statement
    // not needed 9-1-17 AW
    // else if (eObj && !messages.hasOwnProperty(eObj.kind)) {
    //   errors.push(exports.betterError('invalid_field', field, eObj.type));
    //
    //   //Otherwise, use util.format to format the message, and passing the path
    // }
  });

  if (errors.length > 1) {
    return deepmerge.all(errors);
  }
  return errors[0];
};

exports.castError = error => {
  const errors = {
    invalid_field: {}
  };
  errors.invalid_field[error.path] = error.message;
  // console.log('caterror', errors);
  return errors;
};

exports.betterError = (type, field, message = null) => {
  // if (type == 'invalid_field') {

  // this is only being used for invalid_fields
  // shortening code 9-1-17 AW
  return {
    [type]: {
      [field]: message
    }
  };
  // } else {
  //   return {
  //     [type]: [field]
  //   };
  // }
};

// exports.escapeStringsInArray = array => {
//   if (Array.isArray(array)) {
//     return array.map((curVal, index, array) => {
//       if (curVal && typeof curVal === 'string') {
//         return validator.escape(curVal);
//       } else if (
//         (curVal && typeof curVal === 'number') ||
//         typeof curVal === 'boolean'
//       ) {
//         return validator.escape(curVal.toString());
//       }
//     });
//   } else {
//     return false;
//   }
// };

exports.checkForMissingFields = (objectToCheck, requiredFields) => {
  const missingFieldsObj = {
    missingField: []
  };
  for (let i = 0; i < requiredFields.length; i++) {
    if (!objectToCheck[requiredFields[i]]) {
      missingFieldsObj.missingField.push(requiredFields[i]);
    }
  }

  return missingFieldsObj;
};
