import React from 'react';
import './index.css';
import A from '../A';

import Wrapper from './Wrapper';
import styled from 'styled-components';

const Container = styled.div`
    margin-right: auto;
    margin-left: auto;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    min-width: 940px;
    max-width: 1150px;
`;

const Separator = styled.hr`
    background-image: linear-gradient(to right, #c0c0c0 50%, rgba(255,255,255,0) 40%);
    background-position: top;
    background-size: 3px 1px;
    background-repeat: repeat-x;
    height: 1px;
    width: 100%;
    border-top: 0;
    border-bottom: 0;
`;

function Footer() {
    return (
      <Wrapper>
        <Container>
            <ul className='footer-ul'>
                <li>
                    <A href="./about">About us</A>
                </li>
                <li>
                    <A href="./help">Help</A>
                </li>
                <li>
                    <A href="./contact">Contact</A>
                </li>
            </ul>
            <Separator />
            <p className="icon-reference" >Icons made by <a href="https://www.flaticon.com/authors/pause08" title="Pause08">Pause08</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>
        </Container>
      </Wrapper>
    );
  }

  export default Footer;