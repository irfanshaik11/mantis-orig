import { useEffect, useRef, useState, ReactElement } from 'react';

// material-ui
import { CircularProgress, Grid, LinearProgress, Stack, useTheme } from '@mui/material';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import MainCard from 'components/MainCard';
import ComponentHeader from 'components/cards/ComponentHeader';
import CircularWithLabel from 'components/@extended/Progress/CircularWithLabel';
import LinearWithLabel from 'components/@extended/Progress/LinearWithLabel';
import LinearWithIcon from 'components/@extended/Progress/LinearWithIcon';
import ComponentWrapper from 'sections/components-overview/ComponentWrapper';
import ComponentSkeleton from 'sections/components-overview/ComponentSkeleton';

// assets
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

// ==============================|| COMPONENTS - PROGRESS ||============================== //

const ComponentProgress = () => {
  const theme = useTheme();
  const [progress, setProgress] = useState(0);
  const [bufferProgress, setBufferProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const progressRef = useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (bufferProgress > 100) {
        setBufferProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setBufferProgress(bufferProgress + diff);
        setBuffer(bufferProgress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const bufferTimer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(bufferTimer);
    };
  }, []);

  return (
    <Page title="Progress">
      <ComponentSkeleton>
        <ComponentHeader
          title="Progress"
          caption="Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process."
          directory="src/pages/components-overview/progress"
          link="https://mui.com/material-ui/react-progress/"
        />
        <ComponentWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <Stack spacing={3}>
                <MainCard title="Circular Indeterminate">
                  <Grid container spacing={3} alignItems="center">
                    <Grid item>
                      <CircularProgress sx={{ color: 'red' }} />
                    </Grid>
                    <Grid item>
                      <CircularProgress color="secondary" />
                    </Grid>
                    <Grid item>
                      <CircularProgress color="success" />
                    </Grid>
                    <Grid item>
                      <CircularProgress color="warning" />
                    </Grid>
                    <Grid item>
                      <CircularProgress color="info" />
                    </Grid>
                    <Grid item>
                      <CircularProgress color="error" />
                    </Grid>
                  </Grid>
                </MainCard>
                <MainCard title="Circular Determinate">
                  <Grid container spacing={3} alignItems="center">
                    <Grid item>
                      <CircularProgress variant="determinate" value={25} />
                    </Grid>
                    <Grid item>
                      <CircularProgress variant="determinate" value={50} />
                    </Grid>
                    <Grid item>
                      <CircularProgress variant="determinate" value={75} />
                    </Grid>
                    <Grid item>
                      <CircularProgress variant="determinate" value={100} />
                    </Grid>
                    <Grid item>
                      <CircularProgress variant="determinate" value={progress} />
                    </Grid>
                  </Grid>
                </MainCard>
                <MainCard title="Circular With Label">
                  <Grid container spacing={3} alignItems="center">
                    <Grid item>
                      <CircularWithLabel value={progress} />
                    </Grid>
                    <Grid item>
                      <CircularWithLabel value={80} color="success" />
                    </Grid>
                    <Grid item>
                      <CircularWithLabel value={55} color="info" />
                    </Grid>
                    <Grid item>
                      <CircularWithLabel value={35} color="warning" />
                    </Grid>
                    <Grid item>
                      <CircularWithLabel value={10} color="error" />
                    </Grid>
                  </Grid>
                </MainCard>
                <MainCard title="Linear Buffer">
                  <LinearProgress variant="buffer" value={bufferProgress} valueBuffer={buffer} />
                </MainCard>
              </Stack>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Stack spacing={3}>
                <MainCard title="Linear Indeterminate">
                  <LinearProgress />
                </MainCard>
                <MainCard title="Linear Determinate">
                  <LinearProgress variant="determinate" value={progress} />
                </MainCard>

                <MainCard title="Linear With Label / Icon">
                  <Stack spacing={1}>
                    <LinearWithIcon
                      value={100}
                      color="success"
                      icon={<CheckCircleFilled style={{ color: theme.palette.success.main }} />}
                    />
                    <LinearWithLabel variant="determinate" value={progress} />
                    <LinearWithIcon value={5} color="error" icon={<CloseCircleFilled style={{ color: theme.palette.error.main }} />} />
                  </Stack>
                </MainCard>
                <MainCard title="Linear Color With Height">
                  <Stack spacing={1}>
                    <LinearWithLabel value={80} />
                    <LinearWithLabel value={75} color="secondary" sx={{ height: 6 }} />
                    <LinearWithLabel value={99} color="success" sx={{ height: 8 }} />
                    <LinearWithLabel value={35} color="warning" sx={{ height: 10 }} />
                    <LinearWithLabel value={60} color="info" sx={{ height: 12 }} />
                    <LinearWithLabel value={15} color="error" sx={{ height: 2 }} />
                  </Stack>
                </MainCard>
              </Stack>
            </Grid>
          </Grid>
        </ComponentWrapper>
      </ComponentSkeleton>
    </Page>
  );
};

ComponentProgress.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="component">{page}</Layout>;
};

export default ComponentProgress;
