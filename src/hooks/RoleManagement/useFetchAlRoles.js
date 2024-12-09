import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { allRoles } from "../../utils/roleSlice";

const useFetchAllRoles = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const getAllRoles = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5001/roles");
        if (!response.ok) throw new Error('Failed to fetch roles');
        const data = await response.json();
        dispatch(allRoles(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getAllRoles();
    }, [dispatch]);
  
    return { loading, error };
  };
  

export default useFetchAllRoles;