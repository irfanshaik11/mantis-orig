import { useMemo, ReactElement } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import RowDragDrop from 'sections/tables/react-table/RowDragDrop';
import ColumnDragDrop from 'sections/tables/react-table/ColumnDragDrop';
import makeData from 'data/react-table';

// ==============================|| REACT TABLE - DRAG & DROP ||============================== //

const DragDrop = () => {
  const data = useMemo(() => makeData(20), []);

  return (
    <Page title="Drag Drop Table">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RowDragDrop data={data.slice(0, 10)} />
        </Grid>
        <Grid item xs={12}>
          <ColumnDragDrop data={data.slice(10, 19)} />
        </Grid>
      </Grid>
    </Page>
  );
};

DragDrop.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default DragDrop;
