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
        el.setAttribute(key, attrs[key])
    }
}

const getRoundedAge = (startDate, endDate) => {
    const differenceInMilliseconds = new Date(endDate).getTime() - new Date(startDate).getTime()
    const monthInMilliseconds = 2629746000
    const differenceInMonths = Math.round(differenceInMilliseconds / monthInMilliseconds)
    const years = Math.floor(differenceInMonths / 12)
    const months = Math.round(differenceInMonths % 12)

    let resultString = ''

    if (years) {
        resultString += `${years} year`

        if (years > 1) {
            resultString += 's'
        }
    }

    if (years && months) {
        resultString += ', '
    }

    if (months) {
        resultString += `${months} month`

        if (months > 1) {
            resultString += 's'
        }
    }

    return resultString
}

export default {
    formatDateTime,
    setAttributes,
    getRoundedAge
}
