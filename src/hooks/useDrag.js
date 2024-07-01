import { useCallback, useEffect, useRef, useState } from "react";

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
