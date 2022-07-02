import { useState, FunctionComponent } from 'react';
import {
  Box,
  IconButton,
  Avatar as MuiAvatar,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useAuth, User } from '../../context/auth-context';

type Props = {
  user: User;
};

const Avatar: FunctionComponent<Props> = ({ user }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { logout } = useAuth();
  const username = user!.attributes.name || user!.username;
  const img = user!.attributes.picture || '/';

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
        <MuiAvatar alt={username.toLocaleUpperCase()} src={img} />
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
