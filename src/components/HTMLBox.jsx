/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { useRef } from "react";

const HTMLBox = ({ layout, onCopyText }) => {
	const codeEl = useRef(null);

	const layoutToHTML = () => {
		let htmlString = `<div class="grid-gallery">
`;

		layout.forEach((item) => {
			htmlString += `  <img src="" alt="" />
`;
		});

		htmlString += `</div>`;

		return htmlString;
	};

	const copyToClipboard = () => {
		var tempText = document.createElement("textarea");
		tempText.value = html;
		document.body.appendChild(tempText);
		tempText.select();

		document.execCommand("copy");
		document.body.removeChild(tempText);

		onCopyText("HTML copied to clipboard");
	};

	let html = layoutToHTML();

	return (
		<Container>
			<Header>
				<p style={{ fontWeight: "600" }}>HTML</p>
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
				<code style={{ whiteSpace: "none" }} ref={codeEl}>
					{html}
				</code>
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
	padding-left: 20px;
`;

const Pre = styled.pre`
	display: inline-block;
	padding: 15px;
	background-color: #eee;
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

export default HTMLBox;
