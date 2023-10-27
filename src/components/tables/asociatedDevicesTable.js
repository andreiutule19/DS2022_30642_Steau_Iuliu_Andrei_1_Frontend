import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from "react";
import history from "../history/history";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Col, Row } from "react-bootstrap";
import axiosInstance from "../axios/axios";
import axiosLogin from "../axios/axiosLogin";
import { useLocation } from 'react-router-dom';
import Background from '../../images/bg-sign-in-basic.jpeg';


const AssociatedDevicesList = () => {
    const infos = useLocation();
    const [email] = useState(infos.state.state.email);
    const [userDevices, setUserDevices] = useState([]);
    const [devices, setDevices] = useState([]);
    

    const [slicedDevice, setSlicedDevice] = useState({
        deviceId: 0,
        description: "",
        address: "",
        maxHoursSpent: 0,
    });

    const [associateDevice, setAssociatedDevice] = useState({
        deviceId: 0,
        description: "",
        address: "",
        maxHoursSpent: 0,
       
    });

    useEffect(() => {
    axiosLogin.get("users/get/associated/" + email)
        .then(res => {
            const val = res.data;
            setUserDevices(val);
        })
        .catch(error => {
            console.log(error);
        });
    }, [email]);

    useEffect(() => {
        console.log(devices);
        }, [devices]);
    
    useEffect(() => {
    
        axiosLogin.get("devices/nullUser")
            .then(res => {
                const val = res.data;
                setDevices(val);
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
            setSlicedDevice(selectedRowsData[0]);
        }

    };

    const onRowsSelectionHandlerDevices = (ids) => {
        if (ids.length !== 0) {
            const selectedRowsData = ids.map((deviceId) => devices.find((row) => row.deviceId === deviceId));
            setAssociatedDevice(selectedRowsData[0]);
        }

    };
    const goBack = () => {
        history.push("/users");
        window.location.reload();
    }


    return (
        <div className='full-screen bg-users' style={{backgroundImage: `url(${Background})`}}>
            <div>

                <Row className="mt-4">
                    <Col lg={12} md={12} sm={12} className="p-5 m-auto rounded-sm" style={{ borderRadius: '20px', maxWidth: '700px' }}>
                        <div className="d-flex justify-content-start" style={{ paddingBottom: '10px' }}>
                            <Button

                                onClick={goBack}
                                sx={{

                                    boxShadow: 2,
                                    bgcolor: '#2A293D',
                                    borderRadius: '2px',


                                }}>Go Back</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                                color="error"
                                onClick={() => {

                                    console.log(slicedDevice);
                                    if (slicedDevice.deviceId !== 0) {
                                        axiosLogin.post("devices/delete/associate", slicedDevice)
                                            .then(
                                                () => {
                                                    window.location.reload();
                                                    
                                                }
                                        )
                                        
                                            .catch((error) => {

                                                alert(error);
                                            })
                                            
                                    }
                                   
                                }}
                                sx={{

                                    boxShadow: 2,
                                    bgcolor: '#2A293D',
                                    borderRadius: '2px'

                                }}>SLICE Device </Button>



                        </div>


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
                <Row className="mt-2" >
                    <Col sm={12} className="p-5 m-auto rounded-sm" style={{ paddingBottom: '100px', borderRadius: '20px', maxWidth: '700px' }}>
                        <div className="d-flex justify-content-start" style={{ paddingBottom: '10px' }}>
                            <Button

                                onClick={() => {
                                    if (associateDevice.deviceId !== 0) {
                                        axiosLogin.post("users/associate/" + email, associateDevice)
                                            .then(
                                                () => {
                                                    window.location.reload();
                                                }
                                             )
                                            .catch((error) => {

                                                alert(error);
                                            })
                                           
                                    }
                                   
                                }}
                                sx={{

                                    boxShadow: 2,
                                    bgcolor: '#2A293D',
                                    borderRadius: '2px',


                                }}>Associate Device</Button>
                        </div>
                        <DataGrid
                            rows={devices}
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
                            onSelectionModelChange={(ids) => onRowsSelectionHandlerDevices(ids)}
                        />
                    </Col>
                </Row>

            </div>
        </div>
    );

}
export default AssociatedDevicesList;