import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import {
  Menu,
  MenuItem,
  Divider,
  Select,
  Switch,
  FormControlLabel,
  InputLabel,
  FormControl,
} from "@mui/material";
import * as fal from "@fal-ai/serverless-client";
import { BsFillPatchQuestionFill } from "react-icons/bs";
fal.config({
  credentials:
    "65b7fc8c-1ba4-4c55-b9bb-a35cfffcd110:b75ad2c0c163e9bee02f5780d1df1f8e",
});
const Aura = ({ uploadImage, setIsLoading, setNewImage }) => {
  const [upscaleFactor, setUpscaleFactor] = useState(4);
  const [tile, setTile] = useState(false);
  const [version, setVersion] = useState("v1");
  // const [newImage, setNewImage] = useState(null)

  const handleUpscaleChange = (event) => {
    setUpscaleFactor(event.target.value);
  };

  const handletileChange = (event) => {
    setTile(event.target.checked);
  };

  const handleVersionChange = (event) => {
    setVersion(event.target.value);
  };

  const handleReset = () => {
    setUpscaleFactor(4);
    setTile(false);
    setVersion("v1");
  };
  const generateImage = async () => {
    setIsLoading(true);
    setNewImage(null);
    try {
      const result = await fal.subscribe("fal-ai/aura-sr", {
        input: {
          image_url: uploadImage,
          upscaling_factor: 4,
          overlapping_tiles: tile,
          checkpoint: version,
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
      {/* <Divider style={{ margin: '16px 0' }} /> */}
      <Box display="flex" flexDirection="column">
        <Box alignItems="center" flexDirection="column">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              zIndex: "100",
            }}
          >
            <Typography style={{ marginTop: "-30px", marginBottom: "5px" }}>
              Upscaling Factor (Xs)
            </Typography>
            <BsFillPatchQuestionFill
              style={{
                marginTop: "-25px",
                marginBottom: "10px",
                marginLeft: "10px",
              }}
              size={16}
              className="question"
              onMouseEnter={() => appear(1)}
              onMouseLeave={() => disappear(1)}
            />
          </div>
          {dis[0] && (
            <div
              className="IGA_promt_model_div"
              style={{
                position: "absolute",
                left: "400px",
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
              <p>Upscaling factor. More coming soon. Default value: "4"</p>
            </div>
          )}
          <FormControl fullWidth>
            {/* <InputLabel id="upscale-factor-label">Select the Upscaling Factor (Xs)</InputLabel> */}
            <Select
              labelId="upscale-factor-label"
              value={upscaleFactor}
              onChange={handleUpscaleChange}
              displayEmpty
              defaultValue=""
              style={{ width: "100%" }}
            >
              <MenuItem value="4">Default</MenuItem>
              <MenuItem value="4.0">4</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          alignItems="center"
          flexDirection="column"
          style={{ marginTop: "20px", marginBottom: "5px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              zIndex: "100",
            }}
          >
            <Typography>Overlapping Tiles</Typography>
            <BsFillPatchQuestionFill
              size={16}
              className="question"
              onMouseEnter={() => appear(2)}
              onMouseLeave={() => disappear(2)}
              style={{ marginLeft: "10px" }}
            />
            {dis[1] && (
              <div
                className="IGA_promt_model_div"
                style={{
                  position: "absolute",
                  left: "370px",
                  top: "540px",
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
                <p>Whether to use overlapping tiles for upscaling.</p>
              </div>
            )}
          </div>
          <FormControlLabel
            control={<Switch checked={tile} onChange={handletileChange} />}
          />
        </Box>

        <Box alignItems="center" flexDirection="column">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              zIndex: "100",
            }}
          >
            <Typography style={{ marginTop: "10px", marginBottom: "5px" }}>
              Checkpoint
            </Typography>
            <BsFillPatchQuestionFill
              style={{
                marginTop: "10px",
                marginBottom: "5px",
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
                  left: "330px",
                  top: "620px",
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
                  Checkpoint to use for upscaling. More coming soon. Default
                  value: "v1"
                </p>
              </div>
            )}
          </div>
          <Select
            defaultValue="v1"
            labelId="upscale-factor-label"
            value={version}
            onChange={handleVersionChange}
            // style={{ width: '100%' }}
            style={{ width: "30%" }}
          >
            <MenuItem value="v1">v1</MenuItem>
            <MenuItem value="v2">v2</MenuItem>
          </Select>
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

export default Aura;
