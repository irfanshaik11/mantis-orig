import Image from 'next/image';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  FiAlignJustify,
  FiChevronLeft,
  FiImage,
} from 'react-icons/fi';

import { StepProps } from './types';

interface TraitType {
  name: string;
  supply: number;
}

interface PropertyType {
  name: string;
  traits: Array<TraitType>;
}

const Step3: React.FC<StepProps> = (props: StepProps) => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [newPropertyVisible, setNewPropertyVisible] = useState(false);

  const continueToNextStep = () => {
    localStorage.setItem('step3', JSON.stringify(properties));
    props.incrementFunc();
  }

  const updateProperties = (p: PropertyType) => {
    const tempProperties = [...properties];
    tempProperties.push(p);
    setProperties(tempProperties);
  }

  const deleteProperty = (p: PropertyType) => {
    let tempProperties = [...properties];
    tempProperties = tempProperties.filter(prop => prop.name != p.name);
    setProperties(tempProperties);
  }

  const PropertyComponent: React.FC = () => {
    if (properties.length > 0) {
      return (
        <Property />
      )
    } else {
      return (
        <div className="w-full h-full flex items-center justify-center flex-row">
          <button onClick={() => setNewPropertyVisible(true)} className="ease-in-out duration-100 border-2 w-48 h-10 text-center hover:bg-neutral-900 hover:cursor-pointer hover:text-white text-neutral-900 border-emerald-500 bg-emerald-500 px-2 py-1.5 rounded-3xl text-base font-bold">
            + Add Property
          </button>
        </div>
      )
    }
  }

  const PropertyItem: React.FC<{ property: PropertyType }> = ({ property }) => {
    const [expanded, setExpanded] = useState(false);
    const [traitImages, setTraitImages] = useState({});

    const updateImages = (name: string, img: any) => {
      const prevImages = traitImages;
      prevImages[name] = img;
      setTraitImages(prevImages);

      console.log(traitImages)
    }

    return (
      <div className="flex flex-col bg-neutral-900 rounded p-2 py-4 gap-2">
        <div onClick={() => setExpanded(state => !state)} className="hover:cursor-pointer w-full my-2 items-center gap-2 flex flex-row">
          <FiAlignJustify size={24} className="text-neutral-600 hover:cursor-pointer" />

          <div className="flex flex-col gap-1 ml-4">
            <div className="font-bold">
              {property.name}
            </div>
            <div className="flex flex-row gap-2">
              {property.traits.map(attr => (
                <div key={attr.name} className="bg-black text-neutral-500 p-1 px-2 text-xs rounded-xl duration-150 ease-out focus:outline-none border-neutral-700 border">
                  {attr.name} {attr.supply}%
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-row gap-2 mr-0 ml-auto">
            <button className="bg-black text-neutral-300 rounded my-2 p-2 hover:border-neutral-500 hover:bg-neutral-300 hover:text-black duration-150 ease-out focus:outline-none border-neutral-700 border text-xs">
              Edit Property
            </button>

            <button onClick={() => deleteProperty(property)} className="bg-black text-red-500 rounded my-2 p-2 hover:border-red-500 hover:bg-red-500 hover:text-black duration-150 ease-out focus:outline-none outline-none border-red-500 border text-xs">
              Delete
            </button>
          </div>
        </div>

        {expanded && <div className="flex flex-row mx-12 gap-4">
          {property.traits.map(attr => (
            <TraitWithImage key={attr.name} name={attr.name} updateFunc={updateImages} traitImages={traitImages} />
          ))}
        </div>}
      </div>
    )
  }

  const TraitWithImage: React.FC<{ name: string, updateFunc, traitImages }> = ({ name, updateFunc, traitImages }) => {
    const [img, setImg] = useState('');
    const handleImage = (event) => {
      if (event.target.files.length > 0) {
        const src = URL.createObjectURL(event.target.files[0]);
        updateFunc(name, src);
        setImg(src);
      }
    }

    return (
      <div className="flex flex-col">
        {name}
        <input type="file" id={name + 'inputid'} onChange={(e) => handleImage(e)} className="hidden" />
        <label htmlFor={name + 'inputid'} className="w-24 h-24 flex items-center hover:cursor-pointer justify-center bg-black border-neutral-700 border rounded-xl">
          {traitImages[name] ? (
            <div>
              <Image
                src={img || traitImages[name]}
                className="rounded-xl object-cover"
                alt={`${name} trait image.`}
              />
            </div>
          )
            : <FiImage />
          }
        </label>
      </div>
    )
  }

  const Property: React.FC = () => {
    return (
      <div className="w-full gap-6 h-max mt-10 flex flex-col">
        <div className="text-neutral-600 -mb-4">Drag properties to reorder them.</div>
        {properties.map(property => (
          <PropertyItem
            key={property.name}
            property={property}
          />
        ))}

        <button onClick={() => setNewPropertyVisible(true)} className="bg-black mr-0 ml-auto mt-5 text-neutral-300 w-48 rounded-3xl font-bold text-center my-2 p-4 hover:border-neutral-500 hover:bg-neutral-300 hover:text-black hover:cursor-pointer duration-150 ease-out focus:outline-none border-neutral-700 border text-base">
          + Add Property
        </button>
      </div>
    )
  }

  const NewProperty: React.FC = () => {
    const [property, setProperty]: [PropertyType, Dispatch<SetStateAction<PropertyType>>] =
      useState({
        name: '',
        traits: []
      });
    const nameRef = useRef<HTMLInputElement>();
    const traitsRef = useRef<HTMLDivElement>();

    useEffect(() => {
      addEmptyTrait();
      nameRef.current.placeholder = "Property Name";
    }, [])

    const Trait: React.FC<TraitType> = ({ name, supply }) => {
      const supplyRef = useRef<HTMLInputElement>();
      const traitNameRef = useRef<HTMLInputElement>();

      useEffect(() => {
        supplyRef.current.placeholder = supply.toString() || "100";
        traitNameRef.current.placeholder = name || "Trait 1";
      }, []);

      const changeSupply = (event) => {
        supplyRef.current.value = event.target.value;
      }

      return (
        <div className="flex flex-row gap-4">
          <div className="flex flex-col">
            <label>Name*</label>
            <input ref={traitNameRef} className="bg-black text-neutral-300 pl-4 rounded-xl focus:border-neutral-400 my-2 p-2 focus:outline-none border-neutral-700 border" placeholder="Trait Name" />
          </div>
          <div className="flex flex-col">
            <label>Supply (in %)*</label>
            <input type="number" ref={supplyRef} className="bg-black text-neutral-300 pl-4 rounded-xl focus:border-neutral-400 my-2 p-2 focus:outline-none border-neutral-700 border w-28" />
          </div>

          <div className="ml-10 flex flex-row items-center gap-6 text-neutral-600">
            <p>Rare</p>
            <input onChange={(e) => changeSupply(e)} type="range" min="0" max="100" className="w-60" />
            <p>Common</p>
          </div>
        </div>
      )
    }

    const addEmptyTrait = () => {
      const alreadyHasTraits = updatePropertyState().traits;
      alreadyHasTraits.push({ name: '', supply: 50 });
      console.log(alreadyHasTraits)
      setProperty({
        name: property.name,
        traits: alreadyHasTraits
      })
    }

    const updatePropertyState = () => {
      const traits: Array<TraitType> = [];
      let traitCur;
      let nameCur;

      if (traitsRef.current) {
        traitCur = traitsRef.current;
      }

      if (nameRef.current) {
        nameCur = nameRef.current;
      }

      for (let i = 0; i < traitCur.children.length; i++) {
        const element = traitCur.children[i];

        const trait: TraitType = {
          name: element.children[0].children[1].value || element.children[0].children[1].placeholder,
          supply: parseInt(element.children[1].children[1].value || element.children[1].children[1].placeholder)
        }

        traits.push(trait);
      }

      const property: PropertyType = {
        name: nameCur.value || nameCur.placeholder,
        traits,
      }

      return property;
    }

    const appendProperty = () => {
      const property = updatePropertyState();
      updateProperties(property);
      setNewPropertyVisible(false);
    }

    return (
      <div className="w-full h-max mt-10 flex items-center justify-center flex-row">
        <div className="bg-neutral-900 p-6 rounded-xl w-4/5 text-white flex flex-col gap-6">
          <div className="flex flex-col">
            <label>Property Name*</label>
            <input className="bg-black text-neutral-300 pl-4 rounded-xl my-2 p-2 focus:border-neutral-400 focus:outline-none border-neutral-700 border" ref={nameRef} placeholder="Property Name" />
          </div>
          <div className="">
            <div className="flex flex-row justify-between items-center">
              <div className="text-xl">
                Traits
              </div>
              <button onClick={() => addEmptyTrait()} className="bg-black text-neutral-300 pl-4 rounded-xl my-2 p-2 hover:border-neutral-500 hover:bg-neutral-300 hover:text-black font-bold duration-150 ease-out focus:outline-none border-neutral-700 border">
                + Add Trait
              </button>
            </div>

            <div ref={traitsRef} className="flex mb-4 flex-col gap-6">
              {property.traits.map(id => (
                <Trait key={id.name} name={id.name} supply={id.supply} />
              ))}
            </div>

            <div className="flex flex-row w-full items-center">
              <button onClick={() => appendProperty()} className="mr-0 ml-auto ease-in-out duration-100 border-2 w-32 h-10 text-center hover:bg-neutral-900 hover:cursor-pointer hover:text-white text-neutral-900 border-emerald-500 bg-emerald-500 px-2 py-1.5 rounded-3xl text-base font-bold  ">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-white flex flex-col px-12 py-16 w-5/6">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-col">
          <div className="text-3xl font-bold">
            Add Properties
          </div>
          <div className="mt-2 text-base text-neutral-600">
            Add at least one property and trait to continue.
          </div>
        </div>

        <div className="gap-6 flex flex-row justify-center items-center">
          <FiChevronLeft onClick={() => props.decrementFunc()} className="-mr-4 hover:cursor-pointer hover:text-neutral-200 duration-100 ease-out text-neutral-600" size={18} />
          <div className="text-base text-neutral-600">
            Step 3 of 4
          </div>
          {properties.length > 0 ?
            <div onClick={() => continueToNextStep()} className="ease-in-out duration-100 border-2 hover:bg-neutral-900 hover:cursor-pointer hover:text-white text-neutral-900 border-emerald-500 bg-emerald-500 px-2 py-1.5 rounded-3xl text-base font-bold">
              Continue
            </div>
            :
            <div className="ease-in-out duration-100 border-2 text-neutral-900 bg-neutral-700 border-neutral-700 px-2 py-1.5 rounded-3xl text-base font-bold">
              Continue
            </div>
          }
        </div>
      </div>

      {newPropertyVisible ?
        <NewProperty /> :
        <PropertyComponent />
      }

    </div>
  )
}

export default Step3;
