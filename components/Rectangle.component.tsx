"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Grid, Typography, Input, TextField, Box, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import RectangleService from "@/services/Rectangle.service";
import { IRectangle } from "@/interfaces/IRectangle.interface";

type RectangleProps = {
  rectangle: IRectangle.IRectangleDetail;
  setRectangle: React.Dispatch<IRectangle.IRectangleDetail>;
};

export default function Rectangle({ rectangle, setRectangle }: RectangleProps) {
  const { data: session } = useSession();
  const mainBoxRef = useRef<HTMLDivElement>(null);

  const [mainHeight, setMainHeight] = useState(300);
  const [mainWidth, setMainWidth] = useState(500);
  const [columnCount, setCoulmnCount] = useState(1);
  const [rowCount, setRowCount] = useState(1);
  const [uploadedImages, setUploadedImages] = useState(
    Array(columnCount * rowCount).fill(null)
  ); // Array to store images
  const [columnWidths, setColumnWidths] = useState(
    Array(columnCount).fill(100)
  ); // Array to store the widths of each column
  const [rowHeights, setRowHeights] = useState(Array(rowCount).fill(100)); // Array to store the heights of each row

  useEffect(() => {
    if (
      rectangle.columnCount === columnCount &&
      rectangle.rowCount === rowCount
    ) {
      setRectangle({} as IRectangle.IRectangleDetail);
      return; // Skip the update if columnCount and rowCount already exist
    }
    const updateColumnWidths = () => {
      const mainBoxWidth = mainBoxRef.current?.clientWidth;
      if (mainBoxWidth) {
        const availableWidth = mainBoxWidth / columnCount;
        setColumnWidths(Array(columnCount).fill(availableWidth));
      }
    };

    const updateRowHeights = () => {
      const mainBoxHeight = mainBoxRef.current?.clientHeight;
      if (mainBoxHeight) {
        const availableHeight = mainBoxHeight / rowCount;
        setRowHeights(Array(rowCount).fill(availableHeight));
      }
    };

    updateColumnWidths();
    updateRowHeights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnCount, rowCount]);

  useEffect(() => {
    if (rectangle.createdAt) {
      setMainHeight(rectangle.mainHeight);
      setMainWidth(rectangle.mainWidth);
      setCoulmnCount(rectangle.columnCount);
      setRowCount(rectangle.rowCount);
      setColumnWidths(rectangle.columnWidths);
      setRowHeights(rectangle.rowHeights);
      if (
        Array.isArray(rectangle.imagesData) &&
        rectangle.imagesData.length > 0
      ) {
        // Create a new array with null values
        const newUploadedImages = Array(
          rectangle.columnCount * rectangle.rowCount
        ).fill(null);

        // Iterate over the fetched images and assign them to their respective positions
        rectangle.imagesData.forEach((image) => {
          const { index, file } = image;
          newUploadedImages[index] = file;
        });

        // Update the state with the newUploadedImages array
        setUploadedImages(newUploadedImages);
      }
    }
  }, [rectangle]);

  const handleWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    columnIndex: number
  ) => {
    const width = parseFloat(event.target.value);
    setColumnWidths((prevWidths) => {
      const updatedWidths = [...prevWidths];

      if (columnIndex < columnCount - 1) {
        const currentWidth = updatedWidths[columnIndex];
        const diff = (width > 1 ? width : 1) - currentWidth;
        updatedWidths[columnIndex + 1] -= diff;
      } else {
        const currentWidth = updatedWidths[columnIndex];
        const diff = (width > 1 ? width : 1) - currentWidth;
        updatedWidths[columnIndex - 1] -= diff;
      }

      updatedWidths[columnIndex] = width > 1 ? width : 1;
      return updatedWidths;
    });
  };

  const handleHeightChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    const height = parseFloat(event.target.value);
    setRowHeights((prevHeights) => {
      const updatedHeights = [...prevHeights];

      if (rowIndex < rowCount - 1) {
        const currentHeight = updatedHeights[rowIndex];
        const diff = (height > 1 ? height : 1) - currentHeight;
        updatedHeights[rowIndex + 1] -= diff;
      } else {
        const currentHeight = updatedHeights[rowIndex];
        const diff = (height > 1 ? height : 1) - currentHeight;
        updatedHeights[rowIndex - 1] -= diff;
      }

      updatedHeights[rowIndex] = height > 1 ? height : 1;
      return updatedHeights;
    });
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = file;
        return updatedImages;
      });
    }
  };

  const handleFormSubmit = async () => {
    const formData = new FormData();

    // Append scalar values to the form data
    formData.append("owner", session?.user.id as string);
    formData.append("mainHeight", mainHeight.toString());
    formData.append("mainWidth", mainWidth.toString());
    formData.append("columnCount", columnCount.toString());
    formData.append("rowCount", rowCount.toString());

    // Append arrays as JSON strings to the form data
    formData.append("columnWidths", JSON.stringify(columnWidths));
    formData.append("rowHeights", JSON.stringify(rowHeights));

    // Append each image file to the form data
    uploadedImages.forEach((image, index) => {
      if (image) {
        formData.append(`imagesData[${index}]`, image);
      }
    });

    try {
      const result = await RectangleService.NewRectangle(formData as any);
      setRectangle(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  function handleChangeRowsHeight(): React.ReactNode {
    return (
      rowCount > 1 && (
        <Grid item>
          <Typography mb={1}>Change Rows Height</Typography>
          <Grid container direction="column" spacing={2}>
            {rowHeights.map((height, index) => (
              <Grid item key={index}>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  label={`Height for Row ${index + 1}`}
                  InputLabelProps={{ style: { fontWeight: "bold" } }}
                  inputProps={{ min: 1, step: 0.1 }}
                  value={height}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleHeightChange(event, index)
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )
    );
  }

  function handleChangeColumnsWidth(): React.ReactNode {
    return (
      columnCount > 1 && (
        <Grid item>
          <Typography mb={1}>Change Columns Width</Typography>
          <Grid container direction="column" spacing={2}>
            {columnWidths.map((width, index) => (
              <Grid item key={index}>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  label={`Width for Column ${index + 1}`}
                  InputLabelProps={{ style: { fontWeight: "bold" } }}
                  inputProps={{ min: 1, step: 0.1 }}
                  value={width}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleWidthChange(event, index)
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )
    );
  }

  function handleChangeDividers(): React.ReactNode {
    return (
      <Grid item>
        <Typography mb={1}>Dividers</Typography>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              type="number"
              variant="outlined"
              size="small"
              label="Column Count"
              InputProps={{ inputProps: { min: 1, max: 10 } }}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
              style={{ minWidth: "150px" }}
              value={columnCount}
              onChange={(event) =>
                setCoulmnCount(
                  parseInt(event.target.value) > 0
                    ? parseInt(event.target.value)
                    : 1
                )
              }
            />
          </Grid>
          <Grid item>
            <TextField
              type="number"
              variant="outlined"
              size="small"
              label="Row Count"
              InputProps={{ inputProps: { min: 1, max: 10 } }}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
              style={{ minWidth: "150px" }}
              value={rowCount}
              onChange={(event) =>
                setRowCount(
                  parseInt(event.target.value) > 0
                    ? parseInt(event.target.value)
                    : 1
                )
              }
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  function handleSaveButton(): React.ReactNode {
    return (
      <Grid item>
        <Button
          variant="contained"
          disabled={!session?.user}
          size="large"
          color="primary"
          onClick={handleFormSubmit}
        >
          {!session?.user ? "Sign in to save" : "Save"}
        </Button>
      </Grid>
    );
  }

  function handleResizeMainBox(): React.ReactNode {
    return (
      <Grid item container direction="column" xs={6} spacing={2}>
        <Grid item>
          <TextField
            type="number"
            variant="outlined"
            size="small"
            label="Main Box Width"
            InputLabelProps={{ style: { fontWeight: "bold" } }}
            style={{ minWidth: "150px" }}
            InputProps={{ inputProps: { min: 50, max: 1000 } }}
            value={mainWidth}
            onChange={(event) =>
              setMainWidth(
                parseInt(event.target.value) > 50
                  ? parseInt(event.target.value) > 1000
                    ? 1000
                    : parseInt(event.target.value)
                  : 50
              )
            }
          />
        </Grid>
        <Grid item>
          <TextField
            type="number"
            variant="outlined"
            style={{ minWidth: "150px" }}
            InputLabelProps={{ style: { fontWeight: "bold" } }}
            size="small"
            label="Main Box Height"
            InputProps={{ inputProps: { min: 50, max: 1000 } }}
            value={mainHeight}
            onChange={(event) =>
              setMainHeight(
                parseInt(event.target.value) > 50
                  ? parseInt(event.target.value) > 1000
                    ? 1000
                    : parseInt(event.target.value)
                  : 50
              )
            }
          />
        </Grid>
      </Grid>
    );
  }

  function handleMainBoxRender(): React.ReactNode {
    return (
      <Box
        ref={mainBoxRef}
        border="2px solid black"
        overflow="hidden"
        style={{
          width: mainWidth,
          height: mainHeight,

          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {/* Render the cells */}
        {Array.from({
          length: columnCount * rowCount,
        }).map((value, index) => {
          const columnIndex = index % columnCount;
          const rowIndex = Math.floor(index / columnCount);
          return (
            <Box
              key={index}
              style={{
                border: "1px solid black",
                flex: "1 0 auto",
                width: `${columnWidths[columnIndex]}px`,
                height: `${rowHeights[rowIndex]}px`,
              }}
            >
              {uploadedImages[index] ? (
                <Image
                  src={
                    typeof uploadedImages[index] === "string"
                      ? `/${uploadedImages[index]}`
                      : URL.createObjectURL(uploadedImages[index])
                  }
                  alt="Uploaded Image"
                  width={300}
                  height={300}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              ) : (
                <Input
                  type="file"
                  fullWidth
                  color="primary"
                  inputProps={{ accept: "image/*" }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleImageUpload(event, index)
                  }
                />
              )}
            </Box>
          );
        })}
      </Box>
    );
  }

  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      height={"100vh"}
    >
      <Grid item>
        <Grid container direction="column" spacing={2} mt={"5%"}>
          <Grid
            container
            item
            direction="row"
            alignItems="center"
            width={"100%"}
            justifyContent="center"
            mt={"5%"}
          >
            {handleResizeMainBox()}
            {handleSaveButton()}
          </Grid>

          <Grid item>{handleMainBoxRender()}</Grid>
        </Grid>
      </Grid>
      {handleChangeDividers()}
      {handleChangeColumnsWidth()}
      {handleChangeRowsHeight()}
    </Grid>
  );
}
