export const natification = (type, content, messageApi) => {
    messageApi.open({
        type: type,
        content: content,
        duration: 3,
    });
};
