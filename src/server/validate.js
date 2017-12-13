module.exports = {
  /**
   * Validate the Password
   *
   * @param {object} payload - the HTTP body message
   * @returns {object} The result of validation. Object contains a boolean validation result,
   *                   errors tips, and a global message for the whole form.
   */
   validate(payload) {
     const errors = {};
     let isFormValid = true;
     if (!payload.password || payload.password === payload.password.toUpperCase() ||  payload.name.trim().length === 0) {
       console.log(payload);

       isFormValid = false;
       errors.password = 'Please provide your password.';
     }

       if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
         isFormValid = false;
         errors.password = 'Please provide your password.';
       }
     return {
       success: isFormValid,
       errors
     };
   }
  }
