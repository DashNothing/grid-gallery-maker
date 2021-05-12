/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

import logo from "../images/logo.svg";

const Appbar = () => {
	return (
		<Header>
			<a href="/">
				<img src={logo} alt="grid gallery maker" />
			</a>
		</Header>
	);
};

const Header = styled.header`
	text-align: center;

	img {
		display: inline-block;
		height: 55px;
		padding: 10px 20px;
		object-fit: cover;
		background-color: #fff;
		border-radius: 0 0 10px 10px;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
	}
`;

export default Appbar;
