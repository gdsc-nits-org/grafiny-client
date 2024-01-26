import { BiPencil } from "react-icons/bi";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Profile.module.scss";
import { UploadedItem } from "../../Components";
import UserContext from "../../Global/Auth/authContext";

const Profile = () => {
  const context = useContext(UserContext);
  const { user } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.name === "") {
      navigate("/login");
    } else if (!user.profile) {
      navigate("/profilecreate");
    } else {
      console.log(user);
    }
  }, []);

  return (
    <div className={style.container}>
      <div className={style.upperpart}>
        <div className={style.upperleft}>
          <div className={style.avatarbox}>
            <div className={style.imgbox}>
              <img
                className={style.profileimg}
                src="/assets/profileimg.png"
                alt="profileimg"
              />
            </div>
            <div className={style.namebox}>
              <div className={style.name}>{user?.name || "Name"}</div>
              <div className={style.icon}>
                <BiPencil />
              </div>
            </div>
          </div>
        </div>
        <div className={style.upperright}>
          <div className={style.collegecontainer}>{user?.profile?.institution?.name}</div>
          <div className={style.detailcontainer}>
            <div className={style.degree}>B-Tech</div>
            <div className={style.year}>{user?.profile?.year} year</div>
            <div className={style.branch}>{user?.profile?.scholarId}</div>
          </div>
          <div className={style.emailcontainer}>{user?.email}</div>
        </div>
      </div>
      <div className={style.lowerpart}>
        <div className={style.lowerleft}>
          <img className={style.uploadimg} src="/assets/uploadimg.png" alt="uploadimg" />
        </div>
        <div className={style.lowerright}>
          <div className={style.columnheading}>
            <div className={style.headingone}>Files Uploaded</div>
            <div className={style.heading2}>Date</div>
          </div>
          <div className={style.uploadeditems}>
            <UploadedItem item={1} />
            <UploadedItem item={1} />
            <UploadedItem item={1} />
            <UploadedItem item={1} />
            <UploadedItem item={1} />
            <UploadedItem item={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
