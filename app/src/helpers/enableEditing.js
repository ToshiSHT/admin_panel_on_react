import { textEdit } from './textEdit';
import { editorImage } from './editorImage';

export const enableEditing = (
    iframe,
    virtualDom,
    isLoading,
    isLoaded,
    messageApi
) => {
    iframe.contentDocument.body
        .querySelectorAll('text-editor')
        .forEach((elem) => {
            const id = elem.getAttribute('nodeid');
            const virtualElem = virtualDom.body.querySelector(
                `[nodeid="${id}"]`
            );
            textEdit(elem, virtualElem);
        });
    iframe.contentDocument.body
        .querySelectorAll('[editimgid]')
        .forEach((elem) => {
            const id = elem.getAttribute('editimgid');
            const virtualElem = virtualDom.body.querySelector(
                `[editimgid="${id}"]`
            );
            editorImage(elem, virtualElem, isLoading, isLoaded, messageApi);
        });
};
