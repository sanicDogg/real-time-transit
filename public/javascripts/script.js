let buttons = document.querySelectorAll('button');
buttons.forEach(item => item.addEventListener('click', getEntities));

getEntities().then();

async function getEntities(e) {
    let stopId = e === undefined ? getStopid() : e.currentTarget.dataset.stopId;
    if (stopId === null) return;
    loadingStart();
    setLocation(`stopid=${stopId}`);
    let response = await fetch(`/getEntities?stopId=${stopId}`);
    let entities = await response.json();
    loadingEnd();
    if (entities.length > 0)
        init(entities);
    else renderEmptyEntities();
}

function init(entities) {
    // routes - объект вида {name: 1 автобус, time: 9:00:00)}
    let routes = [];
    entities
        .forEach(function (entity) {
            if (entity.tripUpdate) {
                let stop = parseInt(entity.tripUpdate.stopTimeUpdate[0].stopId);
                // id маршрута
                let routeId = Number.parseInt(entity.tripUpdate.trip.routeId);
                // unix-время приезда к остановке
                let stopTimeUpdate = entity.tripUpdate.stopTimeUpdate[0].arrival.time;
                stopTimeUpdate *= 1000;
                const dateOfArriving = new Date(stopTimeUpdate).toLocaleTimeString('ru-ru');

                let vehicle;

                if (stop === 15495)
                    vehicle = getTrolley(routeId);
                else
                    vehicle = getBus(routeId);

                routes.push({name: vehicle, time: dateOfArriving});
            }
        });
    render(routes);
}

function renderEmptyEntities() {
    let content = document.querySelector('.content');
    content.innerHTML =
        `<div class="mt-3 mb-n4 alert alert-primary">Информации нет. Возможно в такое время транспорт не ходит.</div>`
}

function render(routes) {
    let content = document.querySelector('.content');
    let row = '<h6 class="mt-3">Остановка:</h6>';
    row += `<div class="mb-4 alert alert-success">${getStopName()}</div>`;
    row += '<div class="row table-container mt-3 mb-n4">';
    routes.forEach(item => {
        let colName = `<div class="border col">${item.name}</div>`;
        let colTime = `<div class="border col">${item.time}</div>`;
        row += colName += colTime += '<div class="w-100"></div>';
    });
    row += '</div>';
    content.innerHTML = row;
}

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
        case 3079:
            bus = "К-162";
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
    }

    bus += " автобус";

    return bus;
}

function loadingStart() {
    let content = document.querySelector('.content');
    content.innerHTML =
        `<div class="mt-3 loading alert alert-primary" role="alert">
          Загрузка...
         </div>`;
}

function loadingEnd() {
    let loading = document.querySelector('.loading');
    loading.parentNode.removeChild(loading);
}

function getStopid() {
    let paramsString = document.location.search;
    let searchParams = new URLSearchParams(paramsString);

    return searchParams.get("stopid");
}

function setLocation(curLoc) {
    try {
        history.pushState(null, null, '?' + curLoc);
        return;
    } catch(e) {}
    location.search = '?' + curLoc;
}