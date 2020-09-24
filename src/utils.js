import { parse } from 'querystring';

export function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;

        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context, args)
        }, wait);
    }
}

export function delay(timeout) {
    return new Promise(function (resolve) {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

export const getPageQuery = () => parse(window.location.href.split('?')[1]);