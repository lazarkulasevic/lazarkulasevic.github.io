const formatDateTime = (date) => {
    const options = {
        day: 'numeric',
        month: 'short',
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

const getRoundedAge = (dateString) => {
    const differenceInMilliseconds = Date.now() - new Date(dateString).getTime()
    const yearInMilliseconds = 31536000000
    return Math.round(differenceInMilliseconds / yearInMilliseconds)
}

export default {
    formatDateTime,
    setAttributes,
    getRoundedAge
}
