import React from "react";
import DOMPurify from "dompurify";
import { Box } from "@mui/material";
import { GeneralProps } from "../../../types/ui";

interface SafeSvgRendererProps extends GeneralProps {
  svgString: string;
  width?: number | string;
  height?: number | string;
}

const SafeSvgRenderer: React.FC<SafeSvgRendererProps> = ({ svgString, width = "100%", height = "100%", sx }) => {
  const sanitizedSvg = DOMPurify.sanitize(svgString, {
    USE_PROFILES: { svg: true, svgFilters: true },
    ADD_TAGS: ["use"],
    ADD_ATTR: ["xlink:href"],
  });

  return (
    <Box
      component="div"
      sx={{
        width,
        height,
        ...sx,
      }}
      dangerouslySetInnerHTML={{ __html: sanitizedSvg }}
    ></Box>
  );
};

export default SafeSvgRenderer;
