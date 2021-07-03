/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

const Tooltip = ({ tip }) => {
	return <Container>{tip}</Container>;
};

const Contaer = styled.p`
	position: absolute;
	display: inline-block;
	padding: 10px 20px;
	border-radius: 10px;
	background-color: #eee;
`;

export default Tooltip;
