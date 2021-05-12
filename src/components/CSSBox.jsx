/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

const CSSBox = ({ layout, onCopyText }) => {
	const layoutToCSS = () => {
		let cssString = `.grid-gallery {
  display: grid;
  grid-gap: 10px;
  grid-auto-rows: 100px;
}
`;

		layout.forEach((item, index) => {
			cssString += `
.grid-gallery img:nth-child(${index + 1}) {
  grid-column: ${item.x + 1} / span ${item.w};
  grid-row: ${item.y + 1} / span ${item.h};
}
`;
		});

		return cssString;
	};

	const copyToClipboard = () => {
		var tempText = document.createElement("textarea");
		tempText.value = css;
		document.body.appendChild(tempText);
		tempText.select();

		document.execCommand("copy");
		document.body.removeChild(tempText);

		onCopyText("CSS copied to clipboard");
	};

	let css = layoutToCSS();

	return (
		<Container>
			<Header>
				<p style={{ fontWeight: "900" }}>CSS</p>
				<CopyButton
					onClick={(e) => {
						e.preventDefault();
						copyToClipboard();
					}}
				>
					Copy
				</CopyButton>
			</Header>
			<Pre>
				<code style={{ whiteSpace: "none" }}>{css}</code>
			</Pre>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	padding-left: 15px;
`;

const Pre = styled.pre`
	display: inline-block;
	padding: 15px;
	background-color: #fff;
	overflow: auto;
	border-radius: 10px;
`;

const CopyButton = styled.button`
	background-color: #555;
	color: #fff;
	font-weight: bold;
	padding: 8px 10px;
	border-radius: 5px;
`;

export default CSSBox;
