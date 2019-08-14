const getReadableDate = date => new Date(date).toDateString()

const formatDate = date => {
  const d = new Date(date)
  const year = d.getFullYear()
  let day = d.getDate()
  let month = d.getMonth() + 1

  if (month < 10) month = '0' + month
  if (date < 10) month = '0' + day

  const formattedDate = `${year}-${month}-${day}`

  return formattedDate
}

export {getReadableDate, formatDate}
