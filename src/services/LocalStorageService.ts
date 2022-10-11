/**
 * @author Johnson Andrew Siziba (sizibajohnsona@gmail.com,+263784310119)
 * @version 1.0
 * Date: 10/10/2022
 * Time: 18:41
 */


class LocalStorageService {

    getDarkModeStatus() {
        return localStorage.getItem("darkModeSet");
    }

    toggleDarkMode() {
        let darkModeStatus = localStorage.getItem('darkModeSet') == "true";
        localStorage.setItem('darkModeSet', String(!darkModeStatus));
    }

    activateDarkMode(){
        localStorage.setItem('darkModeSet', 'true');
    }

    deactivateDarkMode(){
        localStorage.setItem('darkModeSet', 'false');
    }

    resetDarkModeSettings(){
        localStorage.removeItem("darkModeSet");
    }

}

export default LocalStorageService;