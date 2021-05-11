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
				Add image
			</AddButton>

			<div>
				<label htmlFor="cols">How many columns?</label>
				<input
					type="number"
					value={cols}
					id="cols"
					onChange={(event) => onChangeCols(parseInt(event.target.value))}
				/>
			</div>

			<div>
				<label htmlFor="imageHeight">Image height</label>
				<input
					type="number"
					value={imageHeight}
					id="imageHeight"
					onChange={(event) =>
						onChangeImageHeight(parseInt(event.target.value))
					}
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
	row-gap: 30px;
`;

const AddButton = styled.button`
	background-color: #ffaec0;
`;

const CodeContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 20px;
	overflow: hidden;
`;

export default GridForm;
