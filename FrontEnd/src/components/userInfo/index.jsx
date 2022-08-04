import React from "react";
import "./userInfo.css";
import { useStore } from "../../store/StoreProvider";

const UserInfo = () => {
  const { user } = useStore();

  return (
    <div>
      <div className="gv-container-info">
        <div className='unc-icons-user'>
          {user.name &&
            user.name.split(" ").map((letter, index) => (
              <p key={index}>{letter.slice(0, 1).toUpperCase()}</p>
            ))
          }
        </div>
        <div className="gv-info">
          <p>Hola,</p>
          {user.name && <span>{user.name}</span>}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
