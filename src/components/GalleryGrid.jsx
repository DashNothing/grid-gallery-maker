/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import GridLayout, { WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import closeIcon from "../images/close.svg";

const Grid = WidthProvider(GridLayout);

const GalleryGrid = ({
	layout,
	cols,
	imageHeight,
	onLayoutChange,
	removeItem,
}) => {
	const gridItems = layout.map((item) => (
		<GridItem
			key={item.i}
			data-grid={{
				x: item.x,
				y: item.y,
				w: item.w,
				h: item.h,
			}}
		>
			<img
				src={closeIcon}
				alt=""
				onClick={() => {
					removeItem(item.i);
				}}
			/>
		</GridItem>
	));

	let newLayout = JSON.parse(JSON.stringify(layout));

	return (
		<Container>
			<Grid
				className="layout"
				css={gridStyle}
				cols={cols}
				rowHeight={100}
				layout={newLayout}
				compactType={"vertical"}
				onLayoutChange={(currentLayout) => {
					onLayoutChange(currentLayout);
				}}
				margin={[15, 15]}
				resizeHandles={["s", "e"]}
			>
				{gridItems}
			</Grid>
		</Container>
	);
};

const Container = styled.div`
	overflow-y: auto;
	overflow-x: hidden;
	box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
`;

const gridStyle = css`
	width: 100%;
	height: 100%;
	background-color: #fff;
`;

const GridItem = styled.div`
	background-color: #ffd384;

	img {
		display: block;
		position: absolute;
		top: 10px;
		right: 10px;
		width: 16px;
		height: 16px;
		object-fit: cover;
		cursor: pointer;
		pointer-events: all;
	}
`;

export default GalleryGrid;
