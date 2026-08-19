import { createContext, useContext, useMemo, useState } from 'react'
import { FILTER_ALL } from '../constants/columns'

const FilterContext = createContext(null)

export function FilterProvider({ children }) {
  const [statusFilter, setStatusFilter] = useState(FILTER_ALL)

  const value = useMemo(
    () => ({ statusFilter, setStatusFilter }),
    [statusFilter],
  )

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  )
}

export function useFilter() {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider')
  }

  return context
}
