interface ErrorMessages {
  [key: string]: string[];
}

export class ValidationErrors extends Error {
  public errors: ErrorMessages;

  constructor(message: string = 'Validation Error', errors: ErrorMessages) {
    super(message);

    this.name = 'ValidationErrors';
    this.errors = errors;
  }
}
