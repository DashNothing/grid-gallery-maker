/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

import CSSBox from "./CSSBox";
import HTMLBox from "./HTMLBox";

const GridForm = ({
	layout,
	imageNumber,
	cols,
	imageHeight,
	onAddImage,
	onChangeCols,
	onChangeImageHeight,
	onCopyText,
}) => {
	return (
		<Form>
			<AddButton
				onClick={(e) => {
					e.preventDefault();
					onAddImage();
				}}
			>
				+ Add image
			</AddButton>

			<div className="inputGroup">
				<label htmlFor="cols">How many columns?</label>
				<input
					type="number"
					max="12"
					min="2"
					value={cols}
					id="cols"
					onChange={(event) => onChangeCols(parseInt(event.target.value))}
				/>
			</div>

			<CodeContainer>
				<HTMLBox layout={layout} onCopyText={onCopyText} />
				<CSSBox layout={layout} onCopyText={onCopyText} />
			</CodeContainer>
		</Form>
	);
};

const Form = styled.form`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	row-gap: 30px;
	font-weight: 600;

	.inputGroup {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		column-gap: 15px;
	}

	input {
		padding: 5px;
		font-size: 1rem;
		border-radius: 5px;
		border: 1px solid #555;
	}

	input:focus {
		outline: none;
		border-color: #ffaec0;
	}
`;

const AddButton = styled.button`
	padding: 10px 35px;
	background-color: #ff7d9a;
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
