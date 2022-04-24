"use strict";
exports.__esModule = true;
exports.loadPRMSPrice = void 0;
var axios_observable_1 = require("axios-observable");
var rxjs_1 = require("rxjs");
var baseURL = 'https://api.solscan.io/amm/market?address=A98UDy7z8MfmWnTQt6cKjje7UfqV3pTLf4yEbuwL2HrH&sort_by=liquidity&sort_type=desc';
var instance = axios_observable_1["default"].create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "max-age=0",
        "if-none-match": "W/\"e9b-CR8xGSIyBLsSAtrSG3/ZTEM1Dc8\"",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1"
    }
});
var loadPRMSPrice = function () {
    return instance.get(baseURL).pipe((0, rxjs_1.map)(function (response) { return response.data.data[0].price; }), (0, rxjs_1.catchError)((0, rxjs_1.retry)(3)), (0, rxjs_1.catchError)(function () { return (0, rxjs_1.of)(0); }));
};
exports.loadPRMSPrice = loadPRMSPrice;
