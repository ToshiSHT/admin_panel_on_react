export const textEdit = (elem, virtualElem) => {
    elem.addEventListener('click', () => onClick());
    elem.addEventListener('blur', () => onBlur());
    elem.addEventListener('keypress', (e) => onEnter(e));
    elem.addEventListener('input', () => onInput());
    if (
        elem.parentNode.nodeName === 'A' ||
        elem.parentNode.nodeName === 'Button'
    ) {
        elem.addEventListener('contextmenu', (e) => onContextMenu(e));
    }

    const onClick = () => {
        elem.contentEditable = 'true';
        elem.focus();
    };

    const onBlur = () => {
        elem.contentEditable = 'false';
    };
    const onEnter = (e) => {
        if (e.keyCode === 13) {
            elem.blur();
        }
    };
    const onContextMenu = (e) => {
        e.preventDefault();
        onClick();
    };
    const onInput = () => {
        virtualElem.textContent = elem.textContent;
        console.log(virtualElem);
    };
};
