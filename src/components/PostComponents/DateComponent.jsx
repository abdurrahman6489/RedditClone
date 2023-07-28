import { Typography } from '@mui/material'
import React from 'react'
import { findDays } from '../../utils'
// function findDays(postDate) {
//   const fullDate = new Date(postDate)
//   const date = fullDate.getDate();
//   const month = fullDate.getMonth();
//   const year = fullDate.getFullYear();
//   const hour = fullDate.getHours();
//   const minutes = fullDate.getMinutes();
//   const currentDate = new Date();
//   if (currentDate.getFullYear() > year)
//     return `${currentDate.getFullYear() - year} years ago`;
//   if (currentDate.getMonth() > month)
//     return `${currentDate.getMonth() - month} months ago`;
//   if (currentDate.getDate() > date)
//     return `${currentDate.getDate() - date} days ago`;
//   if (currentDate.getHours() > hour)
//     return `${currentDate.getHours() - hour} hours ago`;
//   if (currentDate.getMinutes() > minutes)
//     return `${currentDate.getMinutes() - minutes} minutes ago`;
//   else return `Just now`;
// }
const DateComponent = ({date}) => {
  
  const stringDate = findDays(date);
  return (
    <Typography variant="body2" sx={{mt : "2vh"}}>
      {stringDate}
    </Typography>
  )
}

export default DateComponent