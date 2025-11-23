export const sleep = (time) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });

export const getIdInSlug = (slug) => slug?.split('-')?.pop();
