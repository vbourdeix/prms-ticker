import Axios from  'axios-observable';
import { catchError, map, Observable, of, retry } from 'rxjs';

const baseURL = 'https://api.solscan.io/amm/market?address=A98UDy7z8MfmWnTQt6cKjje7UfqV3pTLf4yEbuwL2HrH&sort_by=liquidity&sort_type=desc';
const instance = Axios.create({
    baseURL,
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
        "upgrade-insecure-requests": "1",
    }
});

export const loadPRMSPrice = (): Observable<number> => {
    return instance.get(baseURL).pipe(
        map(response => response.data.data[0].price),
        catchError(retry(3)),
        catchError(() => of(0))
    );
}