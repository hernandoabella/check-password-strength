(() => {
    const STRONG_THRESHOLD = 30;
    const MEDIUM_THRESHOLD = 20;
    const CHAR_OCCURRENCE_SCORE = 3;
  
    const countCharacterOccurrences = (password, pattern) => {
      const matches = password.match(pattern);
      return matches ? matches.length : 0;
    };
  
    const evaluatePassword = (password) => {
      let score = password.length;
      score += countCharacterOccurrences(password, /[!]/gim) * CHAR_OCCURRENCE_SCORE;
      score += password.match(/[A-Z]/gm) ? CHAR_OCCURRENCE_SCORE : 0;
      score += password.match(/[0-9]/gim) ? CHAR_OCCURRENCE_SCORE : 0;
      return score;
    };
  
    const scoreToData = (score) => {
      if (score >= STRONG_THRESHOLD) {
        return {
          width: "100%",
          color: "#26de81",
          label: "Fuerte",
        };
      } else if (score >= MEDIUM_THRESHOLD) {
        return {
          width: "66%",
          color: "#fd9644",
          label: "Medio",
        };
      } else {
        return {
          width: "33%",
          color: "#fc5c65",
          label: "Débil",
        };
      }
    };
  
    window.addEventListener("DOMContentLoaded", () => {
      const passwordInput = document.querySelector(".js--password");
      const progressBar = document.querySelector(".js--password-bar");
      const statusText = document.querySelector(".js--password-text");
  
      passwordInput.addEventListener("input", () => {
        const password = passwordInput.value;
        const data = scoreToData(evaluatePassword(password));
  
        progressBar.style.width = data.width;
        progressBar.style.background = data.color;
        statusText.innerText = data.label;
      });
    });
  })();
  