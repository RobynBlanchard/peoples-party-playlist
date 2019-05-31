import React from 'react';
import styled, { keyframes } from 'styled-components';

const Parallax = styled.div`
  /* background: linear-gradient(#0288d1, #81d4fa); */
  background-image: url('images/jason-blackeye-265661-unsplash.jpg');


  height: 85vh;

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ParallaxFour = styled.div`
  background: linear-gradient(#ffb300, #ff6f00);

  height: 85vh;

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ParallaxTwo = styled.div`
  /* background: linear-gradient(#0277bd, #01579b); */
  /* background: linear-gradient(#ffb300, #ff6f00); */
  background-image: url('images/jason-blackeye-265661-unsplash.jpg');


  height: 85vh;

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Static = styled.div`
  height: 70vh;
  font-size: 36px;
  width: 100%;
  /* background: linear-gradient(#ffb300, #ff6f00); */
`;

const SectionOne = styled.div`
  /* height: 80vh;
  font-size: 36px;
  width: 100%; */
`;

const SectionThree = styled.div`
  /* height: 80vh;
  font-size: 36px;
  width: 100%; */
`;

const SectionFour = styled.div`
  /* height: 80vh;
  font-size: 36px;
  width: 100%; */
`;

// https://codepen.io/Hackroro/pen/ByrKLZ
const Sun = styled.div`
  position: absolute;
  /* top: 0;
	left: 0;
	right: 0;
	bottom: 0; */
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: white;
  opacity: 0.9;
  box-shadow: 0px 0px 40px 15px white;
`;

const RayBox = styled.div`
  position: absolute;
  margin: auto;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 70px;
  -webkit-animation: ray_anim 120s linear infinite;
  animation: ray_anim 120s linear infinite;
`;
const Ray = styled.div`
  background: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background: linear-gradient(
    top,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  margin-left: 10px;
  border-radius: 80% 80% 0 0;
  position: absolute;
  opacity: 0.1;
`;

const Ray1 = styled(Ray)`
  height: 170px;
  width: 30px;
  -webkit-transform: rotate(180deg);
  top: -175px;
  left: 15px;
`;
const Ray2 = styled(Ray)`
  height: 100px;
  width: 8px;
  -webkit-transform: rotate(220deg);
  top: -90px;
  left: 75px;
`;
const Ray3 = styled(Ray)`
  height: 170px;
  width: 50px;
  -webkit-transform: rotate(250deg);
  top: -80px;
  left: 100px;
`;
const Ray4 = styled(Ray)`
  height: 120px;
  width: 14px;
  -webkit-transform: rotate(305deg);
  top: 30px;
  left: 100px;
`;
const Ray5 = styled(Ray)`
  height: 140px;
  width: 30px;
  -webkit-transform: rotate(-15deg);
  top: 60px;
  left: 40px;
`;
const Ray6 = styled(Ray)`
  height: 90px;
  width: 50px;
  -webkit-transform: rotate(30deg);
  top: 60px;
  left: -40px;
`;
const Ray7 = styled(Ray)`
  height: 180px;
  width: 10px;
  -webkit-transform: rotate(70deg);
  top: -35px;
  left: -40px;
`;
const Ray8 = styled(Ray)`
  height: 120px;
  width: 30px;
  -webkit-transform: rotate(100deg);
  top: -45px;
  left: -90px;
`;
const Ray9 = styled(Ray)`
  height: 80px;
  width: 10px;
  -webkit-transform: rotate(120deg);
  top: -65px;
  left: -60px;
`;
const Ray10 = styled(Ray)`
  height: 190px;
  width: 23px;
  -webkit-transform: rotate(150deg);
  top: -185px;
  left: -60px;
`;

const SectionTwo = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row; */
  width: 100%;
  height: 100%;
  background-color: rgba(51, 51, 51, 0.29);
`;

const ray_anim = keyframes`
		0% { -webkit-transform: rotate(0deg); transform: rotate(0deg);}
    100% { -webkit-transform: rotate(360deg); transform: rotate(360deg);}
`;

const ParaOne = styled.p`
  color: white;
  font-family: 'Kaushan Script', cursive;
  font-size: 32px;
`;
const TextWrapper = styled.div`
  width: 60%;
  margin-left: auto;
  margin-right: 0;
`;

const upDown = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-50px) rotate(-5deg); }
  100% { transform: translateY(0); }


`

const Bird = styled.img`
  animation: 2s ${upDown} infinite;
`

const Test = () => {
  return (
    <div>
      <ParallaxTwo>
      <SectionOne>
          <TextWrapper>
            <ParaOne>
              {' '}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </ParaOne>
          </TextWrapper>
        </SectionOne>
      </ParallaxTwo>
      <ParallaxTwo>
        <Static>
          <SectionTwo>
            {/* <img src="images/gull-bird-flying-shape.png" /> */}
            <Sun>
                <RayBox>
                    <Ray1 class="ray ray1"></Ray1>
                    <Ray2 class="ray ray2"></Ray2>
                    <Ray3 class="ray ray3"></Ray3>
                    <Ray4 class="ray ray4"></Ray4>
                    <Ray5 class="ray ray5"></Ray5>
                    <Ray6 class="ray ray6"></Ray6>
                    <Ray7 class="ray ray7"></Ray7>
                    <Ray8 class="ray ray8"></Ray8>
                    <Ray9 class="ray ray9"></Ray9>
                    <Ray10 class="ray ray10"></Ray10>
                </RayBox>
            </Sun>
          </SectionTwo>
          {/* <SectionTwo>
              </SectionTwo> */}
        </Static>
      </ParallaxTwo>
      <ParallaxTwo>
        <TextWrapper>
          <ParaOne>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </ParaOne>
        </TextWrapper>
        <SectionThree />
      </ParallaxTwo>


      <Parallax>
        <SectionOne>
          <TextWrapper>
            <ParaOne>
              {' '}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </ParaOne>
          </TextWrapper>
        </SectionOne>
      </Parallax>
      <Parallax>
        <Static>
          <SectionTwo>
            <Bird src="images/gull-bird-flying-shape.png" />
            {/* <Sun>
                <RayBox>
                    <Ray1 class="ray ray1"></Ray1>
                    <Ray2 class="ray ray2"></Ray2>
                    <Ray3 class="ray ray3"></Ray3>
                    <Ray4 class="ray ray4"></Ray4>
                    <Ray5 class="ray ray5"></Ray5>
                    <Ray6 class="ray ray6"></Ray6>
                    <Ray7 class="ray ray7"></Ray7>
                    <Ray8 class="ray ray8"></Ray8>
                    <Ray9 class="ray ray9"></Ray9>
                    <Ray10 class="ray ray10"></Ray10>
                </RayBox>
            </Sun> */}
          </SectionTwo>
          {/* <SectionTwo>
              </SectionTwo> */}
        </Static>
      </Parallax>
      <Parallax>
        <TextWrapper>
          <ParaOne>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </ParaOne>
        </TextWrapper>
        <SectionThree />
      </Parallax>
      {/* <ParallaxFour>
          <SectionFour />
        </ParallaxFour> */}
      {/* <Parallax>
          <SectionThree />
        </Parallax> */}
    </div>
  );
};

export default Test;
