import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import BlackLogo from '../assets/images/Logo-black.png';
import WhiteLogo from '../assets/images/white-logo.png';
import RightArrow from '../assets/images/right-arrow.png';
import GuideImg from '../assets/images/guide.png';
import MenuIcon from '../assets/images/menu.png';
import CloseIcon from '../assets/images/close.png';
import { CategoriesApi, HighlightsApi } from '@/HttpRequest/Apis';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

const navbarLinks = [
  { title: 'Home' },
  { title: 'Surfing' },
  { title: 'Hula' },
  { title: 'Vulcano' },
];

interface stateType {
  openMenu: boolean;
  highLightLoading: boolean;
  activitiesLoading: boolean;
  hightLightsData: Array<any>;
  categoriesData: any;
  showDropDown: boolean;
}

const initialState = {
  openMenu: false,
  highLightLoading: true,
  activitiesLoading: true,
  hightLightsData: [],
  categoriesData: '',
  showDropDown: false,
};

const Home = () => {
  const [
    {
      highLightLoading,
      hightLightsData,
      activitiesLoading,
      categoriesData,
      openMenu,
      showDropDown,
    },
    setState,
  ] = useState<stateType>(initialState);

  const highLightsApiRes = (res: []): void => {
    setState(prevData => ({
      ...prevData,
      hightLightsData: res,
      highLightLoading: false,
    }));
  };

  const categoriesApiRes = (res: []): void => {
    setState(prevData => ({
      ...prevData,
      categoriesData: res,
      activitiesLoading: false,
    }));
  };

  useEffect(() => {
    HighlightsApi(highLightsApiRes);
    CategoriesApi(categoriesApiRes);
  }, []);

  return (
    <SkeletonTheme baseColor="#eee" highlightColor="#ccc">
      <div>
        {/* NAVBAR START */}
        <div className="fixed 300px:top-0 500px:top-[20px] left-[50%] -translate-x-[50%] w-screen">
          <div className="px-2 wrapper">
            <div className="hidden md:flex items-center justify-between rounded-lg bg-white px-6 py-3.5">
              <div className="flex items-center">
                <Image src={BlackLogo} alt="banner" />
                <div className="hidden 500px:flex items-center font-normal text-[16px] ml-10 leading-[30px] -mb-[3px] ">
                  {navbarLinks.map(({ title }) => (
                    <div className="px-6 py-1">{title}</div>
                  ))}
                </div>
              </div>
              <Button type="primary" classNames="">
                Book a trip
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white md:hidden py-3.5 px-3 sticky top-0 w-screen flex justify-between items-center">
          <Image src={BlackLogo} alt="banner" />
          <div
            onClick={() => {
              setState(prevData => ({ ...prevData, openMenu: !openMenu }));
            }}
          >
            {openMenu ? (
              <Image
                src={MenuIcon}
                alt="menuIcon"
                className=" animate-TopToBottom"
              />
            ) : (
              <Image
                src={CloseIcon}
                alt="closeIcon"
                className="z-50 animate-TopToBottom"
              />
            )}
          </div>
        </div>
        <div
          className={`bg-white h-full flex top-0 flex-col md:hidden w-[95vw] right-0 fixed z-50 ${
            !openMenu ? '' : 'hidden'
          }`}
        >
          <div
            onClick={() => {
              setState(prevData => ({ ...prevData, openMenu: !openMenu }));
            }}
            className="flex justify-end p-[30px]"
          >
            <Image
              src={CloseIcon}
              alt="closeIcon"
              className="z-50 animate-TopToBottom"
            />
          </div>
          <div className="p-6">
            {navbarLinks.map(({ title }) => (
              <div className="px-6 py-4 text-[20px] font-normal">{title}</div>
            ))}
          </div>
          <div className="p-6 ml-5 w-fit ">
            <Button type="primary" classNames="min-w-[169px]">
              Book a trip
            </Button>
          </div>
        </div>
        {/* NAVBAR END */}

        {/* BANNER START */}
        <div
          className={`banner h-[70vh] bg-black w-full flex justify-center items-center `}
        >
          <h1 className="text-white 300px:text-[64px] sm:text-[140px] sm:leading-[132px] 300px:leading-[62px] text-center font-semibold backgroundBlend">
            Welcome
            <br /> to Hawaii
          </h1>
        </div>
        {/* BANNER END */}

        {/* CARDS START */}
        <div className="wrapper sm:py-12 300px:p-4 md:p-3">
          <p className="text-[16px] font-bold py-5">Highlights</p>
          <div className="flex justify-between py-5 overflow-x-auto md:overscroll-none 300px:gap-4 500px:gap-0 500px:flex-wrap">
            {highLightLoading
              ? [...Array(3)].map(() => <Skeleton width={350} height={358} />)
              : hightLightsData?.map((item: any) => (
                  <Link
                    href={`/cardDetails?category=${item.title}`}
                    className=" rounded-b-lg w-[350px] min-w-[350px] boxShadow"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="h-[170px] rounded-t-md"
                    />
                    <div className="flex flex-col px-3 py-4">
                      <h1 className="text-[#008080] font-bold text-[24px]">
                        {item.title}
                      </h1>
                      <p className=" h-[40px] text-[16px] font-normal pt-2">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex justify-end my-5">
                      <div className="w-[40px] h-[40px] rounded-full bg-[#E6F2F2] mr-5 flex justify-center items-center">
                        <Image src={RightArrow} alt="" />
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
        {/* CARDS END */}

        {/* CATEGORIES START */}
        <div className="bg-[#E6F2F2] 300px:p-4 md:p-3">
          <div className="wrapper py-8 flex lg:flex-row 300px:flex-col gap-[30px]">
            <div>
              <h1 className="py-2 text-[16px] font-bold">Categories</h1>
              <div className="md:w-[544px] ">
                {activitiesLoading
                  ? [...Array(5)].map(() => (
                      <Skeleton width={544} height={40} />
                    ))
                  : categoriesData.map((item: any) => (
                      <>
                        <div
                          onClick={() => {
                            setState(prevData => ({
                              ...prevData,
                              showDropDown:
                                showDropDown === item.name ? '' : item.name,
                            }));
                          }}
                          className="flex items-center justify-between gap-1 px-4 py-4 my-3 bg-white rounded-lg cursor-pointer"
                        >
                          <p className="text-[16px] font-normal">{item.name}</p>
                          <div className="relative">
                            <Image
                              src={RightArrow}
                              alt=""
                              className={`${
                                showDropDown === item.name && 'rotate-45'
                              }`}
                            />
                          </div>
                        </div>
                        {showDropDown === item.name &&
                          categoriesData.activities.map((item: any) => (
                            <div className="bg-white p-4 rounded-lg">
                              {item.title}
                            </div>
                          ))}
                      </>
                    ))}
              </div>
            </div>
            <div>
              <h1 className="py-2 text-[16px] font-bold">Travel Guide</h1>
              <div className="bg-white p-5 300px:min-w-[320px] xl:min-w-[560px] rounded-lg mt-3">
                <div className="flex justify-between">
                  <div className="flex flex-col justify-between">
                    <div className="300px:mb-5 sm:mb-0">
                      <h1 className="text-[24px] font-bold">Hadwin Malone</h1>
                      <p className="text-[16px] font-normal">
                        Guide since 2012
                      </p>
                    </div>
                    <div>
                      <Button type="secondary" classNames="">
                        Contact
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Image
                      src={GuideImg}
                      alt="guide"
                      className="min-w-[74px] min-h-[74px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* CATEGORIES END */}

        {/* FOOTER START */}
        <div className="bg-black 300px:p-4 sm:p-0">
          <div className="py-6 text-white wrapper">
            <Image src={WhiteLogo} alt="footer" />
          </div>
        </div>
        {/* FOOTER END */}
      </div>
    </SkeletonTheme>
  );
};

export default Home;
