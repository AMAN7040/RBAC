import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { allRoles } from "../../utils/roleSlice";

const useFetchAllRoles = () => {
    const dispatch = useDispatch();
    const [roleLoading, setRoleLoading] = useState(false);
    const [roleError, setRoleError] = useState(null);
  
    const getAllRoles = async () => {
      setRoleLoading(true);
      try {
        const response = await fetch("http://localhost:5001/roles");
        if (!response.ok) throw new Error('Failed to fetch roles');
        const data = await response.json();
        dispatch(allRoles(data));
      } catch (err) {
        setRoleError(err.message);
      } finally {
        setRoleLoading(false);
      }
    };
  
    useEffect(() => {
      getAllRoles();
    }, [dispatch]);
  
    return { roleLoading, roleError };
  };
  

export default useFetchAllRoles;