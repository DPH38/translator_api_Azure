import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// API MICROSOFT AZURE TRANSLATOR
let key = process.env.AZURE_KEY;
let endpoint = "https://api.cognitive.microsofttranslator.com";
let location = process.env.AZURE_LOCATION;

async function translateText({ text: text, idiomaOrigem: idiomaOrigem, idiomaDestino: idiomaDestino }) {
    let params = new URLSearchParams();
    params.append("api-version", "3.0");
    params.append("from", idiomaOrigem);
    params.append("to", idiomaDestino);

    return axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': key,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: params,
        data: [{
            'text': text
        }],
        responseType: 'json'
    }).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
}

export { translateText };