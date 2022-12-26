import Image from 'next/image';
import { useState } from 'react';
import {
  FiChevronDown,
  FiChevronLeft,
  FiPlus,
} from 'react-icons/fi';

import { StepProps } from '../../src/types';

interface NftItemProps {
  url: string;
  title: string;
  price: number;
  description: string;
  property: string;
}

interface TraitProps {
  traits: Array<string>;
}

const Step4: React.FC<StepProps> = (props: StepProps) => {
  const [nftNum] = useState(1);
  const [filters, setFilters] = useState(1);
  const [data] = useState([]);

  const CreateNewFilter: React.FC = () => {
    return (
      <div onClick={() => setFilters(state => state + 1)} className="flex flex-row hover:cursor-pointer justify-between bg-neutral-900 text-neutral-300 rounded my-2 p-2 duration-150 ease-out focus:outline-none border-neutral-700 border text-xs">
        <div>
          Property
        </div>
        <FiPlus size={18} />
      </div>
    )
  }

  const FilterDropdown: React.FC<TraitProps> = (props: TraitProps) => {
    const [selected, setSelected] = useState('None');
    const [dropdownVisible, setDropdownVisible] = useState(false);

    return (
      <div>
        <div onClick={() => setDropdownVisible(state => !state)} className="flex flex-row hover:cursor-pointer justify-between bg-neutral-900 text-neutral-300 rounded my-2 p-2 duration-150 ease-out focus:outline-none border-neutral-700 border text-xs">
          <div>
            {selected}
          </div>
          <FiChevronDown size={18} />
        </div>
        {dropdownVisible && props.traits.map(label => (
          <div key={label} className="form-check-input flex flex-row text-white gap-4 px-4 text-neutral-600 text-sm">
            <input onChange={() => setSelected(label)} type="checkbox" className="bg-green-400 text-white p-2 rounded-full" />
            {label}
          </div>
        ))}
      </div>
    )
  }

  const FilterComponent: React.FC<TraitProps> = (props: TraitProps) => {
    return (
      <div>
        {[...Array(filters)].map(filter => (
          <FilterDropdown
            key={filter}
            traits={props.traits}
          />
        ))}

        <CreateNewFilter />
      </div>
    )
  }

  const NftItem: React.FC<NftItemProps> = (props: NftItemProps) => {
    const [hover, setHover] = useState(false);

    return (
      <div>
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="p-1 w-40 bg-neutral-900 border-2 border-black hover:border-emerald-800 rounded-xl">
          <Image src={props.url} className="rounded-xl h-40 w-auto object-cover" alt={props.url[0]} width="100" height="100" />
          <div className="p-2 font-bold">
            {props.title}
          </div>
        </div>
        {hover &&
          <div className="p-2 -mt-56 ml-40 absolute bg-neutral-900 border border-black border-emerald-800 rounded-xl text-sm text-gray-500 flex flex-col">
            {props.description}
            <div className="text-emerald-300">{props.price} ETH</div>
            <div className="flex flex-row">
              Property: {props.property}
            </div>
          </div>
        }
      </div>
    )
  }

  return (
    <div className="text-white flex flex-col px-12 py-8 w-5/6">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-col">
          <div className="text-3xl font-bold">
            Review your collection
          </div>
          <div className="mt-2 text-base text-neutral-600">
            Review the details below before publishing the collection
          </div>
        </div>

        <div className="gap-6 flex flex-row justify-center items-center">
          <FiChevronLeft onClick={() => props.decrementFunc()} className="-mr-4 hover:cursor-pointer hover:text-neutral-200 duration-100 ease-out text-neutral-600" size={18} />
          <div className="text-base text-neutral-600">
            Step 4 of 4
          </div>
          <div onClick={() => props.incrementFunc()} className="ease-in-out duration-100 border-2 hover:bg-neutral-900 hover:cursor-pointer hover:text-white text-neutral-900 border-emerald-500 bg-emerald-500 px-2 py-1.5 rounded-3xl text-base font-bold">
            Publish
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col w-full">
        <div className="bg-neutral-900 hover:bg-neutral-800 w-2/4 rounded-xl p-2">
          <div className="text-2xl font-bold text-neutral-400">
            Collection Information:
          </div>
          <div className="">
            <label className="text-neutral-400">Title:</label> PixelSweeper
          </div>
          <div className="">
            <label className="text-neutral-400">Total NFTs:</label> {nftNum}
          </div>
          <div className="">
            <label className="text-neutral-400">Total Properties:</label>
          </div>
          <div className="">
            <label className="text-neutral-400">Floor Price:</label> 0.99 ETH
          </div>
        </div>

        <div className="flex flex-row w-full gap-12 mt-4">
          <div className="mb-2 w-1/4 font-bold text-neutral-500">
            FILTERS

            <FilterComponent
              traits={['Blue', 'Green', 'Red']}
            />
          </div>

          <div className="flex flex-row flex-wrap w-3/4 gap-2">
            {data[0] &&
              (
                <div>
                  {[0, 1, 2, 3, 4, 5].map(idx => (<NftItem
                    key={idx}
                    url={data[0].coverPhoto}
                    title={data[0].title}
                    price={data[0].price}
                    description={data[0].description}
                    property={data[1][0].traits[0].name}
                  />
                  ))}
                </div>
              )
            }

          </div>
        </div>

      </div>
    </div>
  )
}

export default Step4;
