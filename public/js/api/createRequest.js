/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
// трансформировать url с учётом данных из data
// в чём смысл: берём объект, делаем из него массив пар ключ-значение, [[key, value], [key, value]] массив этот преобразуем, чтобы каждое из значений массива было преобразовано из массива в строку, где, и ключ и значение были в URI формате, [`key=value`, `key=value`]  соединяем разделителем URL - амперсандом. 


const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
   
    if (options.method === `GET`) {
        let url = options.url;
        
        if (options.data) {
            url += "?" + Object.entries(options.data)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join(`&`);
        }

        xhr.open(`GET`, url);
        xhr.send();
    } else {
        if (options.data) {
            let formData = new FormData();
            let data = options.data;

            for (let key in data) {
                formData.append(key, data[key]);
            }
            xhr.open(options.method, options.url);
            xhr.send(formData);
        } else {
            xhr.open(options.method, options.url);
            xhr.send();
        }
    }

    xhr.onload = function() {
        if (xhr.status === 200) {
            options.callback(null, xhr.response);
        } else {
            options.callback(new Error(), xhr.response)
        }
    }
};


  