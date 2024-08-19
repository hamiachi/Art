"use client"

import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setShowMoreOptions } from '@/redux/actions';
import './ImageGeneratorAdvanced.css'
import axios from 'axios'
import Model from '@/model/Model'
import { toggleShowMoreOptions } from '@/redux/optionsSlice';
import StepSlider from '@/slider/StepSlider';
import ScaleSlider from '@/slider/ScaleSlider';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SamplerMenu from '@/menu/SamplerMenu';
import Navbar from '@/components/Home/Navbar';
import { useRouter } from 'next/navigation';


const ImageGeneratorAdvanced = () => {

    const dispatch = useDispatch();
    const showMoreOptions = useSelector((state) => state.options.showMoreOptions);
    const selectedModel = useSelector((state) => state.options.selectedModel); // Lấy mô hình được chọn từ Redux store
    const stepValue = useSelector((state) => state.options.stepValue)
    const scaleValue = useSelector((state) => state.options.setScale)
    const sampler = useSelector((state) => state.options.setSampler)
    const router = useRouter();
    const secretKey = process.env.GETIMG_KEY;

    const [model, setModel] = useState('juggernaut-xl-v10')
    const [randomSeed, setRandomSeed] = useState(0)
    const [ratio, setRatio] = useState([1024, 1024])
    const [imageUrl, setImageUrl] = useState('/');
    const [imageNumber, setImageNumber] = useState(1)

    useEffect(() => {
        // Kiểm tra nếu trang chưa được reload, thì reload nó
        if (!window.location.hash) {
          window.location.hash = 'reloaded';
          window.location.reload();
        }
    }, []);

    const handleModelChange = (event) => {
        if (event.target.value === 'more-option') {
            dispatch(toggleShowMoreOptions(true));
        } else {
            setModel(event.target.value);
            dispatch(setShowMoreOptions(false));

        }
        console.log('Selected model:', event.target.value);
    };

    const handleChangeRatio = (event) => {
        setRatio(event.target.value);
        console.log("ratio", ratio)
    };

    const handleImageNumber = (num) => {
        setImageNumber(num)
    }

    let inputRef = useRef(null);
    let inputNegative = useRef('')
    let inputSeed = useRef(1)

    const generateRandomNumber = () => {
        const max = Math.pow(10, 10);
        const seed = inputSeed.current.value;
        console.log("seed", seed)
        let newRandomNumber = Math.floor(Math.random() * max);
        inputSeed.current.value = newRandomNumber;
        setRandomSeed(newRandomNumber);
        console.log('Random number:', inputSeed.current.value);
    };

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }

        const options = {
            method: 'POST',
            url: 'https://api.getimg.ai/v1/stable-diffusion-xl/text-to-image',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: secretKey
            },
            data: {
                model: selectedModel ? selectedModel : model,
                prompt: `${inputRef.current.value}`,
                negative_prompt: `${inputNegative.current.value}`,
                width: ratio[0],
                height: ratio[1],
                steps: stepValue,
                guidance: scaleValue,
                scheduler: 'euler',
                response_format: 'url',
                seed: `${inputSeed.current.value}`
            }
        };
        console.log(options)
        axios
            .request(options)
            .then(function (response) {
                let image_create = response.data.url
                console.log(response.data);
                setImageUrl(image_create);
            })
            .catch(function (error) {
                console.error(error);
            });

    };

    const normal = () => {
        router.push('/generator/login')
    }

    return (
        <div className="main">
            <Navbar/>
            <div className={showMoreOptions ? 'body blurred' : 'body'}>
                <div className="IGA">
                    <div className="IGA_prompt">
                        <div className="IGA_promt_selection">
                            <div onClick={normal}>Essential</div>
                            <div>Advanced</div>
                        </div>

                        <div className="IGA_promt_model">
                            <p>Model</p>
                            <select className='IGA_promt_model_selection' value={model} onChange={handleModelChange}>
                                <option value="juggernaut-xl-v10">JuggernautXL X Photorealism </option>
                                <option value="realvis-xl-v4">RealVisXL Photorealism </option>
                                <option value="animagine-xl-v-3-1">Animagine XL Anime</option>
                                <option value="dream-shaper-v8">DreamShaper Artistic</option>
                                <option value="more-option">More option</option>
                            </select>
                        </div>

                        <div className="IGA_promt_input">
                            <p>Prompt</p>
                            <input type="text" ref={inputRef} placeholder="Describle your image. Get creative..." />
                        </div>

                        <div className="IGA_promt_negative">
                            <p>Negative Prompt</p>
                            <input type="text" ref={inputNegative} placeholder="Describle your image. Get creative..." />
                        </div>

                        <div className="IGA_promt_ratio">

                            <p>Aspect ratio</p>
                            <select className="aspect-ratio" value={ratio} onChange={handleChangeRatio}>
                                <option value={[1024, 1024]} >1:1 &nbsp;  &nbsp;1024px x 1024px</option>
                                <option value={[768, 1152]}>2:3 &nbsp; &nbsp;768px x 1152px</option>
                                <option value={[1152, 768]}>3:2 &nbsp; &nbsp;1152px x 768px</option>
                                <option value={[768, 960]}>4:5 &nbsp; &nbsp;768px x 960px</option>
                                <option value={[960, 784]}>5:4 &nbsp; &nbsp;960px x 784px</option>
                                <option value={[720, 1280]}>9:16 &nbsp;720px x 1280px</option>
                                <option value={[1280, 720]}>16:9 &nbsp;1280px x 720px</option>
                            </select>

                        </div>

                        <div className="IGA_promt_images">

                            <p>Number of images</p>
                            <div className='IGA_promt_images_detail'>
                                <div className="box" onClick={() => { handleImageNumber(1) }}>1</div>
                                <div className="box" onClick={() => { handleImageNumber(2) }}>2</div>
                                <div className="box" onClick={() => { handleImageNumber(4) }}>4</div>
                                <div className="box" onClick={() => { handleImageNumber(6) }}>6</div>
                                <div className="box" onClick={() => { handleImageNumber(8) }}>8</div>
                                <div className="box" onClick={() => { handleImageNumber(10) }}>10</div>
                            </div>
                        </div>

                        <div className="IGA_promt_steps">
                            <StepSlider />
                        </div>

                        <div className="IGA_promt_scale">
                            <ScaleSlider />
                        </div>

                        <div className="IGA_promt_seed">
                            <p>Seed</p>
                            <div>
                                <input type="text" ref={inputSeed} placeholder="Leave blank to use a random number" />
                                <ShuffleIcon onClick={generateRandomNumber} className="IGA_promt_seed_icon"/>
                            </div>
                        </div>

                        <div className="IGA_promt_sampler">
                            <p style={{marginBottom:'5px'}}>Sampler</p>
                            <SamplerMenu />
                        </div>

                        <div className="IGA_promt_generate">
                            <p> Credits</p>

                            <div className="IGA_promt_generate_button" onClick={() => { imageGenerator() }}>
                                Create {imageNumber} images
                            </div>
                        </div>
                    </div>

                    <div className="IGA_image">
                        <img src={imageUrl === "/" ? null : imageUrl} alt="" />
                    </div>
                </div>
            </div>

            {showMoreOptions && (
                <div className="overlay">
                    <div className="more-option">
                        <Model />
                    </div>
                </div>
            )}

        </div>
    )
}

export default ImageGeneratorAdvanced