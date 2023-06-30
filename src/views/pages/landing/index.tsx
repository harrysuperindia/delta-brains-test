// material-ui
import { styled } from '@mui/material/styles';

// project imports
import AppBar from 'ui-component/extended/AppBar';
import Demos from './Demos';
import Feature from './Feature';
import Footer from './Footer';
import Header from './Header';
import KeyFeature from './KeyFeature';
import Layouts from './Layouts';
import Subscribe from './Subscribe';

const HeaderWrapper = styled('div')(({ theme }) => ({
    paddingTop: 30,
    overflowX: 'hidden',
    overflowY: 'clip',
    [theme.breakpoints.down('md')]: {
        paddingTop: 42
    }
}));

const SecondWrapper = styled('div')(({ theme }) => ({
    paddingTop: 160,
    [theme.breakpoints.down('md')]: {
        paddingTop: 60
    }
}));

// =============================|| LANDING MAIN ||============================= //

const Landing = () => (
    <>
        <HeaderWrapper id="home">
            <AppBar />
            <Header />
        </HeaderWrapper>
        <SecondWrapper>
            <Feature />
        </SecondWrapper>
        <SecondWrapper>
            <Demos />
        </SecondWrapper>
        <SecondWrapper>
            <Layouts />
        </SecondWrapper>
        <SecondWrapper>
            <KeyFeature />
        </SecondWrapper>
        <SecondWrapper>
            <Subscribe />
        </SecondWrapper>
        <Footer />
        {/* <Customization /> */}
    </>
);

export default Landing;
