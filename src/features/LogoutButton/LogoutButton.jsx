import { Button } from '@mui/material';
import { FieldLocalStorage } from '../../shared/constants/constants';

export const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem(FieldLocalStorage.ACCESS_TOKEN);
    window.location.reload();
  };

  return (
    <Button variant='contained' onClick={handleLogout}>
      Выйти
    </Button>
  );
};
