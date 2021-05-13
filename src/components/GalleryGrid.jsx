/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import { useRef, useEffect, useState } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import closeIcon from "../images/close.svg";

const Grid = WidthProvider(GridLayout);

const GalleryGrid = ({
	layout,
	cols,
	gridWidthPercentage,
	imageHeight,
	onLayoutChange,
	removeItem,
}) => {
	const [gridRowHeight, setGridRowHeight] = useState(100);

	const gridRef = useRef(null);

	useEffect(() => {
		let newGridRowHeight = gridRef.current
			? ((window.innerWidth / gridRef.current.offsetWidth / cols) *
					imageHeight) /
			  (gridWidthPercentage / 100)
			: 20;
		setGridRowHeight(newGridRowHeight);
		console.log("Changed");
		console.log(gridRef.current.offsetHeight);
	}, [gridRef.current, cols, imageHeight, gridWidthPercentage]);

	const gridItems = layout.map((item, index) => (
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
			<span>{index + 1}</span>
		</GridItem>
	));

	let newLayout = JSON.parse(JSON.stringify(layout));

	return (
		<Container ref={gridRef}>
			<Grid
				className="layout"
				css={gridStyle}
				cols={cols}
				rowHeight={gridRowHeight}
				layout={newLayout}
				compactType={"vertical"}
				onLayoutChange={(currentLayout) => {
					onLayoutChange(currentLayout);
				}}
				margin={[10, 10]}
				containerPadding={[0, 0]}
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
	background-color: #fff;
	padding: 15px;
	padding-right: 25px;

	::-webkit-scrollbar {
		width: 14px;
	}
	::-webkit-scrollbar-thumb {
		height: 6px;
		border: 4px solid rgba(0, 0, 0, 0);
		background-clip: padding-box;
		border-radius: 7px;
		background-color: rgba(0, 0, 0, 0.25);
		box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05),
			inset 1px 1px 0px rgba(0, 0, 0, 0.05);
	}
	::-webkit-scrollbar-button {
		width: 0;
		height: 0;
		display: none;
	}
`;

const gridStyle = css`
	background-color: #fff;
`;

const GridItem = styled.div`
	display: grid;
	place-items: center;
	background-color: #ffd384;

	img {
		display: block;
		position: absolute;
		top: 5px;
		right: 5px;
		width: 16px;
		height: 16px;
		object-fit: cover;
		cursor: pointer;
		pointer-events: all;
	}

	span {
		color: #fff9b0;
		font-weight: 900;
		font-size: 2.4rem;
		user-select: none;
	}
`;

export default GalleryGrid;
