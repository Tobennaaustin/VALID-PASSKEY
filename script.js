function checkPasswordStrength() {
    const passwordInput = document.getElementById('password');
    const passwordStrengthText = document.getElementById('password-strength');
    const copyButton = document.getElementById('copyButton');

    const password = passwordInput.value;
    const result = zxcvbn(password);

    if (password === '') {
      passwordStrengthText.textContent = '';
      copyButton.disabled = true;
    } else {
      passwordStrengthText.textContent = `Password Strength: ${result.score}/4`;

      if (result.feedback.suggestions.length > 0) {
        const suggestions = result.feedback.suggestions.join(', ');
        passwordStrengthText.textContent += `\nSuggestions: ${suggestions}`;
      }

      copyButton.disabled = result.score < 3; // Disable if score is less than 3
    }
  }

  function copyStrongPassword() {
    const passwordInput = document.getElementById('password');
    const passwordStrengthText = document.getElementById('password-strength');

    const password = passwordInput.value;
    const result = zxcvbn(password);

    if (result.score >= 4) { // Adjust the score threshold as needed
      navigator.clipboard.writeText(password)
        .then(() => {
          passwordStrengthText.textContent = 'Copied';
          passwordStrengthText.style.color = 'green';
          setTimeout(() => {
            passwordStrengthText.textContent = '';
          }, 2000); // Clear the message after 3 seconds
        })
        .catch((error) => {
          console.error('Unable to copy to clipboard', error);
          passwordStrengthText.textContent = `Error copying password to clipboard`;
        });
    } else {
      passwordStrengthText.textContent = 'Password is not strong enough. Please choose a stronger password.';
      passwordStrengthText.style.color = 'red';
    }
  }