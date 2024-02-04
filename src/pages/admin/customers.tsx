import { ReactElement, useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { useCreateEnquiryMutation, useGetEnquiryQuery } from "../../redux/api/enquiryAPI";
import { Enquiry } from "../../types/types";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  mobile: number;
  shift: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Mobile",
    accessor: "mobile"
  },
  {
    Header: "Shift",
    accessor: "shift",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const img = "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png";
const img2 = "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png";

const arr: Array<DataType> = [
  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={img}
        alt="Shoes"
      />
    ),
    name: "Emily Palmer",
    email: "emily.palmer@example.com",
    gender: "Female",
    mobile: 9878987899,
    shift: "Morning",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },

  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={img2}
        alt="Shoes"
      />
    ),
    name: "May Scoot",
    email: "aunt.may@example.com",
    gender: "Female",
    mobile: 789878222,
    shift: "Evening",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={img2}
        alt="Shoes"
      />
    ),
    name: "Ashutosh",
    email: "aunt.may@example.com",
    gender: "Male",
    mobile: 676878222,
    shift: "All Day",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
];

const Customers = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { enquiry } = useCreateEnquiryMutation();
  const { data, refetch } = useGetEnquiryQuery(user?._id);
  console.log(data);
  const [rows, setRows] = useState<DataType[]>([]);
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-enquiry-box",
    "Enquiry",
    rows.length > 6
  )();
  useEffect(() => {
    if (data) {
      setRows(
        data?.enquiries?.map((val: Enquiry) => ({
          avatar: (<img style={{borderRadius: "80%", }} src={`${val?.gender === "Female"?img2:img}`} alt="Shoes"/>),
          name: val?.name,
          email: val?.email,
          mobile: val?.mobile,
          gender: val?.gender,
          shift: val?.shift,
          message: val?.message,
          adminId: val?.adminId,
          action:(<button><FaTrash /></button>),
        }))
      )
    }
  }, [data]);
  console.log(data);
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
      <Link to="/admin/customer/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Customers;
