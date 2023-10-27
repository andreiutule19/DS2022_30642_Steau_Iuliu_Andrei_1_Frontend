import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Col,Row } from "react-bootstrap";
import axiosInstance from "../axios/axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import SidebarUser from "../sidebarUser/Sidebar";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import Background from '../../images/bg-sign-in-basic.jpeg';
import axiosLogin from "../axios/axiosLogin";

const UserDevicesList = () => {


    const [userDevices, setUserDevices] = useState([]);
    const [device, setDevice] = useState({});
    const [energyData, setEnergyData] = useState([]);
    const [firstValue, setFirstValue] =   useState(1668031200000);
    const [secondValue, setSecondValue] = useState(1668117599000);


    const handleChangeFirst = (newValue) => {
        setFirstValue(newValue);
    };
    const handleChangeSecond = (newValue) => {
        setSecondValue(newValue);
    };

    const handleChart = () => {
        axiosLogin.get("energy/" + device.deviceId + "/" + firstValue + "/" + secondValue)
            .then(res => {
                const val = res.data;
                setEnergyData(val);
            })
            .catch(error => {
                console.log(error);
            });
    }


    useEffect(() => {
        axiosLogin.get("users/get/associated/" + sessionStorage.getItem("EMAIL"))
            .then(res => {
                const val = res.data;
                setUserDevices(val);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const columns = [
        {
            field: "deviceId",
            headerName: "Device ID",
            width: 70,
            flex: 0.6,


        },
        {
            field: "description",
            headerName: "Description",
            minwidth: 140,
            flex: 1.5,


        },
        {
            field: "address",
            headerName: "Address",
            width: 70,
            flex: 1.5,

        },

        {

            field: "maxHoursSpent",
            headerName: "Max Hours Spent",
            minwidth: 70,
            flex: 1,

        },

    ];

    const onRowsSelectionHandler = (ids) => {
        if (ids.length !== 0) {
            const selectedRowsData = ids.map((deviceId) => userDevices.find((row) => row.deviceId === deviceId));
            setDevice(selectedRowsData[0]);
        }

    };

    return (
        <div className='full-screen bg-users' style={{backgroundImage: `url(${Background})`}}>
            <SidebarUser />
            <div style={{ paddingBottom: '20px' }}>
                <Row className="mt-4" >
                    <Col sm={12} className="p-5 m-auto rounded-sm" style={{ maxWidth: '700px' }}>

                        <DataGrid
                            rows={userDevices}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            getRowId={(row) => row.deviceId}
                            sx={{
                                height: 250,
                                bgcolor: '#2A293D',
                                width: "120%"

                            }}
                            checkboxSelection
                            NoRowsOverlay
                            onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                        />
                    </Col>
                </Row>

                <Row style={{ paddingLeft: '130px' }}>
                    <Col sm={12} className="p-5 m-auto rounded-sm" style={{ backgroundColor: "#2A293D", borderRadius: '20px', maxWidth: '730px' }}>
                        <div className="d-flex justify-content-start" style={{ paddingBottom: '30px' }}>
                            <Button
                                color="info"

                                onClick={handleChart}
                                sx={{

                                    boxShadow: 2,
                                    bgcolor: '#2A293D',
                                    borderRadius: '2px'

                                }}>GENERATE CHART</Button>
                        </div>
                        <div className="d-flex justify-content-start" style={{ paddingBottom: '30px' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="First date"
                                inputFormat="MM/DD/YYYY"
                                value={firstValue}
                                onChange={handleChangeFirst}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        &nbsp;&nbsp;&nbsp;
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Second date"
                                inputFormat="MM/DD/YYYY"
                                value={secondValue}
                                onChange={handleChangeSecond}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            </LocalizationProvider>
                            </div>
                        <BarChart
                            width={550}
                            height={300}
                            data={energyData}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="hours" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="energyUsed" stackId="a" fill="#8884d8" />
                        </BarChart>
                    </Col>
                </Row>

            </div>
        </div>
    );

}
export default UserDevicesList;