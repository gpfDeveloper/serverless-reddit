import { useState, FunctionComponent } from 'react';
import {
  Box,
  IconButton,
  Avatar as MuiAvatar,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

const Avatar: FunctionComponent = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <MuiAvatar
          alt="Pengfei"
          src="/"
          sx={{ backgroundColor: 'primary.main', color: 'white' }}
        />
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
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Avatar;
