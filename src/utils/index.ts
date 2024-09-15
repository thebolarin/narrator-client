export function formatDate(dateString: Date) {
    // Parse the date string
    const date = new Date(dateString)

    // Get the components of the date
    const hours = date.getHours() % 12 || 12 // 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, '0') // add leading zero if needed
    const ampm = date.getHours() >= 12 ? 'pm' : 'am'
    const month = date.toLocaleString('en-US', { month: 'short' })
    const day = date.getDate()
    const year = date.getFullYear()

    // Format the date string
    return `${hours}:${minutes}${ampm}, ${month} ${day} ${year}`
}


// Example usage
// const dateStr = '2024-07-26T16:18:26.080Z'
// const result = formatDate(dateStr)
// console.log(result) // Outputs: "4:18 pm Jul 26 2024"
