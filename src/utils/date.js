import { format, isToday, isTomorrow, isYesterday, isPast, isFuture, parseISO, startOfDay, endOfDay } from "date-fns"

export const formatDate = (date) => {
  if (!date) return ""
  
  const dateObj = typeof date === "string" ? parseISO(date) : date
  
  if (isToday(dateObj)) return "Today"
  if (isTomorrow(dateObj)) return "Tomorrow"
  if (isYesterday(dateObj)) return "Yesterday"
  
  return format(dateObj, "MMM d, yyyy")
}

export const formatDateShort = (date) => {
  if (!date) return ""
  
  const dateObj = typeof date === "string" ? parseISO(date) : date
  
  if (isToday(dateObj)) return "Today"
  if (isTomorrow(dateObj)) return "Tomorrow"
  
  return format(dateObj, "MMM d")
}

export const isOverdue = (date) => {
  if (!date) return false
  const dateObj = typeof date === "string" ? parseISO(date) : date
  return isPast(endOfDay(dateObj)) && !isToday(dateObj)
}

export const isDueToday = (date) => {
  if (!date) return false
  const dateObj = typeof date === "string" ? parseISO(date) : date
  return isToday(dateObj)
}

export const isDueSoon = (date) => {
  if (!date) return false
  const dateObj = typeof date === "string" ? parseISO(date) : date
  return isFuture(dateObj) && !isTomorrow(dateObj)
}

export const formatDateInput = (date) => {
  if (!date) return ""
  const dateObj = typeof date === "string" ? parseISO(date) : date
  return format(dateObj, "yyyy-MM-dd")
}

export const parseInputDate = (dateString) => {
  if (!dateString) return null
  // Return date string in YYYY-MM-DD format, not Date object
  return format(parseISO(dateString), "yyyy-MM-dd")
}

export const getTodayString = () => {
  return format(new Date(), "yyyy-MM-dd")
}

export const getTomorrowString = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return format(tomorrow, "yyyy-MM-dd")
}