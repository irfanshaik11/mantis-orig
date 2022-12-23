import { useMemo, ReactElement } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import UserCard from 'components/cards/profile/UserCard';
import makeData from 'data/react-table';
import { UserCardProps } from 'types/user-profile';

// ==============================|| PROFILE - USER CARD ||============================== //

const UserCardPage = () => {
  const data = useMemo(() => makeData(12), []);

  return (
    <Page title="User Card">
      <Grid container spacing={3}>
        {data.map((user: UserCardProps, index: number) => (
          <Grid key={index} item xs={12} sm={6} lg={4}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Page>
  );
};

UserCardPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default UserCardPage;
