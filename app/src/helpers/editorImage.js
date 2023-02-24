import axios from 'axios';
import { natification } from './natification';

export const editorImage = (
    element,
    virtualElement,
    ...[isLoading, isLoaded, messageApi]
) => {
    element.addEventListener('click', () => onClick());
    const imgUploader = document.querySelector('#img-upload');

    const onClick = () => {
        imgUploader.click();
        imgUploader.addEventListener('change', () => {
            isLoading();
            if (imgUploader.files && imgUploader.files[0]) {
                let formData = new FormData();
                formData.append('image', imgUploader.files[0]);
                axios
                    .post('./api/uploadImage.php', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then(
                        (res) =>
                            (virtualElement.src = element.src = res.data.src)
                    )
                    .then(() =>
                        natification(
                            'success',
                            'Успешно сохранено!',
                            messageApi
                        )
                    )
                    .catch(() =>
                        natification('error', 'Ошибка сохранения', messageApi)
                    )
                    .finally(() => {
                        imgUploader.value = '';
                        isLoaded();
                    });
            }
        });
    };
};
