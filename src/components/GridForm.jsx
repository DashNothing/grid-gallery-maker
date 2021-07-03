/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";

import CSSBox from "./CSSBox";
import HTMLBox from "./HTMLBox";

const GridForm = ({
	layout,
	imageNumber,
	cols,
	gridWidthPercentage,
	imageHeight,
	onAddImage,
	onChangeCols,
	onChangeGridWidth,
	onChangeImageHeight,
	onCopyText,
}) => {
	const [tempCols, setTempCols] = useState(cols);
	const [tempImageHeight, setTempImageHeight] = useState(imageHeight);
	const [tempWidthPercentage, setTempWidthPercentage] =
		useState(gridWidthPercentage);

	useEffect(() => {
		setTempCols(cols);
	}, [cols]);

	useEffect(() => {
		setTempImageHeight(imageHeight);
	}, [imageHeight]);

	useEffect(() => {
		console.log(
			"USEEFFECT - Setting temp grid width to " + gridWidthPercentage
		);
		setTempWidthPercentage(gridWidthPercentage);
	}, [gridWidthPercentage]);

	return (
		<Form>
			<AddButton
				type="button"
				onClick={(e) => {
					e.preventDefault();
					onAddImage();
				}}
			>
				+ Add image
			</AddButton>

			<InputGroup tooltip={"Between 2 and 12"}>
				<label htmlFor="cols">How many columns?</label>
				<input
					type="number"
					max="12"
					min="2"
					value={tempCols}
					id="cols"
					onKeyDown={(event) => {
						if (event.keyCode == 13) event.target.blur();
					}}
					onChange={(event) => setTempCols(parseInt(event.target.value))}
					onBlur={(event) => {
						if (!event.target.value) {
							setTempCols(cols);
							return;
						}
						onChangeCols(tempCols);
					}}
				/>
			</InputGroup>

			<InputGroup>
				<label htmlFor="gridWidth">Grid width % (1 - 100)</label>
				<input
					type="number"
					max="100"
					min="1"
					value={tempWidthPercentage}
					id="gridWidth"
					onKeyDown={(event) => {
						if (event.keyCode == 13) event.target.blur();
					}}
					onChange={(event) => {
						setTempWidthPercentage(parseInt(event.target.value));
					}}
					onBlur={(event) => {
						if (!event.target.value) {
							setTempWidthPercentage(gridWidthPercentage);
							return;
						}

						setTempWidthPercentage(gridWidthPercentage);
						onChangeGridWidth(tempWidthPercentage);
					}}
				/>
			</InputGroup>

			<InputGroup>
				<label htmlFor="imageHeight">Image height (px)</label>
				<input
					type="number"
					min="50"
					value={tempImageHeight}
					id="imageHeight"
					onKeyDown={(event) => {
						if (event.keyCode == 13) event.target.blur();
					}}
					onChange={(event) => setTempImageHeight(parseInt(event.target.value))}
					onBlur={(event) => {
						if (!event.target.value) {
							setTempImageHeight(imageHeight);
							return;
						}
						onChangeImageHeight(tempImageHeight);
					}}
				/>
			</InputGroup>

			<CodeContainer>
				<HTMLBox
					layout={layout}
					onCopyText={onCopyText}
					gridWidthPercentage={gridWidthPercentage}
					imageHeight={imageHeight}
				/>
				<CSSBox
					layout={layout}
					onCopyText={onCopyText}
					gridWidthPercentage={gridWidthPercentage}
					imageHeight={imageHeight}
				/>
			</CodeContainer>
		</Form>
	);
};

const Form = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	row-gap: 20px;
	font-weight: 600;

	input {
		padding: 5px;
		font-size: 1rem;
		border-radius: 5px;
		border: 1px solid #555;
	}

	input:focus {
		outline: none;
		border-color: #ff7abc;
	}
`;

const InputGroup = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	column-gap: 15px;

	:hover {
		::before {
			opacity: 1;
		}
	}

	::before {
		content: ${(props) => props.tooltip};
		display: inline-block;
		position: absolute;
		left: 0;
		top: -10px;
		transform: translateY(-100%);
		padding: 10px 20px;
		background-color: #fff;
		opacity: 0;
		transition: opacity 0.3s ease;
		z-index: 5;
	}
`;

const AddButton = styled.button`
	padding: 10px 35px;
	background-color: #ff7abc;
	color: #fff;
	font-weight: 600;
	font-size: 1rem;
`;

const CodeContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	row-gap: 20px;
	overflow: hidden;
	width: 100%;
`;

export default GridForm;
