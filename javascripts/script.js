import {getStopName, getTrolley, getBus} from "./vehicles.js";
import {loadingStart, loadingEnd,
    setLocation, getStopid, fetchEntities} from "./utils.js";

let buttons = document.querySelectorAll(`button`);
buttons.forEach(item => item.addEventListener(`click`, getEntities));

getEntities();

function getEntities(e) {
    let stopId = !e ? getStopid() : e.target.dataset["stopId"];
    if (!stopId) return;

    setLocation(`stopid=${stopId}`);
    loadingStart();
    fetchEntities(stopId).then(entities => {
        loadingEnd();
        if (entities.length > 0)
            init(entities);
        else renderEmptyEntities();
    });
}

function init(entities) {
    // routes - объект вида {name: 1 автобус, time: 9:00:00)}
    let routes = entities
        .map(function (entity) {
            if (entity.tripUpdate) {
                let stop = parseInt(entity.tripUpdate.stopTimeUpdate[0].stopId);
                // id маршрута
                let routeId = Number(entity.tripUpdate.trip.routeId);
                // unix-время приезда к остановке
                let stopTimeUpdate = Number(entity.tripUpdate.stopTimeUpdate[0].arrival.time);
                stopTimeUpdate *= 1000;
                const dateOfArriving = new Date(stopTimeUpdate).toLocaleTimeString("ru-ru");

                let vehicle;
                // Если остановка - Невский проспект
                if (stop === 15495)
                    vehicle = getTrolley(routeId);
                else
                    vehicle = getBus(routeId);

                return({name: vehicle, time: dateOfArriving});
            }
        });
    render(routes);
}

function renderEmptyEntities() {
    let content = document.querySelector(".content");
    content.innerHTML =
        `<div class="mt-3 mb-n4 alert alert-primary">Информации нет. Возможно в такое время транспорт не ходит.</div>`
}

function render(routes) {
    let content = document.querySelector(".content");
    let row = `<h6 class="mt-3">Остановка:</h6>`;
    row += `<div class="mb-4 alert alert-success">${getStopName()}</div>`;
    row += `<div class="row table-container mt-3 mb-n4">`;
    routes.forEach(item => {
        let colName = `<div class="border col">${item.name}</div>`;
        let colTime = `<div class="border col">${item.time}</div>`;
        row += `${colName}${colTime}<div class="w-100"></div>`;
    });
    row += `</div>`;
    content.innerHTML = row;
}