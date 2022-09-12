import {getStopid} from "./utils.js";

function getStopName() {
    let stop = parseInt(getStopid());
    switch (stop) {
        case 3284:
            return "Ст. метро \"Приморская\"";
        case 15495:
            return "Ст. метро \"Невский проспект\"";
        case 2064:
            return "Ст. метро \"Гражданский проспект\"";
        case 1578:
            return "Капитанская улица";
        case 3192:
            return "Светлановский проспект";
    }
}

function getTrolley(routeId) {
    let trolley;
    switch (routeId) {
        case 1062:
            trolley = "1";
            break;
        case 1070:
            trolley = "11";
            break;
        case 1065:
            trolley = "7";
            break;
        case 1064:
            trolley = "5";
            break;
        case 1080:
            trolley = "22";
            break;
        case 1072:
            trolley = "10";
            break;
    }

    trolley += " троллейбус";
    return trolley;
}

function getBus(routeId) {
    let bus;
    switch (routeId) {
        // ст. метро Невский проспект
        case 3830:
            bus = "191";
            break;

        case 230:
            bus = "27";
            break;

        case 229:
            bus = "24";
            break;

        case 225:
            bus = "22";
            break;

        case 345:
            bus = "7";
            break;

        case 1329:
            bus = "3";
            break;

        // Капитанская
        case 1564:
            bus = "41";
            break;

        case 1685:
            bus = "151";
            break;
        case 7642:
            bus = "230";
            break;
        case 7509:
            bus = "249";
            break;

        // Приморская
        case 1686:
            bus = "152";
            break;
        case 446:
            bus = "100";
            break;
        case 1566:
            bus = "47";
            break;
        case 7634:
            bus = "220";
            break;
        case 7640:
            bus = "261";
            break;
        // Гражданский остановка
        case 1548:
            bus = "60";
            break;
        case 1550:
            bus = "61";
            break;
        case 337:
            bus = "93";
            break;
        case 1801:
            bus = "121";
            break;
        case 1549:
            bus = "139";
            break;
        case 1501:
            bus = "176";
            break;
        case 2112:
            bus = "183";
            break;
        case 3812:
            bus = "193";
            break;
        case 3832:
            bus = "199";
            break;
        case 7406:
            bus = "208";
            break;
        case 7382:
            bus = "240";
            break;
    }

    bus += " автобус";

    return bus;
}

export {getTrolley, getBus, getStopName}