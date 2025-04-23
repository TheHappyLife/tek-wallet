import React from "react";
import DOMPurify from "dompurify";

interface SafeSvgRendererProps {
  svgString: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

const SafeSvgRenderer: React.FC<SafeSvgRendererProps> = ({
  svgString,
  className,
  width = "100%",
  height = "100%",
}) => {
  // Sanitize the SVG string using DOMPurify
  const sanitizedSvg = DOMPurify.sanitize(svgString, {
    USE_PROFILES: { svg: true, svgFilters: true },
    ADD_TAGS: ["use"],
    ADD_ATTR: ["xlink:href"],
  });

  return (
    <div
      className={className}
      style={{ width, height }}
      dangerouslySetInnerHTML={{ __html: sanitizedSvg }}
    />
  );
};

export default SafeSvgRenderer;
