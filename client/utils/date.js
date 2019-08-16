// !!! ~ Note - date display the day before whichever date was chosen.
const getReadableDate = date => new Date(date).toDateString()

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

export {getReadableDate, formatDate}
