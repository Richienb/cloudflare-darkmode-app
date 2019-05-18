import css from "./styles.sass" // eslint-disable-line no-unused-vars

import $ from "jquery/dist/jquery.slim"

import moment from "moment"

let options = INSTALL_OPTIONS

console.log(JSON.parse(JSON.stringify(options)))

// documentReady runs every time the options are updated.
// Most of your code will end up inside this function.
function documentReady() {

    const theme = (({
        query,
        highcontrast,
        bodyclass,
        bodyclassarr,
        time,
        nightend,
        nightstart
    }) => [
        // MacOS CSS media query
        query && window.matchMedia("(prefers-color-scheme: dark)").matches,

        // High contrast CSS media query
        highcontrast && window.matchMedia("(-ms-high-contrast: white-on-black)").matches,

        // Class on body
        bodyclass && ($("body").attr("class") || "").split(/\s+/).some(i => i in bodyclassarr.reduce((acc, val) => {
            acc.push(val.text)
            return acc
        }, [])),

        // Night time
        time && moment().isAfter(moment(nightstart, "H:mm")) && moment().isBefore(moment(nightend, "H:mm"))
    ].some(i => i))(options.detection) ? "dark" : "light"

    if (options.handling.addsel) (({
        adddark,
        addlight,
        lightclass,
        darkclass,
        eladd
    }) => {
        if (addlight) $(eladd).toggleClass(lightclass, theme === "light")
        if (adddark) $(eladd).toggleClass(darkclass, theme === "dark")
    })(options.handling.addselop)

    // TODO: $.trigger as handler
    // element = INSTALL.createElement(options.location, element)
    //
    // // Set the app attribute to your app's dash-delimited alias.
    // element.setAttribute("app", "your-app-name")
    // element.innerHTML = options.message
}

// INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
window.INSTALL_SCOPE = {
    setOptions(nextOptions) {
        options = nextOptions

        documentReady()
    }
}

// This code ensures that the app doesn't run before the page is loaded.
if (document.readyState === "loading") $(document).on("DOMContentLoaded", documentReady)
else documentReady()
