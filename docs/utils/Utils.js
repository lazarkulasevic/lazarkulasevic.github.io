const formatDateTime = (date) => {
    const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }
    return new Date(date).toLocaleString('en-GB', options)
}

const setAttributes = (el, attrs) => {
    for (const key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

export default {
    formatDateTime,
    setAttributes
}
