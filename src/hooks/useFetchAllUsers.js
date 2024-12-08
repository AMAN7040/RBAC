import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { allUsers } from "../utils/usersSlice";

const useFetchAllUsers = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const getAllUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5001/users");
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        dispatch(allUsers(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getAllUsers();
    }, [dispatch]);
  
    return { loading, error };
  };
  

export default useFetchAllUsers;