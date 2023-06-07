export function formatCurrency(value: number | string) {
    return value.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).replace('₫', '');
}

export function validateEmail(input: HTMLInputElement) {
    if (input.type === 'email' || input.name === 'email') {
        if (!/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/.test(input.value.trim())) {
            return false;
        }
    } else {
        if (input.value.trim() === '') {
            return false;
        }
    }
    return true;
}