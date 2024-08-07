import React from 'react'
import { Routes, Route } from "react-router-dom";
import Medicine from "../admin/containers/medicine/Medicine";
import Layout from '../admin/containers/Layout';
import Doctors from '../admin/containers/doctors/Doctors';
import Department from '../admin/containers/department/Department';

function AdminRoutes() {
    return (
        <Layout>
            <Routes>
                <Route path="/medicine" element={<Medicine />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/department" element={<Department />} />
            </Routes>
        </Layout>
    )
}

export default AdminRoutes;