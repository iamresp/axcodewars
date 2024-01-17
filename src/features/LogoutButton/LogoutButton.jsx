import { Button } from '@mui/material'
import { FIELD_LOCAL_STORAGE } from '../../shared/constants/constants'

export const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem(FIELD_LOCAL_STORAGE.ACCESS_TOKEN)
    window.location.reload()
  }

  return (
    <Button variant='contained' onClick={handleLogout}>
      Выйти
    </Button>
  )
}
