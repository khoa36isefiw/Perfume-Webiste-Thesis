const test = {
    notifyMessage: {
        sub: {
            title: 'Subscribe Newsletter',
            require: 'Email is required',
            existed: 'Email already exists',
            success: 'Subscribe Newsletter successfully!',
            notiSub: 'Subscribe Newsletter successfully',
        },
    },
};




if (email === '') {
    showMessage(
        'warning',
        `${t('common.notifyMessage.sub.title')}`,
        `${t('common.notifyMessage.sub.require')}`,
    );
} else {
    if (response.status === 200) {
        showMessage(
            'warning',
            `${t('common.notifyMessage.sub.title')}`,
            `${t('common.notifyMessage.sub.success')}`,
        );
    } else {
        showMessage(
            'warning',
            `${t('common.notifyMessage.sub.title')}`,
            `${t('common.notifyMessage.sub.existed')}`,
        );
    }
}