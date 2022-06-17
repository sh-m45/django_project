
import { Navigate } from 'react-router-dom';
    function prodectedRoute(Component) {
        return () => {
            if(!localStorage.getItem('userToken'))
            {
                return <Navigate to="/login" />
    
            }
            else
            {
            return <Component />;
            }
        }
        // console.log(props);
    }

    export default prodectedRoute;
    