export const unWrappTextNode = (dom) => {
    dom.body.querySelectorAll('text-editor').forEach((elem) => {
        elem.parentNode.replaceChild(elem.firstChild, elem);
    });
};

export const wrappTextNodes = (dom) => {
    const body = dom.body;
    let textNodes = [];
    const recursySearch = (element) => {
        // находим все текстовые и не пустые ноды
        element.childNodes.forEach((node) => {
            if (
                node.nodeName === '#text' &&
                node.nodeValue.replace(/\s+/g, '').length > 0
            ) {
                textNodes.push(node);
            } else {
                recursySearch(node);
            }
        });
    };
    recursySearch(body);
    textNodes.forEach((node, i) => {
        // добовлем каждой текстовой ноде тег обертку
        const wrappTeg = dom.createElement('text-editor');
        node.parentNode.replaceChild(wrappTeg, node);
        wrappTeg.appendChild(node);
        wrappTeg.setAttribute('nodeid', i);
    });

    return dom;
};

export const parseStringToDom = (str) => {
    // парсим исходный документ в новую DOM структуру
    const parser = new DOMParser();
    return parser.parseFromString(str, 'text/html');
};

export const serializeDOMToString = (dom) => {
    // преобразуем DOM структуру в строку
    const serializer = new XMLSerializer();
    return serializer.serializeToString(dom);
};
