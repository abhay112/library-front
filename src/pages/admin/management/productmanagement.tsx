import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { RootState, server } from "../../../redux/store";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDeleteStudentMutation, useStudentDetailsQuery, useUpdateStudentMutation } from "../../../redux/api/studentAPI";
import { responseToast } from "../../../utils/features";

interface RouteParams {
  id: string;
}
const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const Productmanagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const params = useParams<RouteParams>();
  const id = params?.id || "";
  const navigate = useNavigate();
  const { data, isLoading, isError } = useStudentDetailsQuery(id);
  console.log(data,params,user,'student detailspage')
  const { name, email, mobile, photo } = data?.student || {
    photo: "",
    name: "",
    email: "",
    mobile: 0,
  };

  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);
  const [emailUpdate, setEmailUpdate] = useState<string>(email);
  const [mobileUpdate, setMobileUpdate] = useState<number>(Number(mobile));
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateStudentMutation();
  const [deleteProduct] = useDeleteStudentMutation();
  console.log(name,email,mobile,photo,'all data');
  console.log(nameUpdate,emailUpdate,mobileUpdate,photoUpdate,'all data');



  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };
  console.log( user?._id, data?.student._id,'id');

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (nameUpdate) formData.set("name", nameUpdate);
    // if (emailUpdate) formData.set("email", emailUpdate.toString());
    if (mobileUpdate !== undefined)
      formData.set("mobile", mobileUpdate.toString());
    if (photoFile) formData.set("photo", photoFile);
    const res = await updateProduct({
      formData,
      userId: user?._id||"",
      studentId: data?.student._id||"",
    });

    responseToast(res, navigate, "/admin/student");
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id||"",
      studentId: data?.student._id||"",
    });

    responseToast(res, navigate, "/admin/student");
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.student.name);
      setEmailUpdate(data.student.email);
      setMobileUpdate(Number(data.student.mobile));
    }
  }, [data]);
  if (isError) return <Navigate to={"/404"} />;


  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section>
          <strong>ID - fsdfsfsggfgdf</strong>
          <img src={`${server}/${photo}`} alt="Student" />
          <p>{name}</p>
          {/* {stock > 0 ? (
            <span className="green">{stock} Available</span>
          ) : (
            <span className="red"> Not Available</span>
          )} */}
          <h3>₹{mobile}</h3>
        </section>
        <article>
            <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={emailUpdate}
                onChange={(e) => setEmailUpdate((e.target.value))}
                disabled
              />
            </div>
            <div>
              <label>Mobile</label>
              <input
                type="number"
                placeholder="Mobile"
                value={mobileUpdate}
                onChange={(e) => setMobileUpdate(Number(e.target.value))}
              />
            </div>
           
            <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler} />
            </div>

            {photoUpdate && <img src={photoUpdate} alt="New Image" />}
            <button type="submit">Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default Productmanagement;
