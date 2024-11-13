import { Header4, Header5 } from '@/components/Text';
import React from 'react'

function SummaryBlocks() {
  return (
    <div>
      <div className=" ">
        {" "}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
          <div className=" col-span-1 ">
            {" "}
            <div className=" w-full bg-white rounded-lg p-6 border-b-4 border-secondary">
              {" "}
              <Header5 className=" ">Total Revenue </Header5>{" "}
              <Header4 className="text-black ">$45,000</Header4>
            </div>
          </div>
          <div className=" hidden sm:block col-span-1">
            <div className=" w-full bg-white rounded-lg p-6 border-b-4 border-secondary">
              {" "}
              <Header5 className=" ">Total Products Sold </Header5>{" "}
              <Header4 className="text-black ">560</Header4>
            </div>
          </div>
          <div className=" hidden sm:block col-span-1">
            <div className=" w-full bg-white rounded-lg p-6 border-b-4 border-secondary">
              {" "}
              <Header5 className=" ">Available Product </Header5>{" "}
              <Header4 className="text-black ">56</Header4>
            </div>
          </div>
          <div className=" col-span-1">
            <div className=" w-full bg-white rounded-lg p-6 border-b-4 border-secondary">
              {" "}
              <Header5 className=" ">Pending Order </Header5>{" "}
              <Header4 className="text-black ">56</Header4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryBlocks