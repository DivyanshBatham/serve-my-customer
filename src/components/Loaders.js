import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #F1F4F9;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BallPulse = styled.div`
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

.ball-pulse-sync > div:nth-child(1) {
  -webkit-animation: ball-pulse-sync 0.6s -0.14s infinite ease-in-out;
          animation: ball-pulse-sync 0.6s -0.14s infinite ease-in-out; }

.ball-pulse-sync > div:nth-child(2) {
  -webkit-animation: ball-pulse-sync 0.6s -0.07s infinite ease-in-out;
          animation: ball-pulse-sync 0.6s -0.07s infinite ease-in-out; }

.ball-pulse-sync > div:nth-child(3) {
  -webkit-animation: ball-pulse-sync 0.6s 0s infinite ease-in-out;
          animation: ball-pulse-sync 0.6s 0s infinite ease-in-out; }

.ball-pulse-sync > div {
  background-color: #3464E0;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin: 2px;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  display: inline-block; }
  `;



const Loader = () => {
  return (
    <BallPulse>
      <div className="ball-pulse-sync">
        <div />
        <div />
        <div />
      </div>
    </BallPulse>
  );
}

const FullPageLoader = () => {
  return (
    <Wrapper>
      <Loader />
    </Wrapper>
  )
}

export { Loader, FullPageLoader };