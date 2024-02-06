import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "./firebase";
import { useDispatch, useSelector } from 'react-redux';
import { userExist, userNotExist } from './redux/reducer/userReducer';
import { getUser } from './redux/api/userAPI';
import { RootState } from "./redux/store";
import ProtectedRoute from './components/protected-route';
import NotFound from './pages/not-found';
import NewEnquiry from './pages/admin/management/newEnquiry';
import Enquiry from './pages/admin/enquiry';
import EnquiryManagement from './pages/admin/management/enquirymanagement';
import Students from './pages/admin/students';
import StudentManagement from './pages/admin/management/studentManagement';
// import AttendanceManagement from './pages/admin/management/attendancemanagement';
// import OrderDetails from './pages/order-details';
// import Checkout from './pages/checkout';
// import NotFound from './pages/not-found';

const Home = lazy(() => import("./pages/home"));
const Search = lazy(() => import("./pages/search"));
const Cart = lazy(() => import("./pages/cart"));
const Shipping = lazy(() => import("./pages/shipping"));
const Login = lazy(() => import("./pages/login"));
const Orders = lazy(() => import("./pages/orders"));

const Loader = lazy(() => import("./components/loader"));
const Header = lazy(() => import("./components/header"));

//admin route 
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/students"));
const Customers = lazy(() => import("./pages/admin/enquiry"));
const Attendance = lazy(() => import("./pages/admin/attendance"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newStudent"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/studentManagement")
);
const AttendanceManagement = lazy(
  () => import("./pages/admin/management/attendancemanagement")
);


const App = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state: RootState) => state.userReducer);
  const [authChecked, setAuthChecked] = useState(false);

  // useEffect(()=>{
  //   onAuthStateChanged(auth,async (user)=>{
  //     if(user){
  //       const data = await getUser(user.uid);
  //       console.log('logged in',loading);
  //       dispatch(userExist(data.user));
  //     }else{
  //       console.log('logged out');
  //       dispatch(userNotExist());
  //     }
  //   })
  // },[]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        console.log('logged in', loading);
        dispatch(userExist(data.user));
      } else {
        console.log('logged out');
        dispatch(userNotExist());
      }
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, [dispatch, loading]);

  
  if (!authChecked) {
    return <Loader />
  }
  console.log('loading', loading)

  return (
    <Router>
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route>

            <Route path="/shipping" element={<Shipping />} />
            <Route path="/login" element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            } />
            {/* Logged In User Routes */}
            <Route
              element={<ProtectedRoute isAuthenticated={user ? true : false} />}
            >
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/orders" element={<Orders />} />
              {/* <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/pay" element={<Checkout />} /> */}
            </Route>

          </Route>

          {/* //admin Rotues */}

          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                adminOnly={true}
                admin={user?.role === "admin" ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/students" element={<Students />} />
            <Route path="/admin/enquiry" element={<Enquiry />} />
            <Route path="/admin/attendance" element={<Attendance />} />
            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} />
            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            {/* Management */}
            <Route path="/admin/student/new" element={<NewProduct />} />
            <Route path="/admin/enquiry/new" element={<NewEnquiry />} />
            <Route path="/admin/enquiry/:id" element={<EnquiryManagement />} />
            <Route path="/admin/student/:id" element={<StudentManagement />} />
            <Route path="/admin/attendance/:id" element={<AttendanceManagement />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  )
}

export default App