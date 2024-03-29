import { useEffect, useState, SyntheticEvent, ReactElement } from 'react';
import { useRouter } from 'next/router';

// material-ui
import { Box, Grid, Tab, Tabs } from '@mui/material';
import { getUserStory, getUserStoryOrder, getProfiles, getComments, getItems, getColumns, getColumnsOrder } from 'store/reducers/kanban';

// project imports
import Layout from 'layout';
import Page from 'components/Page';
import { useDispatch } from 'store';
import { openDrawer } from 'store/reducers/menu';
import Board from 'sections/apps/kanban/Board';
import Backlogs from 'sections/apps/kanban/Backlogs';

function a11yProps(index: string) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// ==============================|| APPLICATION - KANBAN ||============================== //

export default function KanbanPage() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { tab } = router.query;

  const [value, setValue] = useState(tab);
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(`/apps/kanban/${newValue}`);
  };

  useEffect(() => {
    // hide left drawer when email app opens
    dispatch(openDrawer(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getItems());
    dispatch(getColumns());
    dispatch(getColumnsOrder());
    dispatch(getProfiles());
    dispatch(getComments());
    dispatch(getUserStory());
    dispatch(getUserStoryOrder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page title="User Profile">
      <Box sx={{ display: 'flex' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Tabs value={value} variant="scrollable" onChange={handleChange}>
              <Tab value="board" label={value === 'board' ? 'Board' : 'View as Board'} {...a11yProps('board')} />
              <Tab value="backlogs" label={value === 'backlogs' ? 'Backlogs' : 'View as Backlog'} {...a11yProps('backlogs')} />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            {tab === 'board' && <Board />}
            {tab === 'backlogs' && <Backlogs />}
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
}

KanbanPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
