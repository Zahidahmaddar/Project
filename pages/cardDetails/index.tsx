import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import BackArrow from '../../assets/images/back.png';
import { ActivitiesApi } from '@/HttpRequest/Apis';
import { SkeletonTheme } from 'react-loading-skeleton';

interface stateType {
  cardDetails: {
    name: string;
    image: string;
    description: string;
    activities: Array<any>;
  };
}

const initialState = {
  cardDetails: {
    name: '',
    image: '',
    description: '',
    activities: [],
  },
};

const cardDetails = () => {
  const router = useRouter();
  const { category } = router.query;

  const [{ cardDetails }, setState] = useState<stateType>(initialState);

  const ActivitiesApiRes = (res: any): void => {
    setState(prevData => ({
      ...prevData,
      cardDetails: res,
    }));
  };

  console.log('????', cardDetails);

  useEffect(() => {
    ActivitiesApi(ActivitiesApiRes, category);
  }, []);

  return (
    <SkeletonTheme baseColor="#eee" highlightColor="#ccc">
      <div>
        <div className="pt-20 wrapper">
          <div className="300px:p-4 xl:p-0">
            <div className="flex flex-col">
              <Link href="/">
                <Image
                  src={BackArrow}
                  alt="back-arrow"
                  className="w-[20px] h-[20px] mr-8"
                />
              </Link>
            </div>
            <div className="my-6">
              <>
                {/* {cardDetails.image && (
                  <Image
                    src={cardDetails.image}
                    alt=""
                    className="w-full rounded-lg"
                    width={100}
                    height={200}
                  />
                )} */}
                <h1 className="text-[29px] font-bold">{cardDetails.name}</h1>
                <p className="py-6 text-[16px] font-normal">
                  {cardDetails.description}
                </p>
              </>
            </div>
          </div>
        </div>
        <div className="bg-[#E6F2F2] py-4">
          <div className="wrapper 300px:p-4 md:p-0">
            <h1 className="text-[16px] font-bold py-5">Activities</h1>
            <div className="flex flex-col">
              {cardDetails.activities?.map((item: any) => (
                <div className="flex items-center gap-1 px-4 py-4 my-3 bg-white rounded-lg cursor-pointer w-[500px]">
                  <p className="text-[16px] font-normal">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default cardDetails;
