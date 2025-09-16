export const PRIORITY_LEVELS = {
  HIGH: "high",
  MEDIUM: "medium", 
  LOW: "low"
}

export const PRIORITY_LABELS = {
  [PRIORITY_LEVELS.HIGH]: "High Priority",
  [PRIORITY_LEVELS.MEDIUM]: "Medium Priority",
  [PRIORITY_LEVELS.LOW]: "Low Priority"
}

export const PRIORITY_COLORS = {
  [PRIORITY_LEVELS.HIGH]: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-200",
    dot: "bg-red-500"
  },
  [PRIORITY_LEVELS.MEDIUM]: {
    bg: "bg-yellow-100", 
    text: "text-yellow-800",
    border: "border-yellow-200",
    dot: "bg-yellow-500"
  },
  [PRIORITY_LEVELS.LOW]: {
    bg: "bg-blue-100",
    text: "text-blue-800", 
    border: "border-blue-200",
    dot: "bg-blue-500"
  }
}

export const getPriorityConfig = (priority) => {
  return PRIORITY_COLORS[priority] || PRIORITY_COLORS[PRIORITY_LEVELS.LOW]
}

export const getPriorityWeight = (priority) => {
  switch (priority) {
    case PRIORITY_LEVELS.HIGH: return 3
    case PRIORITY_LEVELS.MEDIUM: return 2
    case PRIORITY_LEVELS.LOW: return 1
    default: return 1
  }
}

// Urgency utilities
export const URGENCY_LABELS = {
  urgent: "Urgent",
  normal: "Normal", 
  low: "Low"
}

export const URGENCY_LEVELS = ["urgent", "normal", "low"]

export const URGENCY_COLORS = {
  urgent: {
    bg: "bg-red-100 hover:bg-red-150",
    text: "text-red-800",
    border: "border-red-200",
    dot: "bg-red-500"
  },
  normal: {
    bg: "bg-blue-100 hover:bg-blue-150", 
    text: "text-blue-800",
    border: "border-blue-200",
    dot: "bg-blue-500"
  },
  low: {
    bg: "bg-gray-100 hover:bg-gray-150",
    text: "text-gray-800", 
    border: "border-gray-200",
    dot: "bg-gray-500"
  }
}

export const getUrgencyConfig = (urgency) => {
  return URGENCY_COLORS[urgency] || URGENCY_COLORS.normal
}

export const getUrgencyWeight = (urgency) => {
  const weights = { urgent: 3, normal: 2, low: 1 }
  return weights[urgency] || weights.normal
}

export const sortByUrgency = (tasks) => {
  return [...tasks].sort((a, b) => {
    return getUrgencyWeight(b.urgency) - getUrgencyWeight(a.urgency)
  })
}

export const sortByPriority = (tasks) => {
  return [...tasks].sort((a, b) => {
    const priorityDiff = getPriorityWeight(b.priority) - getPriorityWeight(a.priority)
    if (priorityDiff !== 0) return priorityDiff
    return getUrgencyWeight(b.urgency) - getUrgencyWeight(a.urgency)
  })
}