import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import WhiteLogo from '../assets/images/white-logo.png';
import RightArrow from '../assets/images/right-arrow.png';
import GuideImg from '../assets/images/guide.png';
import { CategoriesApi, HighlightsApi } from '@/HttpRequest/Apis';
import Navbar from '@/components/Navbar/Navbar';

interface StateType {
  hightLightLoading: boolean;
  hightLightList: any[];

  categoriesLoading: boolean;
  categoriesList: any[];
  selectedCategory: {
    name: string;
    activities: {
      title: string;
    }[];
  };
}

const initialState = {
  hightLightLoading: true,
  hightLightList: [],

  categoriesLoading: true,
  categoriesList: [],
  selectedCategory: {
    name: '',
    activities: [],
  },
};

const Home = () => {
  const [
    {
      hightLightLoading,
      hightLightList,

      categoriesLoading,
      categoriesList,
      selectedCategory,
    },
    setState,
  ] = useState<StateType>(initialState);

  const responseOne = (res: []): void => {
    setState(prevData => ({
      ...prevData,
      hightLightList: res,
      hightLightLoading: false,
    }));
  };

  const responseTwo = (res: []): void => {
    setState(prevData => ({
      ...prevData,
      categoriesList: res,
      categoriesLoading: false,
    }));
  };

  useEffect(() => {
    HighlightsApi(responseOne);
    CategoriesApi(responseTwo);
  }, []);

  return (
    <SkeletonTheme baseColor="#eee" highlightColor="#ccc">
      <div>
        {/* BANNER START */}
        <div
          className={`banner h-[70vh] bg-black w-full flex justify-center items-center `}
        >
          <Navbar />
          <h1
            className="
              text-white text-center font-semibold backgroundBlend
                300px:text-[64px] 300px:leading-[62px]
                sm:text-[140px] sm:leading-[132px]"
          >
            Welcome
            <br />
            to Hawaii
          </h1>
        </div>
        {/* BANNER END */}

        {/* CARDS START */}
        <div className="wrapper sm:py-12 300px:p-4 md:p-3">
          <p className="text-[16px] font-bold py-5 ">Highlights</p>
          <div className="flex justify-between overflow-x-auto ">
            {hightLightLoading
              ? [...Array(3)].map((_, index) => (
                  <Skeleton key={index} width={350} height={350} />
                ))
              : hightLightList.map((item: any, index: number) => (
                  <Link
                    key={index}
                    href={`/card-details?category=${item.title}`}
                    className=" rounded-b-lg w-[350px] min-w-[350px] h-[350px] boxShadow mb-5 mx-2"
                  >
                    <Image
                      src={item.image}
                      className="w-full rounded-t-md"
                      width={350}
                      height={350}
                      alt=""
                    />
                    <div className="flex flex-col px-3 py-4">
                      <h1 className="text-[#008080] font-bold text-[24px]">
                        {item.title}
                      </h1>
                      <p className="h-[40px] text-[16px] font-normal pt-2">
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
                {categoriesLoading
                  ? [...Array(5)].map((_, index) => (
                      <Skeleton key={index} width="100%" height={40} />
                    ))
                  : categoriesList.map((item: any) => (
                      <>
                        <div
                          onClick={() => {
                            setState(prevData => ({
                              ...prevData,
                              selectedCategory:
                                selectedCategory.name === item.name ? '' : item,
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
                                selectedCategory.name === item.name &&
                                'rotate-90'
                              }`}
                            />
                          </div>
                        </div>
                        {selectedCategory.name === item.name &&
                          selectedCategory?.activities.map(
                            (item: any, index) => (
                              <div
                                className="p-4 bg-white font-bold"
                                key={index}
                              >
                                {item.title}
                              </div>
                            ),
                          )}
                      </>
                    ))}
              </div>
            </div>

            {/* TRAVEL GUIDE START */}
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
                      width={128}
                      height={128}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* TRAVEL GUIDE END */}
          </div>
        </div>
        {/* CATEGORIES END */}

        {/* FOOTER START */}
        <div className="bg-black">
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
