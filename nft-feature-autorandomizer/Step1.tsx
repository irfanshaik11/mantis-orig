import {
    ChangeEvent,
  LegacyRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import {FiCamera} from 'react-icons/fi';

import {StepProps} from './types';
import assert from "assert";

const Step1: React.FC<StepProps> = (props: StepProps) => {
  const [cont, setCont] = useState(false);

  const [coverPhoto, setCoverPhoto] = useState('');
  const [collectionHeader, setCollectionHeader] = useState('');
  const collectionTitleRef: LegacyRef<HTMLInputElement> = useRef(null);
  const collectionDescRef: LegacyRef<HTMLInputElement> = useRef(null);
  const nftPriceRef: LegacyRef<HTMLInputElement> = useRef(null);
  const collectionSizeRef: LegacyRef<HTMLInputElement> = useRef(null);
  const tokenStandardRef: MutableRefObject<HTMLSelectElement> = useRef() as MutableRefObject<HTMLSelectElement>;

  const handleImage = (event: ChangeEvent<HTMLInputElement>, imageFor: string) => {
    assert(event.target.files != null);
    assert(collectionTitleRef.current != null);
    assert(collectionDescRef.current != null);
    assert(nftPriceRef.current != null);
    assert(nftPriceRef.current != null);


    const isCover = imageFor === 'cover';

    if (event.target.files.length > 0) {
      const src = URL.createObjectURL(event.target.files[0]);

      if (isCover) {
        setCoverPhoto('');
        setCoverPhoto(src);
      } else {
        setCollectionHeader('');
        setCollectionHeader(src);
      }
    }

    isContinuable()
  }

  const continueToNextStep = () => {
    assert(collectionTitleRef.current != null);
    assert(collectionTitleRef.current != null);
    assert(collectionDescRef.current != null);
    assert(nftPriceRef.current != null);
    assert(nftPriceRef.current != null);

    const tempCollectionInfo = {
      coverPhoto: coverPhoto,
      collectionHeader: collectionHeader,
      title: collectionTitleRef.current.value,
      description: collectionDescRef.current.value,
      price: nftPriceRef.current.value,
      collectionSize: nftPriceRef.current.value,
      tokenStandard: tokenStandardRef.current.value,
    }

    localStorage.setItem('step1', JSON.stringify(tempCollectionInfo));
    props.incrementFunc();
  }

  const isContinuable = () => {
    assert(collectionTitleRef.current != null);
    assert(nftPriceRef.current != null);
    assert(collectionSizeRef.current != null);

    if (
      !collectionTitleRef.current.value ||
      !nftPriceRef.current.value ||
      !collectionSizeRef.current.value
    ) {
      setCont(false);
    } else {
      setCont(true);
    }
  }

  useEffect(() => {
    localStorage.removeItem('step1');
    localStorage.removeItem('step2')
    localStorage.removeItem('step3')
  }, [])

  return (
    <div className="text-white flex flex-col px-12 py-8 w-5/6">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-col">
          <div className="text-3xl font-bold">
            Collection Information
          </div>
          <div className="mt-2 text-base text-neutral-600">
            Please enter relevant information about the collection.
          </div>
        </div>

        <div className="gap-6 flex flex-row justify-center">
          <div className="mt-2 text-base text-neutral-600">
            Step 1 of 4
          </div>
          {cont ? (
            <div onClick={() => continueToNextStep()} className="ease-in-out duration-100 border-2 hover:bg-neutral-900 hover:cursor-pointer hover:text-white text-neutral-900 border-emerald-500 bg-emerald-500 px-2 py-1.5 rounded-3xl text-base font-bold">
              Continue
            </div>
          ) : (
            <div className="ease-in-out duration-100 border-2 text-neutral-900 border-neutral-700 bg-neutral-700 px-2 py-1.5 rounded-3xl text-base font-bold">
              Continue
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-row w-full">
        <div className="w-3/5 flex flex-col gap-4">
          <div className="flex flex-row gap-16">
            <div className="flex flex-col">
              <div className="text-sm">
                <input id={'coverID'} onChange={(e) => handleImage(e, 'cover')} type="file" className="hidden" />
                Cover Photo (500x500)
              </div>
              <div className="flex flex-row gap-8 m-2">
                <div className="bg-neutral-900 w-20 h-20 ">
                  {coverPhoto ? (
                    <div className="w-full h-full object-cover">
                      <img
                        className="h-full w-full object-cover"
                        src={coverPhoto}
                        alt="Collection cover photo."
                      />
                    </div>
                  ) : <FiCamera className="m-8" />}
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <label htmlFor={'coverID'} className="p-1 hover:cursor-pointer bg-black hover:border-neutral-300 hover:bg-neutral-800 border rounded-sm border-neutral-600">Upload</label>
                  <label onClick={() => setCoverPhoto('')} className="p-1 bg-black hover:border-red-300 hover:text-red-100 hover:cursor-pointer hover:bg-red-600 border rounded-sm border-neutral-600 text-neutral-500">Remove</label>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="text-sm">
                <input id={'collectionID'} onChange={(e) => handleImage(e, 'header')} type="file" className="hidden" />
                Collection Header (1400x400)
              </div>
              <div className="flex flex-row gap-8 m-2">
                <div className="bg-neutral-900 ">
                  {collectionHeader ? (
                    <div className="">
                      <img
                        className="w-36 h-20 object-cover"
                        src={collectionHeader}
                        alt="Collection header photo."
                      />
                    </div>
                  ) : <FiCamera className="m-8 mx-16" />}
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <label htmlFor={'collectionID'} className="p-1 bg-black hover:border-neutral-300 hover:cursor-pointer hover:bg-neutral-800 border rounded-sm border-neutral-600">Upload</label>
                  <label onClick={() => setCollectionHeader('')} className="p-1 bg-black hover:cursor-pointer hover:border-red-300 hover:text-red-100 hover:bg-red-600 border rounded-sm border-neutral-600 text-neutral-500">Remove</label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 ">
            <label className="text-neutral-400 text-sm">Collection Title*</label>
            <input onChange={() => isContinuable()} ref={collectionTitleRef} placeholder='Title' className="text-base p-2 pl-4 rounded-xl bg-neutral-900 focus:bg-neutral-800 duration-150 ease-in border-none outline-none focus:outline-none" type="text" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-neutral-400 text-sm">Collection Description</label>
            <input onChange={() => isContinuable()} ref={collectionDescRef} placeholder='Description' className="text-base pb-16 h-24 p-2 pl-4 rounded-xl bg-neutral-900 focus:bg-neutral-800 duration-150 ease-in border-none outline-none focus:outline-none" type="text" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-neutral-400 text-sm">Mint Price*</label>
            <input onChange={() => isContinuable()} ref={nftPriceRef} placeholder="0 ETH" className="text-base p-2 pl-4 rounded-xl bg-neutral-900 focus:bg-neutral-800 duration-150 ease-in border-none outline-none focus:outline-none" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-neutral-400 text-sm">Collection Size*</label>
            <input onChange={() => isContinuable()} ref={collectionSizeRef} placeholder='Number of NFTs in collection' className="text-base p-2 pl-4 rounded-xl bg-neutral-900 focus:bg-neutral-800 duration-150 outline-none ease-in border-none focus:outline-none" type="text" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-neutral-400 text-sm">Token Standard</label>
            <div className="text-base rounded-xl bg-neutral-900 focus:bg-neutral-800 duration-150 ease-in border-none outline-none focus:outline-none">
              <select onChange={() => isContinuable()} ref={tokenStandardRef} className="text-base w-[680px] hover:cursor-pointer p-2 pl-4 rounded-xl bg-neutral-900 focus:bg-neutral-900 duration-150 ease-in border-none outline-none focus:outline-none">
                <option value="ERC-721" >
                  ERC-721
                </option>
                <option value="ERC-20">
                  ERC-1155
                </option>
              </select>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Step1;
