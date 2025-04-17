"use client";
import { TouchEvent, useRef } from "react";
import { GeneralProps } from "../../../types/ui";
interface HorizontalScrollPropsType extends GeneralProps {}
function HorizontalScroll({ children }: HorizontalScrollPropsType) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 2; // Adjust scroll speed by changing multiplier
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  return (
    <div
      className={"hide_scrollbar"}
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove as any}
      onTouchMove={(e: TouchEvent<HTMLDivElement>) => e.stopPropagation()}
      style={{
        overflowX: "auto",
        display: "flex",
        cursor: "grab",
      }}
    >
      {children}
    </div>
  );
}

export default HorizontalScroll;
