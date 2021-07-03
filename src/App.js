/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import GalleryGrid from "./components/GalleryGrid";
import GridForm from "./components/GridForm";
import Alert from "./components/Alert";
import Appbar from "./components/Appbar";

function App() {
	const [layout, setLayout] = useState([
		{ i: "1", x: 0, y: 0, w: 1, h: 1 },
		{ i: "2", x: 1, y: 0, w: 1, h: 1 },
		{ i: "3", x: 2, y: 1, w: 1, h: 2 },
		{ i: "4", x: 0, y: 1, w: 2, h: 1 },
		{ i: "5", x: 0, y: 2, w: 1, h: 1 },
		{ i: "6", x: 1, y: 2, w: 2, h: 1 },
	]);
	const [newCounter, setNewCounter] = useState(0);
	const [imageNumber, setImageNumber] = useState(6);
	const [cols, setCols] = useState(3);
	const [gridWidthPercentage, setGridWidthPercentage] = useState(100);
	const [imageHeight, setImageHeight] = useState(150);

	const [alertMessage, setAlertMessage] = useState("");

	useEffect(() => {
		const newLayout = [...layout];
		newLayout.forEach((item) => {
			/* if (item.x >= cols) {
				item.x = cols - 1;
			} */
			if (item.x + item.w > cols) {
				item.x -= 1;
				item.y += 1;
			}
		});
		setLayout(newLayout);
	}, [cols]);

	const handleLayoutChange = (currentLayout) => {
		setLayout(currentLayout);
	};

	const addItem = () => {
		const newItem = {
			i: "n" + newCounter,
			x: (layout.length * 2) % cols,
			y: Math.max.apply(
				Math,
				layout.map((o) => o.y)
			),
			w: 1,
			h: 1,
		};
		const newLayout = [...layout];
		newLayout.push(newItem);
		setLayout(newLayout);
		setNewCounter((prev) => prev + 1);
	};

	const removeItem = (i) => {
		const itemIndexToRemove = layout.findIndex((item) => item.i == i);
		let newLayout = [...layout];
		newLayout.splice(itemIndexToRemove, 1);
		setLayout(newLayout);
	};

	return (
		<Wrapper>
			<Appbar />
			<main style={containerStyle}>
				<GalleryGrid
					layout={layout}
					imageNumber={imageNumber}
					cols={cols}
					gridWidthPercentage={gridWidthPercentage}
					imageHeight={imageHeight}
					onLayoutChange={handleLayoutChange}
					removeItem={removeItem}
				/>
				<GridForm
					layout={layout}
					imageNumber={imageNumber}
					cols={cols}
					gridWidthPercentage={gridWidthPercentage}
					imageHeight={imageHeight}
					onAddImage={addItem}
					onChangeCols={(newCols) => setCols(newCols)}
					onChangeGridWidth={(newGridWidth) => {
						if (newGridWidth < 1) newGridWidth = 1;
						else if (newGridWidth > 100) newGridWidth = 100;
						setGridWidthPercentage(newGridWidth);
					}}
					onChangeImageHeight={(newHeight) => {
						if (newHeight < 50) newHeight = 50;
						setImageHeight(newHeight);
					}}
					onCopyText={(msg) => {
						setAlertMessage(msg);
					}}
				/>
				<Alert message={alertMessage} duration={2500} />
			</main>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	height: 100vh;
	width: 100%;
	overflow: hidden;
`;

const containerStyle = {
	display: "grid",
	gridTemplateColumns: "2fr 1fr",
	gridGap: "40px",
	gridAutoRows: "100%",
	justifyContent: "center",
	width: "100%",
	padding: "10px 40px 20px",
	overflow: "hidden",
};

export default App;
