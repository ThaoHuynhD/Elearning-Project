export let localServices = {
  set: (user) => {
    return localStorage.setItem("USER", JSON.stringify(user));
  },
  get: () => {
    return JSON.parse(localStorage.getItem("USER"));
  },
  remove: () => {
    localStorage.removeItem("USER");
    window.location.reload();
  },
};
export let userDetailLocalStorage = {
  get: () => {
    let dataJson = localStorage.getItem("USERDETAIL");
    return JSON.parse(dataJson);
  },
  set: (userDetail) => {
    let dataJson = JSON.stringify(userDetail);
    localStorage.setItem("USERDETAIL", dataJson);
  },
  remove: () => {
    localStorage.removeItem("USERDETAIL");
  },
};

export let categoriesLocalStorage = {
  set: (listItem) => {
    return localStorage.setItem("categories", JSON.stringify(listItem));
  },
  get: () => {
    return JSON.parse(localStorage.getItem("categories"));
  },
};
