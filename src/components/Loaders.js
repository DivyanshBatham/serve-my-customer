import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from '../atoms';

const BallPulseSync = styled.div`
@keyframes ball-pulse-sync {
  33% {
    -webkit-transform: translateY(10px);
            transform: translateY(10px); }
  66% {
    -webkit-transform: translateY(-10px);
            transform: translateY(-10px); }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0); } }

 > div:nth-child(1) {
  -webkit-animation: ball-pulse-sync 0.6s -0.14s infinite ease-in-out;
          animation: ball-pulse-sync 0.6s -0.14s infinite ease-in-out; }

 > div:nth-child(2) {
  -webkit-animation: ball-pulse-sync 0.6s -0.07s infinite ease-in-out;
          animation: ball-pulse-sync 0.6s -0.07s infinite ease-in-out; }

 > div:nth-child(3) {
  -webkit-animation: ball-pulse-sync 0.6s 0s infinite ease-in-out;
          animation: ball-pulse-sync 0.6s 0s infinite ease-in-out; }

  `;

const Ball = styled(Box)`
  margin: 2px;
  border-radius: 100%;
  animation-fill-mode: both;
  display: inline-block;
`

Ball.defaultProps = {
  bg: 'primary',
  size: '1rem'
}

const Loader = () => {
  return (
    <BallPulseSync>
      <Ball />
      <Ball size='1.1rem' />
      <Ball />
    </BallPulseSync>
  );
}

const FullPageLoader = () => {
  return (
    <Flex.center height="100vh" bg="offWhite">
      <Loader />
    </Flex.center>
  )
}

export { Loader, FullPageLoader };