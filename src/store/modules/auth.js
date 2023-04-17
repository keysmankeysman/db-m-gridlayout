export default {
    state: () => ({
        authToken: localStorage.getItem("AUTH_TOKEN") || "",
        refreshToken: localStorage.getItem("REFRESH_TOKEN") || "",
    }),
    mutations: {

    },
    getters: {

    }
}