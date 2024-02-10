import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { useGetFilledSeatLayoutQuery, useGetSeatLayoutQuery } from "../../redux/api/seatAPI";
import UserSidebar from "../../components/admin/UserSidebar";
// import SeatLayoutHOC from "../../components/admin/SeatLayoutHOC";

const UserSeats = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);
    const [rows, setRows] = useState<number | "">("");
    const [columns, setColumns] = useState<number | "">("");
    const [matrix, setMatrix] = useState<number[][]>([]);
    const [gridColors, setGridColors] = useState<string[][]>([]);
    // const [createSeats, setCreateSeats] = useState<boolean>(false);
    const boardRef = useRef<HTMLDivElement>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const { data, isError, error, isLoading } = useGetSeatLayoutQuery(user?._id, { refetchOnMountOrArgChange: true });
    const fetchSeat = useGetFilledSeatLayoutQuery(user?._id, { refetchOnMountOrArgChange: true });
    console.log(fetchSeat,user?._id,'fetchSeats')
    const navigate = useNavigate();

    useEffect(() => {
        if (rows !== "" && columns !== "") {
            const newMatrix = Array.from({ length: Number(rows) }, () =>
                Array.from({ length: Number(columns) }, () => 0)
            );
            const newGridColors = Array.from({ length: Number(rows) }, () =>
                Array.from({ length: Number(columns) }, () => "white")
            );
            setMatrix(newMatrix);
            setGridColors(newGridColors);
            if (boardRef.current) {
                boardRef.current.style.setProperty("--grid-rows", String(rows));
                boardRef.current.style.setProperty("--grid-columns", String(columns));
            }
        }
        if (data) {
            setMatrix(data?.data?.matrix);
            setSubmitted(true);
            setRows(data?.data?.rows);
            setColumns(data?.data?.columns)
        }
        seatingArrangement();
    }, [rows, columns, data]);
    useEffect(() => {

    }, [data]);

    const seatingArrangement = () => {
        if (!matrix.length) return null;
        const html: JSX.Element[] = [];
        console.log('seat arrangement')
        for (let i = 0; i < Number(rows); i++) {
            const row: JSX.Element[] = [];
            for (let j = 0; j < Number(columns); j++) {
                row.push(
                    <div key={j} className="square">
                        {matrix[i][j] !== 0 && matrix[i][j] !== 999 ? (
                            <p
                                className="seat"
                                onClick={() => handleGetSeatStatus(i, j)}
                            >{matrix[i][j]}</p>
                        ) : matrix[i][j] == 999 ? <p className="gate"></p> : <p className="empty"></p>}
                    </div>
                );
            }
            html.push(
                <div key={i} className="grid-row">
                    {row}
                </div>
            );
        }
        return html;
    };

    const handleGetSeatStatus = (row: number, col: number) => {
        console.log(`Seat at row ${row}, column ${col} clicked`);
    };
    console.log(data, 'seats');
    console.log(submitted, 'seats');
    console.log(matrix, 'seats');
    console.log(isLoading, 'seats');

    return (
        <div className="admin-container">
            <UserSidebar />
            {data ?
                <main className="seat-page">
                    {submitted && (
                        <div className="seating-arrangement">
                            {seatingArrangement()}
                        </div>
                    )}
                </main> : 
                <Link to="/user/seats/new" >
                    <FaEdit onClick={() => setSubmitted(false)} /> Create Seat Arrangement
                </Link>}
            {submitted && <Link to="/user/seats/new" className="create-product-btn">
                <FaEdit onClick={() => setSubmitted(false)} />
            </Link>}

        </div>
    );
};

export default UserSeats;
