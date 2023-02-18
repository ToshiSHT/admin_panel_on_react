HTMLIFrameElement.prototype.load = function (url, callback) {  // мини библиотека загрузки iframe
    const iframe = this;
    try {
        iframe.src = url + "?rnd=" + Math.random().toString().substring(2);
    } catch (error) {
        if (!callback) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        } else {
            callback(error);
        }
    }
    
    const maxTime = 60000; // максимальное время ожидание загрузки
    const interval = 200;// интервал проверок загрузки

    let timerCount = 0; // кол-во  проверок загрузки

    if (!callback) {
        return new Promise((resolve, reject) => {
            const timer = setInterval(function () {
                if (!iframe) return clearInterval(timer);
                timerCount++;
                if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
                    clearInterval(timer);  
                    resolve();  
                } else if (timerCount * interval > maxTime) {
                    reject(new Error("Iframe load fail!"));
                }
            }, interval);
        });
    } else {
        const timer = setInterval(function () {
            if (!iframe) return clearInterval(timer);
            if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
                clearInterval(timer);
                callback(); // если всё хорошо выполняется каллбек
            } else if (timerCount * interval > maxTime) {
                callback(new Error("Iframe load fail!"));
            }
        }, interval);
    }
};