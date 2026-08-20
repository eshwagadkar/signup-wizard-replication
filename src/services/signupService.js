export function requestCustomPronoun(pronoun) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        pronoun,
      });
    }, 1000);
  });
}