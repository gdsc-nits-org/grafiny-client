import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { UploadedItem, Loading } from "../../Components";
import style from "./Profile.module.scss";
import UserContext from "../../Global/Auth/authContext";

const Profile = () => {
  const context = useContext(UserContext);
  const { user, loading, setLoading, auth, setUser } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user?.name === "") {
      navigate("/");
      toast.error("Please log in to continue", { autoClose: 1200 });
    } else if (!user?.profile) {
      navigate("/profilecreate");
      toast.error("Please create your profile", { autoClose: 1200 });
    }
  }, [user, navigate]);

  const deleteItem = async (id) => {
    confirmAlert({
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              setLoading(true);
              const token = await auth.currentUser.getIdToken(true);
              const response = await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/items/deleteFolder?id=${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const { data } = response;
              if (data.status !== 200) {
                setLoading(false);
                return toast.error(data.msg, { autoClose: 1200 });
              }

              const response2 = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/profile/get?email=${user.email}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const { data: data2 } = response2;
              if (data2.status !== 200) {
                setLoading(false);
                return toast.error(data2.msg, { autoClose: 1200 });
              }

              const { profile } = data2.msg;
              user.profile = profile;
              window.localStorage.setItem("user", JSON.stringify(user));
              setUser(user);
              setLoading(false);
              navigate("/profile");
              return toast.success("Item deleted successfully", { autoClose: 1200 });
            } catch (err) {
              setLoading(false);
              return toast.error("Failed to delete item", { autoClose: 1200 });
            }
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Item not deleted", { autoClose: 1200 }),
        },
      ],
    });
  };

  return loading === false ? (
    <div className={style.container}>
      <div className={style.upperpart}>
        <div className={style.upperleft}>
          <div className={style.avatarbox}>
            <div className={style.imgbox}>
              <img className={style.profileimg} src={user?.profilePic} alt="profileimg" />
            </div>
            <div className={style.namebox}>
              <div className={style.name}>{user?.name || "Name"}</div>
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
          <Link to="/upload">
            <img
              className={style.uploadimg}
              src="/assets/uploadimg.png"
              alt="upload files"
            />
          </Link>
        </div>
        <div className={style.lowerright}>
          {user?.profile?.uploadedItems?.length > 0 ? (
            <>
              <div className={style.columnheading}>
                <div className={style.headingone}>Files Uploaded</div>
                <div className={style.heading2}>Date</div>
              </div>
              <div className={style.uploadeditems}>
                {user?.profile?.uploadedItems?.map((item) => (
                  <UploadedItem key={item?.id} item={item} deleteItem={deleteItem} />
                ))}
              </div>
            </>
          ) : (
            <div className={style["no-files-text"]}>No files uploaded yet</div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Profile;
