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
      <button onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">

        Log Out
      </button>
    );
  };

  export default Logout;
