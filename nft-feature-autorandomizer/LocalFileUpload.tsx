import { FiUpload } from 'react-icons/fi';

import { NullaryVoidFunction } from './types';

interface Props {
  clickFunc: NullaryVoidFunction;
}

const LocalFileUpload: React.FC<Props> = (props: Props) => {
  return (
    <>
      <div onClick={() => props.clickFunc()} className="border border-neutral-900 hover:border-neutral-600 hover:cursor-pointer active:border-emerald-300 my-2 w-full rounded-xl bg-neutral-900 flex flex-row items-center p-4">
        <FiUpload className="mr-8" size={36} />
        <div className="flex flex-col">
          <div className="text-xl font-bold">
            Bulk Upload
          </div>
        </div>
      </div>
    </>
  )
}

export default LocalFileUpload;
