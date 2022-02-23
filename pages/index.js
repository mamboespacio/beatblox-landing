import Head from 'next/head'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navigation from '../components/Navigation';
import About from '../components/About';
import Features from '../components/Features';
import Roadmap from '../components/Roadmap';
import Contact from '../components/Contact';
import Benefits from '../components/Benefits';
import Team from '../components/Team';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Mousewheel, EffectFade, Controller } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import 'swiper/css/effect-fade';

export default function Home () {
  
  const [controlledSwiper, setControlledSwiper] = useState(null);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation/>
      <Swiper
        modules={[Pagination, A11y, Mousewheel, Controller]}
        spaceBetween={0}
        slidesPerView={1}
        direction={"vertical"}
        mousewheel={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        className="main-swiper"
        controller={{ control: controlledSwiper }}
        speed={800}
      >
        <SwiperSlide><About/></SwiperSlide>
        <SwiperSlide><Features/></SwiperSlide>
        <SwiperSlide><Roadmap/></SwiperSlide>
        <SwiperSlide><Benefits/></SwiperSlide>
        <SwiperSlide><Contact/></SwiperSlide>
        <SwiperSlide><Team/></SwiperSlide>
      </Swiper>

      <Swiper
        spaceBetween={0}
        effect={"fade"}
        modules={[EffectFade, Controller]}
        className="video-swiper"
        onSwiper={setControlledSwiper}
      >
        <SwiperSlide>
          <video
            autoPlay={true}
            controls={false}
            loop
            muted
            width="100%"
            height="auto"
            src="/videos/about.mp4"
            type="video/mp4">
          </video>
        </SwiperSlide>
        <SwiperSlide>
          <video
            autoPlay={true}
            controls={false}
            loop
            muted
            width="100%"
            height="auto"
            src="/videos/features.mp4"
            type="video/mp4">
          </video>
        </SwiperSlide>
        <SwiperSlide>
          <video
            autoPlay={true}
            controls={false}
            loop
            muted
            width="100%"
            height="auto"
            src="/videos/roadmap.mp4"
            type="video/mp4">
          </video>
        </SwiperSlide>
        <SwiperSlide>
          <video
            autoPlay={true}
            controls={false}
            loop
            muted
            width="100%"
            height="auto"
            src="/videos/auction-house.mp4"
            type="video/mp4">
          </video>
        </SwiperSlide>
        <SwiperSlide>
          <video
            autoPlay={true}
            controls={false}
            loop
            muted
            width="100%"
            height="auto"
            src="/videos/contact.mp4"
            type="video/mp4">
          </video>
        </SwiperSlide>
        <SwiperSlide>
          <video
            autoPlay={true}
            controls={false}
            loop
            muted
            width="100%"
            height="auto"
            src="/videos/auction-house.mp4"
            type="video/mp4">
          </video>
        </SwiperSlide>
      </Swiper>
      <div className="bottomNav py-3">
        <div className='container d-flex justify-content-between py-5'>
          <button className="btn btn-outline-light rounded-pill">Video</button>
          <button className="btn btn-outline-light rounded-pill">Discord</button>
        </div>
      </div>

      <footer/>
    </div>
  )
}