import { useEffect } from 'react';
import {useAuth} from '../../contexts/AuthContext';

export const Profile = () => {
    const { name,email } = useAuth();
    useEffect(() => {
      window.scroll({ behavior:'smooth',top:0 });
    },[])
    return (
        <div className="account__container">
            <div className="account__avatar">
              <img src="https://th.bing.com/th/id/OIP.AW_0CHhYeO98vZhNOYsfwwHaHa?w=185&h=185&c=7&o=5&dpr=1.25&pid=1.7" alt="Avatar" className="avatar" />
            </div>

            <div>
              <h2>Account Information</h2>
            </div>
            
            <div className="account__content">
               <div className="form-group">
                   <label htmlFor="name" className="form-label">Name: </label>
                   <div>
                     <input className="form-control" type="text" name="name" value={name} disabled/>
                   </div>
               </div>

               <div className="form-group">
                   <label htmlFor="email" className="form-label">Email: </label>
                    <div>
                      <input className="form-control" type="email" name="email" value={email} disabled/>
                    </div>
               </div>
            </div>
        </div>
    );
};