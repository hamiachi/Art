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
import { Civitai, Scheduler } from "civitai";
import ModelModal from './ModelModal';
// import Navbar from '@/components/Home/Navbar';
import LensBlurIcon from '@mui/icons-material/LensBlur';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import { Grid, Card, CardMedia, IconButton, Box, Typography } from '@mui/material';
import Navbar from '@/components/Home/Navbar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import SecurityUpdateIcon from '@mui/icons-material/SecurityUpdate';

const civitai = new Civitai({
    auth: "366308d6148e5d146f5dd67f8f97ba31",
    
});



const ImageGeneratorAdvanced = () => {

    const originalModel = {
        'urn:air:sdxl:checkpoint:civitai:133005@471120' : {
            title: 'JuggernautXL',
        },
        'urn:air:sdxl:checkpoint:civitai:139562@361593' : {
            title: 'RealVisXL'
        },
        'urn:air:sdxl:checkpoint:civitai:260267@403131' : {
            title: "Animagine XL"
        },
        'urn:air:sd1:checkpoint:civitai:4384@128713' : {
            title: 'DreamShaper'
        }
    }

    const dispatch = useDispatch();
    const showMoreOptions = useSelector((state) => state.options.showMoreOptions);
    const selectedModel = useSelector((state) => state.options.selectedModel)
    console.log(selectedModel, "Select")
    // Lấy mô hình được chọn từ Redux store
    const stepValue = useSelector((state) => state.options.stepValue)
    const scaleValue = useSelector((state) => state.options.setScale)
    const sampler = useSelector((state) => state.options.setSampler)

    const router = useRouter();

    const [model, setModel] = useState('urn:air:sdxl:checkpoint:civitai:133005@471120')
    const [label, setLablle] = useState('512 x 512px')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [randomSeed, setRandomSeed] = useState(0)
    const [ratio, setRatio] = useState([512, 512])
    const [height, setHeight] = useState(512)
    const [width, setWidth] = useState(512)
    const [imageUrl, setImageUrl] = useState([]);
    const [imageNumber, setImageNumber] = useState(1)
    const [customModel, setCustomModel] = useState(null);
    const [isUpload, setIsUpload] = useState(false)
    const [isFinal, setIsFinal] = useState(false)

    useEffect(() => {
        // Kiểm tra nếu trang chưa được reload, thì reload nó
        if (!window.location.hash) {
            window.location.hash = 'reloaded';
            window.location.reload();
        }
    }, []);

    const handleModelChange = (event) => {
        if (event.target.value === 'more-option') {
            setIsModalOpen(true);
            // setCustomModel(true)
            if (selectedModel) {
                setModel(selectedModel.id)
                // setCustomModel(selectedModel.id)
            }

        } else {
            setModel(event.target.value);

        }
        console.log('Selected model:', event.target.value);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleChangeRatio = (event) => {
        setRatio(event.target.value);
        const ratio = event.target.value.split(',')
        console.log("AAAAAAAAAAAAAAAAA", ratio)

        setHeight(parseInt(ratio[0]))
        setWidth(parseInt(ratio[1]))
        setLablle(ratio[0] + ' x ' + ratio[1] + ' px')
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

    const suggestPromptClick = () => {
        if (inputRef.current) {
            inputRef.current.value = 'medium portrait shot of a golden retriever, wearing a hat'; // Thay đổi giá trị của input
        }
    };


    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }
        setIsUpload(true)
        setIsFinal(false)
        // setStart(true)

        const input = {
            quantity: imageNumber,
            // batchSize: 2,
            model: selectedModel ? selectedModel.id : model,
            params: {
                prompt: `${inputRef.current.value}`,
                negativePrompt: `${inputNegative.current.value}`,
                scheduler: sampler,
                steps: stepValue,
                cfgScale: scaleValue,
                width: width,
                height: height,
                clipSkip: 2,
            },
        };

        console.log(input)
        try {
            const response = await civitai.image.fromText(input, true); // long polling để đợi kết quả
            const token = response.token;
            const result = await civitai.jobs.getByToken(token);
            const urls = result.jobs.map(job => job.result.blobUrl)
            console.log("Ket qua", result)
            setImageUrl(urls);

            // setStart(false)
            // Lưu URL của hình ảnh nhận được
            console.log(result.jobs[0].result.blobUrl);
        } catch (error) {
            console.error(error);
        } finally {
            setIsFinal(true)

        }
    }

    const normal = () => {
        router.push('/generator/login')
    }

    console.log(imageUrl)
    // console.log( originalModel[model].title, "hahahahahhhaahah")
    return (
        <div className="main">
            <Navbar />
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
                                <option value="urn:air:sdxl:checkpoint:civitai:133005@471120">JuggernautXL X Photorealism </option>
                                <option value="urn:air:sdxl:checkpoint:civitai:139562@361593">RealVisXL Photorealism </option>
                                <option value="urn:air:sdxl:checkpoint:civitai:260267@403131">Animagine XL Anime</option>
                                <option value="urn:air:sd1:checkpoint:civitai:4384@128713">DreamShaper Artistic</option>
                                {selectedModel && (
                                    <option value={selectedModel.id}>{selectedModel.title}</option>
                                )}
                                <option value="more-option">More - option</option>
                            </select>
                        </div>

                        <ModelModal open={isModalOpen} handleClose={handleCloseModal} />

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

                                <option value={[512, 512]} >Square 512px x 512px</option>
                                <option value={[768, 512]} >Landscape 768px x 512px</option>
                                <option value={[512, 768]} >Portrait 512px x 768px</option>

                            </select>

                        </div>

                        <div className="IGA_promt_images">

                            <p>Number of images</p>
                            <div className='IGA_promt_images_detail'>
                                <div className="box" onClick={() => { handleImageNumber(1) }}>1</div>
                                <div className="box" onClick={() => { handleImageNumber(2) }}>2</div>
                                <div className="box" onClick={() => { handleImageNumber(4) }}>4</div>
                                <div className="box">6</div>
                                <div className="box">8</div>
                                <div className="box">10</div>
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
                                <ShuffleIcon onClick={generateRandomNumber} className="IGA_promt_seed_icon" />
                            </div>
                        </div>

                        <div className="IGA_promt_sampler">
                            <p style={{ marginBottom: '5px' }}>Sampler</p>
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
                        {!isUpload ? (
                            <div className="image_preview">
                                <LensBlurIcon sx={{ scale: '500%', paddingBottom: '20px' }}></LensBlurIcon>
                                <div className="create">Created images will appear here</div>
                                <div className="looklike">Looks like you haven't created anything yet!</div>
                                <div className="looklike">Click the button below to copy a sample prompt and then click 'Create'.</div>
                                <Button sx={{
                                    backgroundColor: '#6a5acd', // Màu xanh tím
                                    color: 'white',
                                    fontWeight: 'bold',
                                    padding: '10px 20px',
                                    '&:hover': {
                                        backgroundColor: '#5a4db1', // Màu khi hover
                                    },
                                }}

                                    onClick={suggestPromptClick}
                                >
                                    Use sample prompt

                                </Button>
                            </div>
                        ) : (

                            <>
                                {isFinal ? (
                                    <>
                                        
                                        <Box sx={{ width: '100%', height: '100%' }}>


                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Box display="flex">
                                                    <IconButton>
                                                        <FirstPageIcon/>
                                                    </IconButton>
                                                    <Typography sx ={{alignSelf:'center'}} >{inputRef.current.value}</Typography>
                                                    <IconButton>
                                                        <ContentCopyIcon/>

                                                    </IconButton>
                                                </Box>

                                                <Box display = 'flex'>
                                                    <Typography sx ={{alignSelf:'center', paddingRight: '25px'}}>
                                                        {model ? originalModel[model].title : selectedModel.title}
                                                    </Typography>


                                                    <PhotoLibraryIcon sx ={{alignSelf:'center', paddingRight:'5px'}}/>
                                                    <Typography sx ={{alignSelf:'center', paddingRight: '25px'}}>
                                                        {imageNumber}
                                                    </Typography>



                                                    <FullscreenExitIcon sx ={{alignSelf:'center', paddingRight:'5px'}}/>
                                                    <Typography sx ={{alignSelf:'center', paddingRight: '25px'}}>
                                                        {label}
                                                    </Typography>

                                                    <IconButton>
                                                        <SecurityUpdateIcon/>
                                                    </IconButton>
                                                    
                                                </Box>
                                            </Box>
                                            <Grid container spacing={2} sx={{ marginTop: 2, justifyContent: 'center' }}>
                                                {imageUrl.map((image, index) => (
                                                    <Grid item xs={3} key={index}>
                                                        <Box
                                                            sx={{
                                                                position: 'relative',
                                                                paddingTop: '100%',
                                                                borderRadius: 2,
                                                                overflow: 'hidden',
                                                                backgroundColor: '#1E1E1E',
                                                            }}
                                                        >
                                                            <img
                                                                src={image}
                                                                // alt={image.alt}
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: 0,
                                                                    left: 0,
                                                                    // width: '100%',
                                                                    height: '100%',
                                                                    objectFit: 'cover'
                                                                }}
                                                            />
                                                            <IconButton
                                                                sx={{
                                                                    position: 'absolute',
                                                                    top: 8,
                                                                    right: 8,
                                                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                                    color: 'white',
                                                                    '&:hover': {
                                                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                                    },
                                                                }}
                                                            >
                                                                <VisibilityIcon />
                                                            </IconButton>
                                                        </Box>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Box>
                                    </>

                                ) : (
                                    <CircularProgress size={height / 2} />
                                )}
                            </>

                        )}
                    </div>
                </div>
            </div>
            <Navbar />

            {/* {showMoreOptions && (
                <div className="overlay">
                    <div className="more-option">
                        <Model />
                    </div>
                </div>
            )} */}

        </div>
    )
}

export default ImageGeneratorAdvanced