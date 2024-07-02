import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hook for dragging elements.
 *
 * @returns {Object} Object containing the following properties:
 *   - ref: Ref object for the element to be dragged. Assign this to the draggable element's ref prop.
 *   - position: Current position of the element. Assign this to the draggable 
 * element's CSS prop: { transform: `translateX(${position.x}px) translateY(${position.y}px)` } 
 *   - startDragging: Function to start dragging the element. Assign this to the draggable element's 
 * onPointerDown prop. Does not need to be container, can only be header or something.
 *   - isDragging: Boolean indicating whether the element is being dragged
 */
const useDrag = () => {
	const ref = useRef(null);
	const [isDragging, setIsDragging] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

	const handlePointerDown = useCallback(
		(event) => {
			setIsDragging(true);
			setDragStart({
				x: event.clientX - position.x,
				y: event.clientY - position.y,
			});
		},
		[position],
	);

	const handlePointerUp = useCallback(() => setIsDragging(false), []);

	const handlePointerMove = useCallback(
		(event) => {
			if (isDragging) {
				setPosition({
					x: event.clientX - dragStart.x,
					y: event.clientY - dragStart.y,
				});
			}
		},
		[isDragging, dragStart],
	);

	useEffect(() => {
		const element = ref.current;
		if (element) {
			if (isDragging) {
				element.addEventListener("pointerup", handlePointerUp);
				element.addEventListener("pointermove", handlePointerMove);
			} else {
				element.removeEventListener("pointerup", handlePointerUp);
				element.removeEventListener("pointermove", handlePointerMove);
			}

			return () => {
				element.removeEventListener("pointerup", handlePointerUp);
				element.removeEventListener("pointermove", handlePointerMove);
			};
		}
	}, [isDragging, handlePointerUp, handlePointerMove]);

	return { ref, position, startDragging: handlePointerDown, isDragging };
};

export default useDrag;
