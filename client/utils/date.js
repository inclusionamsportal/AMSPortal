const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const formatDate = date => {
  const d = new Date(date)
  const year = d.getFullYear()
  let day = d.getDate() + 1
  let month = d.getMonth() + 1

  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day

  const formattedDate = `${year}-${month}-${day}`

  return formattedDate
}

const parseDate = date => {
  const d = new Date(date)
  const dateOfMonth = d.getUTCDate()
  const dayIndex = d.getUTCDay()
  const monthIndex = d.getUTCMonth()
  const year = d.getUTCFullYear()

  const month = monthNames[monthIndex]
  const day = week[dayIndex]

  return {
    month,
    day,
    date: dateOfMonth,
    year
  }
}

export {formatDate, parseDate}
