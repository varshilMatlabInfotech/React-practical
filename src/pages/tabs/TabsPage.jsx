import React, { useState } from 'react';
import UsersPage from 'pages/users/users';
import { Tab, Box } from '@material-ui/core';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BookmarkedPage from 'pages/Bookmarked/Bookmarked';
const TabsPage = () => {
    const [tabName, setTabName] = useState('Users')
    const handleChange = (e) => {
        const { innerHTML } = e.target
        setTabName(innerHTML)
    }
    return (
        <div className='h-screen w-full bg-gray-200 p-10'>
            <div className='bg-white rounded-md border shadow'>
                <TabContext value={tabName} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Users" value="Users" />
                            <Tab label="Bookmarked" value="Bookmarked" />
                        </TabList>
                    </Box>
                    <TabPanel value="Users"> <UsersPage /></TabPanel>
                    <TabPanel value="Bookmarked"><BookmarkedPage /></TabPanel>
                </TabContext>
            </div>
        </div>

    )
};
export default TabsPage;
