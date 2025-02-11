import { useCallback, useEffect, useState } from "react";

/**
 * Hook for dragging elements.
 *
 * @returns {Object} Object containing the following properties:
 *   - position: Current position of the element. Assign this to the draggable
 * element's CSS prop: { transform: `translateX(${position.x}px) translateY(${position.y}px)` }
 *   - startDragging: Function to start dragging the element. Assign this to the draggable element's
 * onPointerDown prop. Does not need to be container, can only be header or something.
 *   - isDragging: Boolean indicating whether the element is being dragged
 */
const useDrag = (parentRef) => {
	const [isDragging, setIsDragging] = useState(false);
	const [position, setPosition] = useState({ x: 80, y: 40 });
	const [dragStart, setDragStart] = useState({ x: 80, y: 40 });

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
				const newX = event.clientX - dragStart.x;
				const newY = event.clientY - dragStart.y;

				if (parentRef?.current) {
					const parentRect = parentRef.current.getBoundingClientRect();
					const elementRect =
						parentRef.current.firstChild.getBoundingClientRect();

					// Calculate max position to keep within parent
					const maxX = parentRect.width - elementRect.width;
					const maxY = parentRect.height - elementRect.height;

					// Clamp values to ensure the element stays within the parent
					setPosition({
						x: Math.max(0, Math.min(newX, maxX)),
						y: Math.max(0, Math.min(newY, maxY)),
					});
				} else {
					setPosition({
						x: newX,
						y: newY,
					});
				}
			}
		},
		[isDragging, dragStart, parentRef],
	);

	useEffect(() => {
		if (isDragging) {
			document.addEventListener("pointerup", handlePointerUp);
			document.addEventListener("pointermove", handlePointerMove);
		} else {
			document.removeEventListener("pointerup", handlePointerUp);
			document.removeEventListener("pointermove", handlePointerMove);
		}

		return () => {
			document.removeEventListener("pointerup", handlePointerUp);
			document.removeEventListener("pointermove", handlePointerMove);
		};
	}, [isDragging, handlePointerUp, handlePointerMove]);

	return { position, startDragging: handlePointerDown, isDragging };
};

export default useDrag;
