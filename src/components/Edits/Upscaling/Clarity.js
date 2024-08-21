import React, { useState, useRef } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  Slider,
  Tooltip,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import * as fal from "@fal-ai/serverless-client";
import { BsFillPatchQuestionFill } from "react-icons/bs";
fal.config({
  credentials:
    "65b7fc8c-1ba4-4c55-b9bb-a35cfffcd110:b75ad2c0c163e9bee02f5780d1df1f8e",
});

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  marginBottom: "16px",
});

const Clarity = ({ uploadImage, setIsLoading, setNewImage }) => {
  // const [prompt, setPrompt] = useState('masterpiece, best quality, highres');
  let inputPromt = useRef("masterpiece, best quality, highres");
  const [upscaleFactor, setUpscaleFactor] = useState(2);
  // const [negativePrompt, setNegativePrompt] = useState('()');
  let inputNegativePrompt = useRef(
    "worst quality, low quality, normal quality:2"
  );
  const [creativity, setCreativity] = useState(0.35);
  const [resemblance, setResemblance] = useState(0.6);
  const [guidanceScale, setGuidanceScale] = useState(4);
  const [numInferenceSteps, setNumInferenceSteps] = useState(18);

  console.log("Ảnh tải lên", uploadImage);

  const handleReset = () => {
    // setPrompt('masterpiece, best quality, highres');
    setUpscaleFactor(2);
    // setNegativePrompt('(worst quality, low quality, normal quality:2)');
    setCreativity(0.35);
    setResemblance(0.6);
    setGuidanceScale(4);
    setNumInferenceSteps(18);
  };

  const generateImage = async () => {
    setNewImage(null);
    setIsLoading(true);
    try {
      const result = await fal.subscribe("fal-ai/clarity-upscaler", {
        input: {
          image_url: uploadImage,
          prompt: inputPromt.current.value,
          upscale_factor: upscaleFactor,
          negative_prompt: inputNegativePrompt.current.value,
          creativity: creativity,
          resemblance: resemblance,
          guidance_scale: guidanceScale,
          num_inference_steps: numInferenceSteps,
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      });
      console.log("Clarity", result);
      setNewImage(result.image.url); // Adjust according to the actual result structure

      // console.log(result.image.url); // Adjust according to the actual result structure
    } catch (error) {
      // setError('Error generating image');
      setIsLoading(false);
      console.error("Error generating image:", error);
    }
    // setLoading(false);
  };

  const [dis, setDis] = useState(Array(7).fill(false));

  const appear = (num) => {
    const newDis = [...dis];
    newDis[num - 1] = true;
    setDis(newDis);
  };

  const disappear = (num) => {
    const newDis = [...dis];
    newDis[num - 1] = false;
    setDis(newDis);
  };

  return (
    <div>
      <StyledBox>
        <Box>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              zIndex: "100",
            }}
          >
            <Typography style={{ marginTop: "-30px", marginBottom: "-15px" }}>
              Prompt
            </Typography>
            <BsFillPatchQuestionFill
              style={{
                marginTop: "-15px",
                marginLeft: "10px",
              }}
              size={16}
              className="question"
              onMouseEnter={() => appear(1)}
              onMouseLeave={() => disappear(1)}
            />
            {dis[0] && (
              <div
                className="IGA_promt_model_div"
                style={{
                  position: "absolute",
                  left: "300px",
                  top: "440px",
                  zIndex: "1000",
                  height: "145px",
                  width: "200px",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <p>
                  The prompt to use for generating the image. Default value:
                  "masterpiece, best quality, highres"
                </p>
              </div>
            )}
          </div>
          <Tooltip title="Enter your prompt here">
            <IconButton>
              <i className="fas fa-info-circle"></i>
            </IconButton>
          </Tooltip>
          <TextField
            inputRef={inputPromt}
            defaultValue="masterpiece, best quality, highres"
            multiline
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                minHeight: 55,
                borderRadius: "10px",
                alignItems: "flex-start",
              },
            }}
          />
        </Box>

        <Box>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              zIndex: "100",
            }}
          >
            <Typography style={{ marginBottom: "-15px" }}>
              Upscale Factor
            </Typography>
            <BsFillPatchQuestionFill
              style={{
                marginBottom: "-15px",
                marginLeft: "10px",
              }}
              size={16}
              className="question"
              onMouseEnter={() => appear(2)}
              onMouseLeave={() => disappear(2)}
            />
            {dis[1] && (
              <div
                className="IGA_promt_model_div"
                style={{
                  position: "absolute",
                  left: "360px",
                  top: "550px",
                  zIndex: "1000",
                  height: "145px",
                  width: "200px",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <p>The upscale factor Default value: 2</p>
              </div>
            )}
          </div>
          <Tooltip title="Set the upscale factor">
            <IconButton>
              <i className="fas fa-info-circle"></i>
            </IconButton>
          </Tooltip>

          <Box display={"flex"} justifyContent={"space-between"}>
            <Slider
              value={upscaleFactor}
              min={1}
              max={4}
              step={0.1}
              onChange={(e, newValue) => setUpscaleFactor(newValue)}
              style={{ width: "80%" }}
              sx={{
                "& .MuiSlider-track": {
                  background: "linear-gradient(to right, #3F0BBC, #FF34F9)", // Gradient cho track
                },
                "& .MuiSlider-thumb": {
                  background: "#FF34F9", // Gradient cho thumb
                },
                "& .MuiSlider-rail": {
                  background: "#FF34F9", // Gradient cho rail
                },
              }}
            />
            <TextField
              value={upscaleFactor}
              size="small"
              onChange={(e) =>
                setUpscaleFactor(parseFloat(e.target.value) || 0)
              }
              style={{ width: "60px" }}
            />
          </Box>
        </Box>

        <Box>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              zIndex: "100",
            }}
          >
            <Typography style={{ marginBottom: "-5px" }}>
              Negative Prompt
            </Typography>
            <BsFillPatchQuestionFill
              style={{
                marginTop: "0px",
                marginBottom: "-5px",
                marginLeft: "10px",
              }}
              size={16}
              className="question"
              onMouseEnter={() => appear(3)}
              onMouseLeave={() => disappear(3)}
            />
            {dis[2] && (
              <div
                className="IGA_promt_model_div"
                style={{
                  position: "absolute",
                  left: "370px",
                  top: "640px",
                  zIndex: "1000",
                  height: "145px",
                  width: "200px",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <p>
                  Use it to address details that you don't want in the image.
                </p>
              </div>
            )}
          </div>
          <Tooltip title="Enter your negative prompt here">
            <IconButton>
              <i className="fas fa-info-circle"></i>
            </IconButton>
          </Tooltip>
          <TextField
            inputRef={inputNegativePrompt}
            defaultValue="worst quality, low quality, normal quality:2"
            multiline
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                minHeight: 55,
                borderRadius: "10px",
                alignItems: "flex-start",
              },
            }}
          />
        </Box>

        <Box>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              zIndex: "100",
              marginBottom: "-10px",
            }}
          >
            <Typography>Creativity</Typography>
            <BsFillPatchQuestionFill
              style={{
                marginTop: "0px",
                marginLeft: "10px",
              }}
              size={16}
              className="question"
              onMouseEnter={() => appear(4)}
              onMouseLeave={() => disappear(4)}
            />
            {dis[3] && (
              <div
                className="IGA_promt_model_div"
                style={{
                  position: "absolute",
                  left: "320px",
                  top: "740px",
                  zIndex: "1000",
                  height: "145px",
                  width: "200px",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <p style={{ margin: "0px 5px" }}>
                  The higher the creativity, the more the model will deviate
                  from the prompt.
                </p>
              </div>
            )}
          </div>
          <Tooltip title="Set the creativity level">
            <IconButton>
              <i className="fas fa-info-circle"></i>
            </IconButton>
          </Tooltip>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Slider
              value={creativity}
              min={0}
              max={1}
              step={0.1}
              onChange={(e, newValue) => setCreativity(newValue)}
              style={{ width: "80%" }}
              sx={{
                "& .MuiSlider-track": {
                  background: "linear-gradient(to right, #3F0BBC, #FF34F9)", // Gradient cho track
                },
                "& .MuiSlider-thumb": {
                  background: "#FF34F9", // Gradient cho thumb
                },
                "& .MuiSlider-rail": {
                  background: "#FF34F9", // Gradient cho rail
                },
              }}
            />
            <TextField
              value={creativity}
              size="small"
              onChange={(e) => setCreativity(parseFloat(e.target.value) || 0)}
              style={{ width: "60px" }}
            />
          </Box>
        </Box>

        <Box>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              zIndex: "100",
              marginBottom: "-5px",
            }}
          >
            <Typography style={{ marginBottom: "-10px", marginTop: "-10px" }}>
              Resemblance
            </Typography>
            <BsFillPatchQuestionFill
              style={{
                marginLeft: "10px",
              }}
              size={16}
              className="question"
              onMouseEnter={() => appear(5)}
              onMouseLeave={() => disappear(5)}
            />
            {dis[4] && (
              <div
                className="IGA_promt_model_div"
                style={{
                  position: "absolute",
                  left: "350px",
                  top: "840px",
                  zIndex: "1000",
                  height: "145px",
                  width: "200px",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <p>
                  The higher the resemblance, the more the model will try to
                  keep the original image.
                </p>
              </div>
            )}
          </div>
          <Tooltip title="Set the resemblance level">
            <IconButton>
              <i className="fas fa-info-circle"></i>
            </IconButton>
          </Tooltip>

          <Box display={"flex"} justifyContent={"space-between"}>
            <Slider
              value={resemblance}
              min={0}
              max={1}
              step={0.1}
              onChange={(e, newValue) => setResemblance(newValue)}
              style={{ width: "80%" }}
              sx={{
                "& .MuiSlider-track": {
                  background: "linear-gradient(to right, #3F0BBC, #FF34F9)", // Gradient cho track
                },
                "& .MuiSlider-thumb": {
                  background: "#FF34F9", // Gradient cho thumb
                },
                "& .MuiSlider-rail": {
                  background: "#FF34F9", // Gradient cho rail
                },
              }}
            />
            <TextField
              value={resemblance}
              size="small"
              onChange={(e) => setResemblance(parseFloat(e.target.value) || 0)}
              style={{ width: "60px" }}
            />
          </Box>
        </Box>

        <Box>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              zIndex: "100",
              marginBottom: "-5px",
            }}
          >
            <Typography style={{ marginBottom: "-10px", marginTop: "-10px" }}>
              Guidance scale (CFG)
            </Typography>
            <BsFillPatchQuestionFill
              style={{
                marginLeft: "10px",
              }}
              size={16}
              className="question"
              onMouseEnter={() => appear(6)}
              onMouseLeave={() => disappear(6)}
            />
            {dis[5] && (
              <div
                className="IGA_promt_model_div"
                style={{
                  position: "absolute",
                  left: "410px",
                  top: "920px",
                  zIndex: "1000",
                  height: "145px",
                  width: "200px",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <p style={{ margin: "0px 5px" }}>
                  The CFG scale is a measure how close you want the model to
                  stick to your prompt when looking for a related image
                </p>
              </div>
            )}
          </div>
          <Tooltip title="Set the guidance scale">
            <IconButton>
              <i className="fas fa-info-circle"></i>
            </IconButton>
          </Tooltip>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Slider
              value={guidanceScale}
              min={0}
              max={20}
              step={0.5}
              onChange={(e, newValue) => setGuidanceScale(newValue)}
              style={{ width: "80%" }}
              sx={{
                "& .MuiSlider-track": {
                  background: "linear-gradient(to right, #3F0BBC, #FF34F9)", // Gradient cho track
                },
                "& .MuiSlider-thumb": {
                  background: "#FF34F9", // Gradient cho thumb
                },
                "& .MuiSlider-rail": {
                  background: "#FF34F9", // Gradient cho rail
                },
              }}
            />
            <TextField
              value={guidanceScale}
              size="small"
              onChange={(e) =>
                setGuidanceScale(parseFloat(e.target.value) || 0)
              }
              style={{ width: "60px" }}
            />
          </Box>
        </Box>

        <Box>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              zIndex: "100",
              marginBottom: "-5px",
            }}
          >
            <Typography style={{ marginBottom: "-10px", marginTop: "-10px" }}>
              Num Inference Steps
            </Typography>
            <BsFillPatchQuestionFill
              style={{
                marginLeft: "10px",
              }}
              size={16}
              className="question"
              onMouseEnter={() => appear(7)}
              onMouseLeave={() => disappear(7)}
            />
            {dis[6] && (
              <div
                className="IGA_promt_model_div"
                style={{
                  position: "absolute",
                  left: "400px",
                  top: "1010px",
                  zIndex: "1000",
                  height: "145px",
                  width: "200px",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <p>
                  The number of inference steps to perform. Default value: 18
                </p>
              </div>
            )}
          </div>
          <Tooltip title="Set the number of inference steps">
            <IconButton>
              <i className="fas fa-info-circle"></i>
            </IconButton>
          </Tooltip>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Slider
              value={numInferenceSteps}
              min={4}
              max={50}
              step={1}
              onChange={(e, newValue) => setNumInferenceSteps(newValue)}
              style={{ width: "80%" }}
              sx={{
                "& .MuiSlider-track": {
                  background: "linear-gradient(to right, #3F0BBC, #FF34F9)", // Gradient cho track
                },
                "& .MuiSlider-thumb": {
                  background: "#FF34F9", // Gradient cho thumb
                },
                "& .MuiSlider-rail": {
                  background: "#FF34F9", // Gradient cho rail
                },
              }}
            />
            <TextField
              value={numInferenceSteps}
              size="small"
              onChange={(e) =>
                setNumInferenceSteps(parseFloat(e.target.value) || 0)
              }
              style={{ width: "60px" }}
            />
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginRight: "8px" }}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={generateImage}
            sx={{
              backgroundColor: "#C209C1",
              "&:hover": {
                backgroundColor: "#A107A4", // Màu nền khi hover
              },
            }}
          >
            Run
          </Button>
        </Box>
      </StyledBox>
    </div>
  );
};

export default Clarity;
