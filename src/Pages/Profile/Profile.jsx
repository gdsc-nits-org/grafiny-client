import { BiPencil } from "react-icons/bi";
import style from "./Profile.module.scss";
import { UploadedItem } from "../../Components";

const Profile = () => {
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
              <div className={style.name}>Anubhav Chakraborty</div>
              <div className={style.icon}>
                <BiPencil />
              </div>
            </div>
          </div>
        </div>
        <div className={style.upperright}>
          <div className={style.collegecontainer}>
            National Institute of Technology, Silchar
          </div>
          <div className={style.detailcontainer}>
            <div className={style.degree}>B-Tech</div>
            <div className={style.year}>Second Year</div>
            <div className={style.branch}>CSE</div>
          </div>
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
