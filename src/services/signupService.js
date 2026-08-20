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

export function submitSignup(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      /*
       * Frontend assessment simulation.
       *
       * Use a special username to test failure:
       * "fail_signup"
       */
      if (data.username === "fail_signup") {
        reject(
          new Error(
            "We couldn't create your account. Please try again."
          )
        );

        return;
      }

      resolve({
        success: true,
        user: {
          email: data.email,
          username: data.username,
          name: data.name,
          age: data.dob.age,
          pronouns: data.pronouns,
          location: data.location,
        },
      });
    }, 1500);
  });
}