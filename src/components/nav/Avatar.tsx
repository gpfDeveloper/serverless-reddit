import { useState, FunctionComponent } from 'react';
import {
  Box,
  IconButton,
  Avatar as MuiAvatar,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useAuth } from '../../context/auth-context';

type Props = {
  username: string;
};

const Avatar: FunctionComponent<Props> = ({ username }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { logout } = useAuth();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logoutHandler = () => {
    setAnchorElUser(null);
    logout();
  };
  return (
    <Box>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <MuiAvatar alt={username.toLocaleUpperCase()} src="/" />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={logoutHandler}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Avatar;
