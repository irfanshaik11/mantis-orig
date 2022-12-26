import Image from 'next/image';
import Link from 'next/link';
import {
    ChangeEvent,
  useEffect,
  useState,
} from 'react';
import {
  FiChevronLeft,
  FiImage,
} from 'react-icons/fi';

import {StepProps} from './types';
import LocalFileUpload from './LocalFileUpload';
import assert from "assert";

const Step2: React.FC<StepProps> = (props: StepProps) => {
  const [tempMenu, setTempMenu] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    setUploadedImages([])
  }, [])

  const continueToNextStep = () => {
    localStorage.setItem('step2', JSON.stringify(uploadedImages));
    props.incrementFunc();
  }

  const LocalUpload = () => {
    const thisID = (Math.random() * 100).toString();

    const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
      assert(event.target.files != null);
      if (event.target.files.length > 0) {
        const srcArr = [...uploadedImages];

        for (let i = 0; i < event.target.files.length; i++) {
          // @ts-ignore
          srcArr.push(URL.createObjectURL(event.target.files[i]))
        }

        setUploadedImages(srcArr)
      }
    }

    if (tempMenu) {
      return (
        <div className="w-3/5 px-10 py-6 my-2 ml-4 rounded-3xl bg-neutral-900 flex flex-col">
          <div className="font-bold text-2xl">
            Local Upload
          </div>
          <div className="text-neutral-600 text-sm">
            Upload an image locally
          </div>

          <label htmlFor={thisID} className="hover:cursor-pointer mr-auto mt-5 ml-auto flex flex-col text-neutral-600 text-base border-2 rounded-xl border-dashed w-full h-96 justify-center items-center text-center border-neutral-600">
            <input id={thisID} onChange={(e) => handleImage(e)} type="file" multiple={true} className="hidden" />
            <FiImage className="mb-5" size={32} />
            Click here to upload a file
          </label>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  return (
    <div className="text-white flex flex-col px-12 py-16 w-5/6">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-col w-4/6">
          <div className="text-3xl font-bold">
            Bulk Data Upload
          </div>
          <div className="mt-2 text-base text-neutral-600">
            It looks like you haven&apos;t assigned an image to every trait yet.
            Use our bulk image upload tool to automatically assign them, or go back to the previous manual upload step.
            Please review <Link className="text-emerald-500 hover:text-emerald-400 duration-100" href="https://www.equinoxapi.com/docs">our API documentation</Link> for bulk upload format instructions.
          </div>
        </div>

        <div className="gap-6 flex flex-row justify-center items-center">
          <FiChevronLeft onClick={() => props.decrementFunc()} className="-mr-4 hover:cursor-pointer hover:text-neutral-200 duration-100 ease-out text-neutral-600" size={18} />
          <div className="text-base text-neutral-600">
            Step 2 of 4
          </div>
          {/* {uploadedImages.length > 0 ?
            <div onClick={() => continueToNextStep()} className="ease-in-out duration-100 border-2 hover:bg-neutral-900 hover:cursor-pointer hover:text-white text-neutral-900 border-emerald-500 bg-emerald-500 px-2 py-1.5 rounded-3xl text-base font-bold">
              Continue
            </div>
            :
            <div className="ease-in-out duration-100 border-2 text-neutral-900 border-neutral-700 bg-neutral-700 px-2 py-1.5 rounded-3xl text-base font-bold">
              Continue
            </div>
          } */}
          <div onClick={() => continueToNextStep()} className="ease-in-out duration-100 border-2 hover:bg-neutral-900 hover:cursor-pointer hover:text-white text-neutral-900 border-emerald-500 bg-emerald-500 px-2 py-1.5 rounded-3xl text-base font-bold">
            Continue
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-row w-full">
        <div className="w-2/5 flex flex-col">
          <LocalFileUpload clickFunc={() => setTempMenu(state => !state)} />
          <div className="active:border-emerald-300 my-2 w-full rounded-xl flex flex-row text-white items-center p-4">
            {uploadedImages.map((id) => (
              <div key={id} className="w-48">
                <Image
                  width={48}
                  height={48}
                  className="rounded-2xl h-48 w-auto mr-4 object-cover"
                  key={id}
                  src={id}
                  alt={id.toString()}
                />
              </div>
            ))}
          </div>
        </div>

        <LocalUpload />
      </div>
    </div>
  )
}

export default Step2;
