  // src/components/Logout.js
  import { useRouter } from 'next/router';
  import { useDispatch } from 'react-redux';
  import { logoutUser } from '../actions/authActions';

  const Logout = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {

      dispatch(logoutUser());
      router.push('/');
    };

    return (
      <button onClick={handleLogout} className="bg-white text-black py-2 px-4 rounded mr-40">
        Log Out
      </button>
    );
  };

  export default Logout;
