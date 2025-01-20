// components/Navbar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useUser } from '@/store/context';

const Navbar = () => {
  const router = useRouter();
  const { user } = useUser();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/clearToken', { method: 'POST' });
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          {/* Left Section: Logo/Title */}
          <Link href="/dashboard" passHref>
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginLeft: '50px'
              }}
            >
              FlashBrief
            </Typography>
          </Link>

          {/* Middle Section: Navigation Links */}
          <Box sx={{ display: 'flex', gap: 2 , ml:"100px"}}>
            <Link href="/policy" passHref>
              <Typography
                variant="body1"
                component="a"
                sx={{
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'lightgray',
                    textDecoration: 'none',
                  },
                }}
              >
                Policy
              </Typography>
            </Link>
            <Link href="/resource" passHref>
              <Typography
                variant="body1"
                component="a"
                sx={{
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'lightgray',
                    textDecoration: 'none',
                  },
                }}
              >
                News
              </Typography>
            </Link>
            <Link href="/user" passHref>
              <Typography
                variant="body1"
                component="a"
                sx={{
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'lightgray',
                    textDecoration: 'none',
                  },
                }}
              >
                User
              </Typography>
            </Link>
          </Box>

          {/* Right Section: User Info and Logout */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 , marginRight: '30px'}}>
            <Typography variant="body1" sx={{ color: 'white' }}>
              {user?.username ? `Hello, ${user.username}` : 'Welcome'}
            </Typography>
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{ textTransform: 'none',color:"black", backgroundColor: 'white', '&:hover': { backgroundColor: '#F0F8FF' } }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
