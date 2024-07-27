import { Tab } from '@mui/base/Tab';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tabs } from '@mui/base/Tabs';
import DataListing from './DataListing';
import BookMark from './BookMark';
import Grid from '@mui/material/Grid';

const TabComponent = () => {
  return (
    <>
      <Grid container spacing={2} style={{padding:10}}>
        <Grid item xs={6}>
        <DataListing />
        </Grid>
        <Grid item xs={6}>
        <BookMark />
        </Grid>
      </Grid>
      {/* <Tabs defaultValue={1}>
        <TabsList>
          <Tab value={1}>Data Listing</Tab>
          <Tab value={2}>Book Mark</Tab>
        </TabsList>
        <TabPanel value={1}>
          <DataListing />
        </TabPanel>
        <TabPanel value={2}>
          <BookMark />
        </TabPanel>
      </Tabs> */}
    </>
  );
};
export default TabComponent;
