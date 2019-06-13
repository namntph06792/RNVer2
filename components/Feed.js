import React, { } from 'react';
import { Container } from 'native-base';
import FHeader from '../components/FHeader';
import FContent from '../components/FContent';
import FFooter from '../components/FFooter';

export default function Feed() {

    return (
        <Container>
            <FHeader/>
            <FContent/>
            <FFooter/>
        </Container>
    );
}

