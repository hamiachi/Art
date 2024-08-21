import React, { useState } from "react";
import {
  Button,
  IconButton,
  Typography,
  Box,
  Divider,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Slider,
  TextField,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { styled } from "@mui/system";
import * as fal from "@fal-ai/serverless-client";
import { BsFillPatchQuestionFill } from "react-icons/bs";
fal.config({
  credentials:
    "65b7fc8c-1ba4-4c55-b9bb-a35cfffcd110:b75ad2c0c163e9bee02f5780d1df1f8e",
});

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "16px",
});
const CCSR = ({ uploadImage, setIsLoading, setNewImage }) => {
  const [scale, setScale] = useState(2);
  const [tileDiffusion, setTileDiffusion] = useState("none");
  const [tileDiffusionSize, setTileDiffusionSize] = useState(1024);
  const [tileDiffusionStride, setTileDiffusionStride] = useState(512);

  const handleReset = () => {
    setScale(2);
    setTileDiffusion("none");
    setTileDiffusionSize(1024);
    setTileDiffusionStride(512);
  };

  const generateImage = async () => {
    setNewImage(null);
    setIsLoading(true);
    try {
      const result = await fal.subscribe("fal-ai/ccsr", {
        input: {
          image_url: uploadImage,
          scale: scale,
          tile_diffusion: tileDiffusion,
          tile_diffusion_size: tileDiffusionSize,
          tile_diffusion_stride: tileDiffusionStride,
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      });
      console.log(result);
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
      <Box display="flex" flexDirection="column" gap={2}>
        {/* Scale */}
        <Box>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              zIndex: "100",
            }}
          >
            <Typography style={{ marginTop: "-30px" }}>Scale</Typography>
            <BsFillPatchQuestionFill
              style={{
                marginTop: "-20px",
                marginBottom: "10px",
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
                  left: "290px",
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
                  The scale of the output image. The higher the scale, the
                  bigger the output image will be. Default value: 2
                </p>
              </div>
            )}
          </div>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Slider
              defaultValue={2}
              min={1}
              max={4}
              step={0.1}
              onChange={(e, newValue) => setScale(newValue)}
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
              value={scale}
              size="small"
              onChange={(e) => setScale(parseFloat(e.target.value) || 0)}
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
            <Typography style={{ marginTop: "-20px" }}>
              Tile Diffusion
            </Typography>
            <BsFillPatchQuestionFill
              style={{
                marginTop: "-10px",
                marginBottom: "10px",
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
                  left: "340px",
                  top: "500px",
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
                <p style={{ margin: "0px 3px" }}>
                  If specified, a patch-based sampling strategy will be used for
                  sampling. Default value: "none"
                </p>
              </div>
            )}
          </div>
          <Select
            value={tileDiffusion}
            onChange={(e) => setTileDiffusion(e.target.value)}
            style={{ width: "30%" }}
          >
            <MenuItem value="none">none</MenuItem>
            <MenuItem value="mix">mix</MenuItem>
            <MenuItem value="gaussian">gaussian</MenuItem>
          </Select>
        </Box>

        <Box>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              zIndex: "100",
              marginBottom: "10px",
            }}
          >
            <Typography>Tile Diffusion Size</Typography>
            <BsFillPatchQuestionFill
              style={{
                marginTop: "0px",
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
                  left: "380px",
                  top: "610px",
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
                <p>Size of patch. Default value: 1024</p>
              </div>
            )}
          </div>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Slider
              defaultValue={1024}
              min={256}
              max={2048}
              step={10}
              onChange={(e, newValue) => setTileDiffusionSize(newValue)}
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
              value={tileDiffusionSize}
              size="small"
              onChange={(e) =>
                setTileDiffusionSize(parseFloat(e.target.value) || 0)
              }
              style={{ width: "65px" }}
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
            <Typography style={{ marginTop: "-10px" }}>
              Tile Diffusion Stride
            </Typography>
            <BsFillPatchQuestionFill
              style={{
                marginTop: "0px",
                marginBottom: "10px",
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
                  left: "390px",
                  top: "690px",
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
                <p>Stride of sliding patch. Default value: 512</p>
              </div>
            )}
          </div>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Slider
              defaultValue={512}
              min={256}
              max={1024}
              step={10}
              onChange={(e, newValue) => setTileDiffusionStride(newValue)}
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
              value={tileDiffusionStride}
              size="small"
              onChange={(e) =>
                setTileDiffusionStride(parseFloat(e.target.value) || 0)
              }
              style={{ width: "65px" }}
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
      </Box>
    </div>
  );
};

export default CCSR;
