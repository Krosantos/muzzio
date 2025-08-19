import React, { useEffect, useState } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";
import clamp from "lodash/clamp";

const IMAGE_WIDTH = 366;
const IMAGE_HEIGHT = 510;

type CalculateOffset = (
  clientX: number,
  clientY: number,
  hasBackside: boolean,
) => React.CSSProperties;

const calculateOffset: CalculateOffset = (clientX, clientY, hasBackside) => {
  const TOTAL_HEIGHT = IMAGE_HEIGHT * (hasBackside ? 2 : 1);
  const TOTAL_WIDTH = IMAGE_WIDTH * (hasBackside ? 2 : 1);
  const result: React.CSSProperties = {};

  let left;

  let top;

  if (clientX + IMAGE_WIDTH + 20 > window.innerWidth) left = clientX - 20 - TOTAL_WIDTH;
  else left = clientX + 20;

  if (clientY + IMAGE_HEIGHT + 20 > window.innerHeight) top = clientY - 20 - TOTAL_HEIGHT;
  else top = clientY + 20;

  result.left = `${clamp(left, 0, window.innerWidth - TOTAL_WIDTH)}px`;
  result.top = `${clamp(top, 0, window.innerHeight - TOTAL_HEIGHT)}px`;
  return result;
};

type HoverArtProps = {
  id: string;
  imageUrl: string;
  reverseUrl: string;
};
const HoverArt: React.FC<HoverArtProps> = ({ imageUrl, reverseUrl }) => {
  const [style, setMousePosition] = useState<React.CSSProperties>({
    left: "0px",
    top: "0px",
  });

  useEffect(() => {
    const updatePosition = throttle(({ clientX, clientY }) => {
      const offset = calculateOffset(clientX, clientY, !!reverseUrl);

      setMousePosition({ ...offset, visibility: "visible" });
    }, 100);

    window.addEventListener("mousemove", updatePosition);
    return () => {
      window.removeEventListener("mousemove", updatePosition);
    };
  });

  return (
    <Container style={style}>
      <Img alt="" src={imageUrl} />
      {reverseUrl && <Img alt="" src={reverseUrl} />}
    </Container>
  );
};

const Container = styled.div`
  pointer-events: none;
  display: flex;
  overflow: hidden;
  position: fixed;
  visibility: hidden;
`;
const Img = styled.img`
  display: block;
  height: 510px;
  width: 366px;
  z-index: 10;
  border-radius: 12px;
`;

export default HoverArt;
