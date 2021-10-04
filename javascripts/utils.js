import {$root as GtfsRealtimeBindings} from "./gtfs-realtime.js";

function loadingStart() {
    let content = document.querySelector(".content");
    content.innerHTML =
        `<div class="mt-3 loading alert alert-primary" role="alert">
          Загрузка...
         </div>`;
}

function loadingEnd() {
    let loading = document.querySelector(".loading");
    loading.parentNode.removeChild(loading);
}

function getStopid() {
    let paramsString = document.location.search;
    let searchParams = new URLSearchParams(paramsString);

    return searchParams.get("stopid");
}

function setLocation(curLoc) {
    try {
        history.pushState(null, null, "?" + curLoc);
        return;
    } catch(e) {}
    location.search = "?" + curLoc;
}

/**
* Send request to transport.orgp.spb.ru, returns promise
* @param stopId - id остановки
* @return {Promise}
 */

function fetchEntities(stopId) {
    let url = `https://transport.orgp.spb.ru/Portal/transport/internalapi/gtfs/realtime/stopforecast?stopID=${stopId}`;
   return fetch(url).then((response) => {
       // To use in node.js
       // let buffer = response.body._readableState.buffer.head.data;
       return response.arrayBuffer();
    })
   .then(buffer => {
       let reader = new Uint8Array(buffer);
       return GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(reader).entity;
   })
   .then(feed => {
       return feed;
   }).catch(error => console.log(error));
}

export {loadingStart, loadingEnd, setLocation, getStopid, fetchEntities}