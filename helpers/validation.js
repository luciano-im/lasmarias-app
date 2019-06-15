import validate from 'validate.js';

export const loginValidator = {
  email: {
    presence: {
      message: 'Ingrese una dirección de email'
    },
    email: {
      message: 'Ingrese una dirección de email válida'
    }
  },
  password: {
    presence: {
      message: 'Ingrese una contraseña'
    },
    length: {
      minimum: 8,
      message: 'Debe contener al menos 8 caracteres'
    },
    format: {
      pattern: '[a-z0-9!@#$%^&]+',
      flags: 'i',
      message: 'Solo letras, numeros y simbolos (!@#$%^&)'
    }
  }
};

export const registerValidator = {
  email: {
    presence: {
      message: 'Ingrese una dirección de email'
    },
    email: {
      message: 'Ingrese una dirección de email válida'
    }
  },
  password: {
    presence: {
      message: 'Ingrese una contraseña'
    },
    length: {
      minimum: 8,
      message: 'Debe contener al menos 8 caracteres'
    },
    format: {
      pattern: '[a-z0-9!@#$%^&]+',
      flags: 'i',
      message: 'Solo letras, numeros y simbolos (!@#$%^&)'
    }
  },
  name: {
    presence: {
      message: 'Este campo es obligatorio'
    },
    length: {
      maximum: 120,
      message: 'No puede superar los 120 caracteres'
    },
    format: {
      pattern: '[a-z]+',
      flags: 'i',
      message: 'Debe contener solo letras'
    }
  },
  lastName: {
    presence: {
      message: 'Este campo es obligatorio'
    },
    length: {
      maximum: 120,
      message: 'No puede superar los 120 caracteres'
    },
    format: {
      pattern: '[a-z]+',
      flags: 'i',
      message: 'Debe contener solo letras'
    }
  },
  customerName: {
    presence: {
      message: 'Este campo es obligatorio'
    },
    length: {
      maximum: 150,
      message: 'No puede superar los 150 caracteres'
    },
    format: {
      pattern: '[a-z0-9!@#$%^&]+',
      flags: 'i',
      message: 'Solo letras, numeros y simbolos (!@#$%^&)'
    }
  },
  customerAddress: {
    presence: {
      message: 'Este campo es obligatorio'
    },
    length: {
      maximum: 150,
      message: 'No puede superar los 150 caracteres'
    },
    format: {
      pattern: '[a-z0-9!@#$%^&]+',
      flags: 'i',
      message: 'Solo letras, numeros y simbolos (!@#$%^&)'
    }
  },
  telephone: {
    length: {
      maximum: 15,
      message: 'No puede superar los 15 caracteres'
    },
    format: {
      pattern: '[0-9]+',
      flags: 'i',
      message: 'Puede contener solo numeros'
    }
  },
  celPhone: {
    presence: {
      message: 'Este campo es obligatorio'
    },
    length: {
      maximum: 15,
      message: 'No puede superar los 15 caracteres'
    },
    format: {
      pattern: '[0-9]+',
      message: 'Puede contener solo numeros'
    }
  },
  city: {
    presence: {
      message: 'Este campo es obligatorio'
    },
    length: {
      maximum: 80,
      message: 'No puede superar los 80 caracteres'
    },
    format: {
      pattern: '[a-z0-9]+',
      flags: 'i',
      message: 'Puede contener solo letras y numeros'
    }
  },
  zipCode: {
    presence: {
      message: 'Este campo es obligatorio'
    },
    length: {
      maximum: 15,
      message: 'No puede superar los 15 caracteres'
    },
    format: {
      pattern: '[a-z0-9]+',
      flags: 'i',
      message: 'Puede contener solo letras y numeros'
    }
  },
  cuit: {
    presence: {
      message: 'Este campo es obligatorio'
    },
    length: {
      maximum: 11,
      message: 'No puede superar los 11 caracteres'
    },
    format: {
      pattern: '[0-9]+',
      message: 'Puede contener solo numeros'
    }
  }
};

export let validation = (field, value, constraints) => {
  // Create object
  // e.g. {email: 'email@example.com'}
  var formField = {};
  formField[field] = value;

  // Creates an temporary constraint with the validation fields
  // e.g.
  //     email: {
  //       presence: {
  //         message: 'Email is blank'
  //       }
  //     }
  var formConstraint = {};
  formConstraint[field] = constraints[field];

  const result = validate(formField, formConstraint, { fullMessages: false });

  if (result) {
    // Return only the field error message if there are multiple
    return result[field][0];
  }
  return null;
};
