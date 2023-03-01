const injectStyles = (iframe) => {
    const style = iframe.contentDocument.createElement('style');
    style.innerHTML = `
        text-editor:hover {
            overflow-y: visible;
            outline: 4px solid #aed6dc;
            outline-offset: 6px;
        }
        text-editor:focus {
            overflow-y: visible;
            outline: 4px solid #ff9a8d;
            outline-offset: 6px;
        }
        [editimgid]:hover {
             outline: 4px solid #aed6dc;
            outline-offset: 6px;
        }
        `;
    iframe.contentDocument.head.appendChild(style);
};

export default injectStyles;
