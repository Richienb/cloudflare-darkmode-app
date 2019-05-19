import css from "./styles.sass" // eslint-disable-line no-unused-vars

import $ from "jquery/dist/jquery.slim"

import moment from "moment"

let options = INSTALL_OPTIONS

console.log(JSON.parse(JSON.stringify(options)))

$.fn.colourReplace = function() {
    // Convert rgb color strings to hex
    function rgb2hex(rgb) {
        if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        function hex(x) {
            return (`0${parseInt(x).toString(16)}`).slice(-2);
        }
        return `#${hex(rgb[1])}${hex(rgb[2])}${hex(rgb[3])}`;
    }

    // Select and run a map function on every tag
    this.find("*").addBack(this).map((_i, el) => {
        // Get the computed styles of each tag
        const styles = window.getComputedStyle(el);

        // Go through each computed style and search for "color"
        Object.keys(styles).reduce((_acc, k) => {
            const name = styles[k];
            const value = styles.getPropertyValue(name);
            if (value !== null && name.includes("color")) {
                // Convert the rgb color to hex and compare with the target color
                if (value.includes("rgb(") && rgb2hex(value) === findHexColor) {
                    // Replace the color on this found color attribute
                    $(el).css(name, replaceWith);
                }
            }
        });
    });
}

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

    if (options.handling.addsel)(({
        adddark,
        addlight,
        lightclass,
        darkclass,
        eladd
    }) => {
        if (addlight) $(eladd).toggleClass(lightclass, theme === "light")
        if (adddark) $(eladd).toggleClass(darkclass, theme === "dark")
    })(options.handling.addselop)

    if (options.handling.trigger) $(document).trigger(options.handling.triggername, {
        theme
    })

    if (options.handling.autoadj)(i => i.map(({
        light,
        dark,
        limits
    }) => {
        if (limits === []) limits = ["body"]
        limits.map(sel => {
            if (theme === "light") $(sel).colourReplace(light, dark)
            else $(sel).colourReplace(dark, light)
        })
    }))(options.handling.colours.colour)

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
