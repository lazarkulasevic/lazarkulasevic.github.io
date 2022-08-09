const Utils = {
    formatDateTime: (date) => {
        const options = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }
        return new Date(date).toLocaleString('en-GB', options)
    }
}

export default Utils
