/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { ChangeEvent, FormEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useCreateEnquiryMutation } from "../../../redux/api/enquiryAPI";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { NewEnquiryRequest } from "../../../types/api-types";
import { useNavigate } from "react-router-dom";
import { responseToast } from "../../../utils/features";

const NewEnquiry = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [shift, setShift] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [adminId, setAdminId] = useState<string>("");
  const [_id, set_Id] = useState<string>("");

  const [createEnquiry] = useCreateEnquiryMutation();
  const navigate = useNavigate();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // Handle image change if needed
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || mobile.length < 10 || !gender || !shift){
      console.log('error');
      return;
    }
    
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email.toString());
    formData.set("mobile", mobile.toString());
    formData.set("gender", gender);
    formData.set("shift", shift);
    formData.set("message", message);
    formData.set("adminId",adminId);
    console.log(formData);
    const res = await createEnquiry({ id: user?._id, formData });
    responseToast(res, navigate, "/admin/customer");
    console.log(res);
  } 

return (
  <div className="admin-container">
    <AdminSidebar />
    <main className="product-management">
      <article>
        <form onSubmit={handleSubmit}>
          <h2>New Enquiry</h2>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Mobile</label>
            <input
              type="text"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div>
            <label>Gender</label>
            <input
              type="text"
              placeholder="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div>
            <label>Shift</label>
            <input
              type="text"
              placeholder="Shift"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            />
          </div>
          <div>
            <label>Message</label>
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button type="submit">
            Create
          </button>
          {/* {isError && <div>Error: {error?.message}</div>} */}
        </form>
      </article>
    </main>
  </div>
);
};

export default NewEnquiry;
