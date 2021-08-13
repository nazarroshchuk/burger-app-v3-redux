export const user = {
    currentUser: null,
    store: function(user) {
        this.currentUser = user;
        localStorage.setItem('user', JSON.stringify(user));
    },
    clear: function () {
        localStorage.removeItem('user');
        this.currentUser = null;
    },
    current: function() {
        if (!this.currentUser) {
            this.currentUser = JSON.parse(localStorage.getItem('user'));
        }

        return this.currentUser;
    },
    token: function (accessToken) {
        const currentUser = this.current();

        if (currentUser) {
            if (accessToken) { // set access token if specified
                currentUser.accessToken = accessToken;
                this.store(currentUser);
            }

            return currentUser.accessToken;
        }

        return null;
    },
    refreshToken: function () {
        const currentUser = this.current();
        return !!currentUser ? { accessToken: currentUser.accessToken, refreshToken: currentUser.refreshToken } : {};
    },
    isAuthenticated: function(){
        return !!this.current();
    },
}
