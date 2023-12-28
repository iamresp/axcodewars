import React, { type ChangeEvent, useEffect, useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import cls from './SearchInput.module.css'

interface SearchInputProps {
  onSearch: (value: string) => void
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [value, setValue] = useState('')
  const debouncedSearchTerm = useDebounce(value, 500)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    onSearch(debouncedSearchTerm)
  }, [onSearch, debouncedSearchTerm])

  return (
    <input
      className={cls.inputSearch}
      type='text'
      value={value}
      onChange={handleChange}
      placeholder='Поиск'
    />
  )
}
