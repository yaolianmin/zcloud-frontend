import Cookies from 'js-cookie';

const user = {
    state: {},
    mutations: {
        logout (state, vm) {
            Cookies.remove('user');
            //Cookies.remove('password');
            //Cookies.remove('access');
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', '');
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
        }
    }
};

export default user;