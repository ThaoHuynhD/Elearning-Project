export let localServices = {
    set: (user) => {
        return localStorage.setItem("USER", JSON.stringify(user));
    },
    get: () => {
        return JSON.parse(localStorage.getItem("USER"));
    },
    remove: () => {
        localStorage.clear();
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