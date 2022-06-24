import Head from "next/head";
import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';
import {
  Navigation,
  Switcher,
  RenderVideo,
  SwiperButtonPrev,
  SwiperButtonNext,
} from '../../components/Common';
import { haveYourSpotData as data } from '../../data/onboarding';

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  instagram: yup.string().url().required(),
  website: yup.string().url().required(),
  preview: yup.string().url().required(),
  about: yup.string().required(),
  acceptTOS: yup.bool().oneOf([true], 'Accept terms of service is required')
}).required();

export default function Onboarding() {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [hasBeenSent, setHasBeenSent] = useState(false);
  const [section, setSection] = useState(false);
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const action = 'Have your spot in our district';
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then((res) => {
      // console.log("Response received");
      if (res.status === 200) {
        // console.log("Response succeeded!");
        setSwiperIndex(2);
        hasBeenSent(true);
      }
    });
  }

  return (
    <div>
      <Head>
        <title>BeatBlox - Onboarding</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <section className="section-video d-flex align-items-center">
        { !isMobile && ( <RenderVideo video={ data.video }/> )}
        <div className="container d-flex align-items-center py-5">
          <div className="d-flex flex-column">
            <div className="row mb-5 d-block d-md-none">
              { isMobile && ( <RenderVideo video={ data.video_mobile }/> )}
            </div>
            <Switcher theme="white"/>
            <div className="row px-5 px-md-0 mt-0 mt-md-5">
              <div className="col-12 col-md-8">
                <h1>{data.title}</h1>
                <h3 className="text-uppercase">{data.subtitle}</h3>
                <h4 className="mt-5">{data.description}</h4>
                <Link href="#benefits">
                  <button className="btn btn-outline-light rounded-pill mt-5">
                    <h4 className="m-0 p-1">Explore the Benefits</h4>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="benefits" className="section-video bg-white pt-md-5">
        <div className="container not-fullscreen py-5 mt-5">
          <Switcher theme="black"/>
          <div className="row pb-5 my-5 px-5 px-md-0">
            <div className="col-12 col-md-5 pt-3 text-black py-5 mb-5">
              <button className="btn btn-dark rounded-pill mb-5">
                <h4 className="m-0 p-1">BENEFITS</h4>
              </button>
              { data.benefits.map((benefit, index) => {
                return (
                  <p key={index}>{benefit}</p>
                );
              })}
            </div>
            <div className="col-12 col-md-6 offset-md-1 pt-3">
              <img
                className="img-fluid"
                src={data.image}
              ></img>
              <Link href="#be-part">
                <button className="btn btn-dark rounded-pill mt-5">
                  <h4 className="m-0 p-1">Be part now</h4>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="be-part" className="section-video mb-5">
        <video
          autoPlay={true}
          controls={false}
          loop
          muted
          src="/videos/onboarding-form.mp4"
          type="video/mp4"
          playsInline
          className="d-none d-md-block"
        ></video>
        <div className="container not-fullscreen py-5">
          <Switcher theme="white"/>
          <div className="row px-5 px-md-0 py-5">
            <div className="col-12 col-md-6 col-lg-4 pt-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  className="swiper-form"
                  onSlideChange={(swiper) => setSwiperIndex(swiper.activeIndex)}
                >
                  <div className="d-flex justify-content-end">
                    { swiperIndex === 1 && ( <SwiperButtonPrev>Back</SwiperButtonPrev> )}
                    { swiperIndex === 0 && ( <SwiperButtonNext>Continue</SwiperButtonNext> )}
                    { swiperIndex === 1 && ( <input className="btn btn-lg btn-light mt-3 rounded-pill" type="submit" /> )}
                  </div>
                  { hasBeenSent && (
                    <React.Fragment>
                      <h4>Your On-Boarding request has been sent</h4>
                      <p className="text-muted">Our team will be contacting you soon.</p>
                    </React.Fragment>
                  )}
                  { !hasBeenSent && (
                    <>
                      <SwiperSlide>
                        { data.fields.map((item, index) => {
                          return (
                            <div key={index} className="w-100 mb-3">
                              <h4>{item.label} <small className="text-muted">{item.description || ''}</small></h4>
                              <input className="form-control rounded-0 mb-1" {...register(`${item.name}`)} /> 
                              <small className="text-danger">{errors[item.name]?.message }</small>
                            </div> 
                          );
                        })}
                      </SwiperSlide>
                      <SwiperSlide>
                        { data.fields_extra?.map((item, index) => {
                          return (
                            <div key={index} className="w-100 mb-3">
                              <h4>{item.label} <small className="text-muted">{item.description || ''}</small></h4>
                              <textarea rows="5" className="form-control rounded-0 mb-1" {...register(`${item.name}`)} /> 
                              <small className="text-danger">{errors[item.name]?.message }</small>
                            </div> 
                          );
                        })}
                        <div className="form-check form-switch w-100">
                          <input name="acceptTOS" className="form-check-input" type="checkbox" {...register('acceptTOS')}/>
                          <label htmlFor="acceptTOS" className="form-check-label">Accept Terms and Conditions</label>
                          <br/>
                          <small className="text-danger">{errors.acceptTOS?.message }</small>
                        </div>                        
                      </SwiperSlide>
                    </>
                  )}
                </Swiper>
              </form>
            </div>
            <div className="col-12 col-md-6 col-lg-4 offset-lg-2 pt-3 d-none d-lg-block">
              <div className={ `step-` + swiperIndex + ` d-flex align-items-center justify-content-center form-mask d-flex justify-content-center align-items-cente`}>
                <img src="/images/onboarding/onboarding-form.jpg"></img>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-black py-5"></div>
    </div>
  );
}
