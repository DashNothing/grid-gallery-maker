/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, useEffect, useRef } from "react";
import { Transition } from "react-transition-group";

import "../index.css";

const Alert = ({ message, duration }) => {
	const [isShowing, setIsShowing] = useState(false);

	let timeout = useRef(null);

	useEffect(() => {
		if (message !== "") {
			clearInterval(timeout.current);
			setIsShowing(true);
			timeout.current = setTimeout(() => {
				setIsShowing(false);
			}, duration);
		}
	}, [message]);

	const Container = styled.div`
		position: fixed;
		left: 50%;
		//bottom: 100px;
		transform: translate(-50%, 100%);
		padding: 8px 35px;
		background-color: #ff7d9a;
		color: #fff;
		border-radius: 100px;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	`;

	const defaultStyle = {
		transition: `all ${200}ms ease`,
		bottom: 0,
	};

	const transitionStyles = {
		entering: { bottom: "0px" },
		entered: { bottom: "70px" },
		exiting: { bottom: "70px" },
		exited: { bottom: 0 },
	};

	return (
		<Transition in={isShowing} timeout={50}>
			{(state) => (
				<Container style={{ ...defaultStyle, ...transitionStyles[state] }}>
					<span>{message}</span>
				</Container>
			)}
		</Transition>
	);
};

export default Alert;
