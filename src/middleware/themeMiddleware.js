/**
 * @author Johnson Andrew Siziba (sizibajohnsona@gmail.com,+263784310119)
 * @version 1.0
 * Date: 11/10/2022
 * Time: 11:52
 */

import LocalStorageService from "@/services/LocalStorageService";
import {activateDarkMode, deactivateDarkMode} from "@/assets/js/dark-mode";
import store from '../store/index';

export default function themeMiddleware({ next, to }) {

    let loc = new LocalStorageService();

    const routeName = to.name;

    function setDarkMode() {
        store.state.darkMode = true;
        store.state.sidebarType = "bg-default";
        activateDarkMode();
        loc.activateDarkMode();
    }

    if (routeName === "Login" || routeName === "Register"){
        store.state.darkMode = false;
        store.state.sidebarType = "bg-white";
        deactivateDarkMode();
        loc.resetDarkModeSettings();
    }
    else {
        let darkModeStatus = loc.getDarkModeStatus()

        if(darkModeStatus == null){
            loc.toggleDarkMode();
            setDarkMode();
        }

        if(darkModeStatus === "true"){
            setDarkMode();
        }
    }

    return next();
}